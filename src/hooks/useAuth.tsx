import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../services/fireBaseConfig";
import { useNavigate } from "react-router-dom";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  // Persisting the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setUser(user);
        setLoading(false);
      } else {
        // User is not logged in
        setUser(null);
        setLoading(true);
        navigate("/");
      }
      setInitialLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      setUser(userCredential.user);
      navigate("/dashboard"); // Redirect to home page after login
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        navigate("/dashboard");
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        navigate("/dashboard");
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };
  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      signInWithGoogle,
      loading,
      logout,
      error,
    }),
    [user, loading]
  );
  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

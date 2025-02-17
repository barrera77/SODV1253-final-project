import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";

import { auth } from "./fireBaseConfig";

interface UserRegistration {
  email: string;
  password: string;
  name: string;
}
export const signUp = async (
  user: UserRegistration
): Promise<UserCredential | null> => {
  try {
    //Create a new user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    //Update the user profile to insert the name
    await updateProfile(userCredential.user, { displayName: user.name });

    console.log("User signed up: ", userCredential.user);
    return userCredential;
  } catch (error) {
    console.log("Sign up error: ", error);
    return null;
  }
};

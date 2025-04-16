import { useState, useEffect } from "react";
import { Stock } from "../constants";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Services";

export const useWatchlist = (userId: string) => {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);

  useEffect(() => {
    if (!userId) return;

    const watchlistRef = doc(db, "watchlists", userId);

    const unsubscribe = onSnapshot(watchlistRef, (docSnap) => {
      if (docSnap.exists()) {
        setWatchlist(docSnap.data().stocks || []);
      } else {
        setWatchlist([]);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  return watchlist;
};

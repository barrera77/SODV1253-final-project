import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../Services/fireBaseConfig";

export const addToWatchlist = async (
  userId: string,
  stock: {
    symbol: string;
    shortName: string;
    currency: string;
    regularMarketPrice: number;
    regularMarketPreviousClose: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketTime: number;
  }
) => {
  try {
    const watchlistRef = doc(db, "watchlists", userId);

    // Check if watchlist exists
    const docSnap = await getDoc(watchlistRef);
    if (!docSnap.exists()) {
      await setDoc(watchlistRef, { stocks: [stock] });
    } else {
      await updateDoc(watchlistRef, {
        stocks: arrayUnion(stock),
      });
    }
  } catch (error) {
    console.error("Error adding to watchlist:", error);
  }
};

export const removeFromWatchlist = async (
  userId: string,
  stockSymbol: string
) => {
  try {
    const watchlistRef = doc(db, "watchlists", userId);

    await updateDoc(watchlistRef, {
      stocks: arrayRemove({ symbol: stockSymbol }),
    });
  } catch (error) {
    console.error("Error removing from watchlist:", error);
  }
};

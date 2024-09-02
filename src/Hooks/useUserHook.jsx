import { useState, useEffect } from "react";
import { auth } from "../store/firebase";

function useUserHook() {
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // setLoading(true);
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setCurrentUser(user ? user : null);
        setLoading(false);
      },
      (error) => {
        setIsError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { currentUser, isError, isLoading };
}

export default useUserHook;

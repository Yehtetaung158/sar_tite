import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../store/firebase";

const useGetDoc = (collectionPath) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const qu = query(
          collection(db,collectionPath),
          orderBy("timestamp", "asc")
        );
        const unsubscribe = onSnapshot(
          qu,
          (snapshot) => {
            setMessages(snapshot.docs.map((doc) => doc.data()));
            setIsLoading(false);
          },
          (error) => {
            throw new Error(error.message);
          }
        );

        return () => unsubscribe();
      } catch (error) {
        setIsError(error.message);
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return { messages, isLoading, isError };
};

export default useGetDoc;

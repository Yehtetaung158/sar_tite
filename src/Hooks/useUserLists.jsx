import { useEffect, useState } from "react";
import { db } from "../store/firebase";
import { collection, getDocs } from "firebase/firestore";

const useUserLists = () => {
  const [users, setUsers] = useState([]);
  const [isLoading,setIsLoading]=useState(true)
  const [isError,setIsError]=useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
        setIsLoading(false)
      } catch (error) {
        setIsError(error.message)
        setIsLoading(false)
      }
    };
    fetchUsers();
  }, []);

  return {users,isLoading,isError}

};

export default useUserLists;

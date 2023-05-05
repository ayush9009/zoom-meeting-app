import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { userRef } from "../utils/FirebaseConfig";
import { UserType } from "../utils/Types";

function useFetchUsers() {
  const [users, setUsers] = useState<Array<UserType>>([]);
  const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);

  useEffect(() => {
    //whenever the user id it should follows this code
    if (uid) {
      const getUser = async () => {
        const firestoreQuery = query(userRef, where("uid", "!=", uid)); //fetch all the query that are not equal to current user id
        const data = await getDocs(firestoreQuery);
        const firebaseUsers: Array<UserType> = [];

        data.forEach((user) => {
          // const userData=user.data();
          const userData: UserType = user.data() as UserType;
          firebaseUsers.push({
            ...userData,
            label: userData.name,
          });
        });
        setUsers(firebaseUsers);
      };
      getUser();
    }
  }, [uid]);
  return [users];
}

export default useFetchUsers;

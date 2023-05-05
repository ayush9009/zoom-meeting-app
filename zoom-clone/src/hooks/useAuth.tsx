//react with typescript offers faster performance than javascript
//in react project typescript allows u to write html code directly
// because of its type system.Typescript has static
// typing that helps the compiler make sure that the code
// is correct .react with typescript also has its own virtual dom which produces a very fast Uint16Array(userinterface).

import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../app/slices/AuthSlice";
import { firebaseAuth } from "../utils/FirebaseConfig";

function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubsucribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      console.log(currentUser);
      if (!currentUser) navigate("/login");
      else {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName,
          })
        );
      }
    });
    return () => unsubsucribe();
  }, [dispatch, navigate]); //ye mention kar diya ki component render hote hi yab sab ho ja i.e dispatch and navigate
}

export default useAuth;

// useEffect allows u to perform side effects in
// your components
// side effects are fetching data,indirectly updating the dom
// and TimeRanges.  If we need to perform side effect ,it should
// strictly be done after our component renders.this is what useEffect gives us

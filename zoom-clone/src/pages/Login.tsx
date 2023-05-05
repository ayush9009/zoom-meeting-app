import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiImage, EuiPanel, EuiProvider, EuiSpacer, EuiText, EuiTextColor } from '@elastic/eui'
import React from 'react'
import animation from "../assets/animation.gif";
import logo from "../assets/logo.png";
import { GoogleAuthProvider,onAuthStateChanged,signInWithPopup } from 'firebase/auth';
import { firebaseAuth,userRef } from '../utils/FirebaseConfig';
import { addDoc, getDocs, query, where } from 'firebase/firestore';
import {useNavigate} from "react-router-dom";
import { useAppDispatch } from '../app/hooks';
import { setUser } from '../app/slices/AuthSlice';

function Login() {
    const navigate=useNavigate();
    const dispatch=useAppDispatch();
    //onAuthStateChanged()this is the hook provided  by firebase
    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser) navigate("/")   //call back function which returns currentUser,agr huha to ,isliye if(currentuser)then naviage to dashboard
    })  
    const login=async()=>{
        const provider=new GoogleAuthProvider();   //ye sab mtlb jo bhi indono lines mai likha ye firebase ki functionalities jo vo provide kare hume
        const {
            user:{displayName,email,uid},
        } =await signInWithPopup(firebaseAuth,provider);//ye hume kafi information deve lakin hume name email aur uid ki jarorat h taki hum use firebase kai databse mai store kara skae
       if(email){
        const firestoreQuery=query(userRef,where("uid","==",uid)); ///userRef mai sare users store hai,here we check if the user with that email already exists or not
        const fetchedUsers=await getDocs(firestoreQuery);
        if(fetchedUsers.docs.length===0){
            await addDoc(userRef,{   //agr exist ni karta to ,doc mai userRef (collection ) mai id,email,name add kar do
                uid,
                name:displayName,
                email,
            });
        }
    }
    dispatch(setUser({uid,name:displayName,email}))  //ye dko dispatch ki madath se humne ye sab store  mai store kar liya ya kahe update kar diya
    navigate("/");
    }
  return (
   <EuiProvider colorMode='dark'>
    <EuiFlexGroup alignItems='center' justifyContent='center' style={{width:"100vw",height:"100vh"}}>
       <EuiFlexItem grow={false}>
        <EuiPanel paddingSize="xl">
            <EuiFlexGroup justifyContent='center' alignItems='center'>
                 <EuiFlexItem>
            <EuiImage src={animation} alt="logo"/>
        </EuiFlexItem>
        <EuiFlexItem>
            <EuiImage src={logo} alt="logo" size="230px" />
            <EuiSpacer size="xs"/> 
            {/* eui spacer for spaces */}
            <EuiText textAlign='center' grow={false}>
                <h3>
                    <EuiTextColor>One Platform to</EuiTextColor>
                    <EuiTextColor color="#0b5cff"> connect</EuiTextColor>
                </h3>
            </EuiText>
             <EuiSpacer size="l"/> 
             <EuiButton fill onClick={login}>Login with Google</EuiButton>
        </EuiFlexItem>
            </EuiFlexGroup>
        </EuiPanel>
       </EuiFlexItem>
    </EuiFlexGroup>

   </EuiProvider>
  )
}

export default Login





//dispatch is used to send actions into our redux
// store and is the only we can affect the store within a Component.

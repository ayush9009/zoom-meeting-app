import { createSlice } from "@reduxjs/toolkit";
import { object, string } from "prop-types";
import { store } from "../store";

interface authInitialState{
    userInfo:
        |{
            uid:string;
            email:string;
            name:string;
        }
        |undefined;  //intitalyy undefined rahegi
        isDarkTheme:boolean,
}
const initialState:authInitialState={
    userInfo:undefined,
      isDarkTheme:false,
};

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        changeTheme:(state,action)=>{
            state.isDarkTheme=action.payload.isDarkTheme
        },
        setUser:(state,action)=>{
            state.userInfo=action.payload;
        },
    },
});

export const {setUser,changeTheme}=authSlice.actions;  //destructure the reducers





















//redux 3 fundamental principles:
// the global state of your application is stored in an object TreeWalkerwithin a single store
// state is read-only ,the only way to change the state is to emit an action,an object
// describing what happened
// changes are made with pure functions


// state defines ui ,that triggers actions which are sent to reducer, reducer updatess the store ,store all the states that 
// are used in any web applicatoins
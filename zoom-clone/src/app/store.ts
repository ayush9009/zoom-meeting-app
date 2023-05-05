// In a React project, TypeScript allows you to
//  write HTML code directly. TypeScript delivers 
// superior IntelliSense and code completion 
// for JSX when used with React. 

import {configureStore} from "@reduxjs/toolkit"
import { authSlice } from "./slices/AuthSlice"
import { meetingsSlice } from "./slices/MeetingSlice";

export const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        meetings:meetingsSlice.reducer,
    },
});

export type RootState= ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
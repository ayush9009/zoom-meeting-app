import React, { useEffect, useState } from "react";
import {
  EuiGlobalToastList,
  EuiProvider,
  EuiThemeColorMode,
  EuiThemeProvider,
} from "@elastic/eui";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import { setToasts } from "./app/slices/MeetingSlice";
import Dashboard from "./pages/Dashboard";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ThemeSelector from "./components/ThemeSelector";
import CreateMeeting from "./pages/CreateMeeting";
import OneonOneMeeting from "./pages/OneonOneMeeting";
import VideoConference from "./pages/VideoConference";
import MyMeetings from "./pages/MyMeetings";
import Meeting from "./pages/Meeting";
import JoinMeeting from "./pages/JoinMeeting";
// import MyMeetings from "./pages/MyMeetings";

function App() {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  const [isInitialTheme, setIsInitialTheme] = useState(true);
  // <Euithemsecolormode aise karke type bataya humne
  const toasts = useAppSelector((zoom) => zoom.meetings.toasts);
  const removeToast = (removedToast: { id: string }) => {
    dispatch(
      setToasts(
        toasts.filter((toast: { id: string }) => toast.id !== removedToast.id)
      )
    );
  };
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme"); //localstorage se jo current theme vo get kar li
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    } else {
      localStorage.setItem("zoom-theme", "light");
    }
  }, []);
  useEffect(() => {
    if (isInitialTheme) setIsInitialTheme(false);
    else {
      window.location.reload();
    }
  }, [isDarkTheme]);
  const overrides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" },
    },
  };
  return (
    <ThemeSelector>
      <EuiProvider colorMode={theme}>
        <EuiThemeProvider modify={overrides}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateMeeting />} />
            <Route path="/create1on1" element={<OneonOneMeeting />} />
            <Route path="/videoconference" element={<VideoConference />} />
            <Route path="/mymeetings" element={<MyMeetings />} />
            <Route path="/meetings" element={<Meeting />} />
            <Route path="/join/:id" element={<JoinMeeting />} />
            {/* whenver we want to give a parameter which is accessed by the react router dom we attached that by colon /: like this so that it can be accessed by the react router dom */}
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Login />} />
            {/* if any of the route is incorrect i.e * then redirect it to the dashboard */}
          </Routes>
          <EuiGlobalToastList
            toasts={toasts}
            dismissToast={removeToast}
            toastLifeTimeMs={4000}
          />
        </EuiThemeProvider>
      </EuiProvider>
    </ThemeSelector>
  );
}

export default App;

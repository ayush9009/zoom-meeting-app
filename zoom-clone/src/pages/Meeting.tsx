import {
  EuiBadge,
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from "@elastic/eui";

import { getDocs, query } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { meetingRef } from "../utils/FirebaseConfig";
import { MeetingType } from "../utils/Types";

// import { meetingsRef } from "../utils/firebaseConfig";
// import { MeetingType } from "../utils/types";

export default function Meeting() {
  useAuth();
  const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
  const [meetings, setMeetings] = useState<Array<MeetingType>>([]);

  useEffect(() => {
    const getMyMeetings = async () => {
      const firestoreQuery = query(meetingRef); //sari meeting firestore query mai leli
      const fetchedMeetings = await getDocs(firestoreQuery); //docs ki madths eun meeting ko query karenge
      if (fetchedMeetings.docs.length) {
        //mtlb agr meeting h to
        const myMeetings: Array<MeetingType> = []; //initally empty h mymeeting jiska typearray
        fetchedMeetings.forEach((meeting) => {
          //ab jo meeting fetch hui uspe for each laga diya map ni laga sakte kuki firebase mai for eachhi lage
          const data = meeting.data() as MeetingType; //data maijo bhi meeting vo sab agya
          if (data.createdBy === userInfo?.uid)
            //ab particular meeting h tumhare pass tum check kar rai jo ye meeting isko create karne vle ki agr userid se match hori to vo us user ki meetings h to my meetings ma push kardo
            myMeetings.push(meeting.data() as MeetingType);
          else if (data.meetingType === "anyone-can-join")
            myMeetings.push(meeting.data() as MeetingType);
          else {
            const index = data.invitedUsers.findIndex(
              //mtlb agr invited user se index mile mtlb userInvited to index mil jaga else index=-1
              (user: string) => user === userInfo?.uid
            );
            if (index !== -1) {
              //index!=-1 to vo inveted user valo ko bhi aadd kar do
              myMeetings.push(meeting.data() as MeetingType);
            }
          }
        });

        setMeetings(myMeetings);
      }
    };
    if (userInfo) getMyMeetings();
  }, [userInfo]);

  const meetingColumns = [
    {
      field: "meetingName",
      name: "Meeting Name",
    },
    {
      field: "meetingType",
      name: "Meeting Type",
    },
    {
      field: "meetingDate",
      name: "Meeting Date",
    },
    {
      field: "",
      name: "Status",

      render: (meeting: MeetingType) => {
        if (meeting.status) {
          if (meeting.meetingDate === moment().format("L")) {
            return (
              <EuiBadge color="success">
                <Link
                  to={`/join/${meeting.meetingId}`}
                  style={{ color: "black" }}
                >
                  Join Now
                </Link>
              </EuiBadge>
            );
          } else if (
            moment(meeting.meetingDate).isBefore(moment().format("L"))
          ) {
            return <EuiBadge color="default">Ended</EuiBadge>;
          } else if (moment(meeting.meetingDate).isAfter()) {
            return <EuiBadge color="primary">Upcoming</EuiBadge>;
          }
        } else return <EuiBadge color="danger">Cancelled</EuiBadge>;
      },
    },
    {
      field: "meetingId",
      name: "Copy Link",
      width: "10%",
      render: (meetingId: string) => {
        return (
          <EuiCopy
            textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
          >
            {(copy: any) => (
              <EuiButtonIcon
                iconType="copy"
                onClick={copy}
                display="base"
                aria-label="meeting-copy"
              />
            )}
          </EuiCopy>
        );
      },
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" style={{ margin: "1rem" }}>
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable items={meetings} columns={meetingColumns} />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}

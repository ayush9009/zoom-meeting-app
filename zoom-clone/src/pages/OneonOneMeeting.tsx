import React, { useState } from "react";
import Header from "../components/Header";
import { EuiFlexGroup, EuiForm, EuiSpacer } from "@elastic/eui";
import MeetingNameField from "../components/FormComponents/MeetingNameField";
import MeetingUserField from "../components/FormComponents/MeetingUsersField";
import useAuth from "../hooks/useAuth";
import useFetchUsers from "../hooks/useFetchUsers";
import moment from "moment";
import useToast from "../hooks/useToast";
import MeetingDateField from "../components/FormComponents/MeetingDateField";
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButton";
import { FieldErrorType, UserType } from "../utils/Types";
import { addDoc } from "firebase/firestore";
import { meetingRef } from "../utils/FirebaseConfig";
import { generateMeetingID } from "../utils/generateMeeting";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";

function OneonOneMeeting() {
  useAuth(); //authenticated hai tabhi ye chlega
  const [users] = useFetchUsers(); //ye sai baki sab users jo meeting mai join unko get kar liya
  const [createToast] = useToast();
  const [meetingName, setMeetingName] = useState("");

  const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment());
  const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
  const navigate = useNavigate();
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });

  //note:spread operator can be used to spread an object of props onto an element in
  //    a react component,making it easier to pass down props
  // to child components but more on that later.
  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions);
  };
  const validateForm = () => {
    //this is a function which returns us true or false,if true then only we proceed further else we dont
    const showErrorsClone = { ...showErrors };
    let errors = false;
    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true; //true kar diya kuki error hai
      showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      showErrorsClone.meetingName.show = false; //yani error nhi ha to ye karo
      showErrorsClone.meetingName.message = [];
    }
    if (!selectedUsers.length) {
      showErrorsClone.meetingUser.show = true;
      showErrorsClone.meetingUser.message = ["Please Select a User"];
      errors = true;
    } else {
      showErrorsClone.meetingUser.show = false;
      showErrorsClone.meetingUser.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  };

  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: "1-on-1",
        invitedUsers: [selectedUsers[0].uid],
        meetingDate: startDate.format("L"), //L means long data
        maxUsers: 1,
        status: true,
      });
      createToast({
        title: "One on One Meeting Created Successfully",
        type: "success",
      });
      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <MeetingNameField
            label="Meeting name"
            isInvalid={showErrors.meetingName.show} //isme hoga eror ha ya ni
            error={showErrors.meetingName.message} //isme error agr h uska message,agr error nhi h to ye empty hoga
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
          />

          <MeetingUserField
            label="Invite User"
            isInvalid={showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUsers}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a User"
          />
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}

export default OneonOneMeeting;

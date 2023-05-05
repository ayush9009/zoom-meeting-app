import { NavigateFunction } from "react-router-dom";
import { BreadCrumbsType } from "./Types";



export const getDashboardBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    href:"#",
    text: "Dashboard",
  },
];
export const getCreateMeetingBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "Dashboard",
    href:"#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    href:"#",
    text: "Create Meeting",
  },
];

export const getOneonOneMeetingBreadCrumbs=(
     navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "Dashboard",
    href:"#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    href:"#",
    text: "Create Meeting",
    onClick: () => {
      navigate("/create");
    },
  },
   {
    href:"#",
    text: "Create One on One Meeting",
   },
];
export const getVideoConferenceBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "Create Meeting",
    href: "#",
    onClick: () => {
      navigate("/create");
    },
  },
  {
    href: "#",
    text: "Create Video Conference",
  },
];
export const getMyMeetingsBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    href: "#",
    text: "My Meetings",
  },
];
export const getMeetingsBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    href: "#",
    text: "Meetings",
  },
];
import React from "react";
import user from "./User.module.css";
import { Image, Button } from "react-bootstrap";
import { collections } from "../../../data/data";
import Notification from "./Notification";
import Tasks from "./Tasks";
import Project from "./Project";
import { Link } from "react-router-dom";
import {
  useGetTaskDetailsQuery,
  useGetProjectDetailsQuery,
  useGetReportsDetailsQuery,
} from "@/app/services/auth/authService";

const DashboardContents = () => {
  const { data: UserReports } = useGetReportsDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const ReportsCollection = UserReports || [];

  const { data: UserTasks } = useGetTaskDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const TaskCollection = UserTasks || [];

  const { data: UserProjects } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const ProjectsCollection = UserProjects || [];
  return (
    <div className={user.contentcontainer}>
      {/* <div className={user.absoluterightcontainer}>
        <ButtonProject />
      </div> */}

      <ButtonProject />
      <div className={user.flexcontainer}>
        <Link to="/project">
          <Cards
            imagelink="/icons/dashboard/project-cards-icon.svg"
            text={ProjectsCollection.length}
            title="Projects"
            verb="ongoing"
          />
        </Link>
        <Link to="/reports">
          <Cards
            imagelink="/icons/dashboard/reports-cards-icon.svg"
            text={ReportsCollection.length}
            title="Reports"
            verb="new"
          />
        </Link>
        <Link to="/message">
          <Cards
            imagelink="/icons/dashboard/tasks-cards-icon.svg"
            text="0"
            title="Messages"
            verb="new"
          />
        </Link>
      </div>
      <div className={user.flexedcontainer1}>
        <Notification />
        {/* <Tasks /> */}
      </div>
      <Project />
    </div>
  );
};

export default DashboardContents;

const Cards = (props) => {
  return (
    <div className={user.contentcardscontainer}>
      <div className={user.innercontent}>
        <div className={user.contentheader}>
          <Image src={`${props.imagelink}`} />
          <div className={user.absolutecenter}>
            <p className={user.contentheadertext}>{props.text}</p>
          </div>
        </div>
        <p className={user.title}>{props.title}</p>
        <p className={user.description}>
          You have {props.text} {props.verb} <br /> {props.title}
        </p>
      </div>
    </div>
  );
};

export const ButtonProject = () => {
  return (
    <div className={user.absoluterightcontainer}>
      <Link to="/project/form">
        <Button className={user.modalbutton}>
          Add New Project
          <Image
            src="/icons/notification/arrow-down.svg"
            className={user.arrowdown}
            alt="arrow-down"
          />
        </Button>
      </Link>
    </div>
  );
};

import React from "react";
import user from "./User.module.css";
import { Image } from "react-bootstrap";
import { collections } from "../../../data/data";
import Notification from "./Notification";
import Tasks from "./Tasks";
import Project from './Project';



const DashboardContents = () => {
  return (
    <div className={user.contentcontainer}>
      <div className={user.flexcontainer}>
        {collections.map((collection, index) => (
          <Cards
            key={index}
            imagelink={collection.imagelink}
            text={collection.total}
            title={collection.name}
            description={collection.description}
          />
        ))}
      </div>
      <div className={user.flexedcontainer1}>
        <Notification />
        <Tasks />
      </div>
      <Project/>
    </div>
  );
};

export default DashboardContents;

const Cards = (props) => {
  return (
    <div className={user.contentcardscontainer}>
      <div className={user.innercontent}>
        <div className={user.contentheader}>
          <Image src={`${props.imagelink}`} class="img-fluid" />
          <p className={user.contentheadertext}>{props.text}</p>
        </div>
        <p className={user.title}>{props.title}</p>
        <p className={user.description}>{props.description}</p>
      </div>
    </div>
  );
};

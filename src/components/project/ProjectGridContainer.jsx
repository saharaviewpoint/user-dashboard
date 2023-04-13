import React from "react";
import grid from "./general.module.css";
import { Image } from "react-bootstrap";

const ProjectGridContainer = (props) => {
  return (
    <div className={grid.gridcontainer}>
      <div className={grid.innercontainer}>
        <div className={grid.flexcontainer}>
          <p className={grid.gridtext}>{props.text}</p>
          <div>
            {props.priority === "red" ? (
              <ImageIcon imagelink="/icons/table/redflag.svg" />
            ) : props.priority === "gray" ? (
              <ImageIcon imagelink="/icons/table/normalflag.svg" />
            ) : props.priority === "yellow" ? (
              <ImageIcon imagelink="/icons/table/warningflag.svg" />
            ) : null}
          </div>
        </div>
        <p className={grid.textdate}>
          <span className={grid.titledate}>Due:</span>{" "}
          {new Date(props.date).toLocaleDateString()}
        </p>
        <div className={grid.space}>
          <div className={grid.absolutecenter}>
            <span className={grid.titledate}>Status:</span>{" "}
          </div>
          <Button text={props.status} />
        </div>
      </div>
    </div>
  );
};

export default ProjectGridContainer;

const ImageIcon = (props) => {
  return <Image src={`${props.imagelink}`} alt="priority" />;
};

const Button = (props) => {
  return (
    <div className={grid.statusbutton} style={{ marginLeft: "10px" }}>
      <p
        className={
          props.text === "Awaiting Approval"
            ? grid.awaitbuttontext
            : props.text === "Complete"
            ? grid.completebuttontext
            : props.text == "In Progress"
            ? grid.inprogresstext1
            : null
        }
      >
        {props.text}
      </p>
    </div>
  );
};

import React from "react";
import side from "./User.module.css";
import { Container, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


const Sidebar = () => {
  // const active = navbarlinksandtitle.
  return (
    <Container className={side.container}>
      <div className={side.navbar}>
       <div className={side.center}>
        <img src="/images/svp.svg" className={side.header} alt="..."></img>
        </div>
        <div className={side.centercontainer}>
          <NavbarTab
            imagelink="/icons/sidebar/dashboard-icon.svg"
            name="Dashboard"
            path="/"
          />
          <NavbarTab
            imagelink="/icons/sidebar/project-icon.svg"
            name="Projects"
            path="project"
          />
          <NavbarTab
            imagelink="/icons/sidebar/tasks-icon.svg"
            name="Tasks"
            path="tasks"
          />
          <NavbarTab
            imagelink="/icons/sidebar/reports-icon.svg"
            name="Reports"
            path="report"
          />
          <NavbarTab
            imagelink="/icons/sidebar/messages-icon.svg"
            name="Messages"
            path="message"
          />
        </div>
        <div className={side.logOutContainer}>
          <div className={side.center}>
          <div className={side.flex}>
            <div>
              <Image src = "/images/avatar.png" alt = "avatar"/>
            </div>
            <div className={side.textcontainer}>
              <p className={side.avatartitle}>John Doe</p>
              <p className={side.avatarcontext}>johndoe@gmail.com</p>
            </div>
          </div>
        </div>
        <div className={side.center1}>
        <div className={side.button}>
        <p className={side.logouttext}>Log Out</p>
        <Image src = "/icons/sidebar/log-out.svg" alt="log-out-icon"/>
        </div>
        </div>
        </div>
      </div>
    </Container>
  );
};

export default Sidebar;

const NavbarTab = (props) => {
  const active = location.pathname === props.path;
  return (
    <div>
    <Link to={props.path} className={active ? side.linkactive : side.link}>
      <div
        className={
          active ? side.navbarTabContainerActive : side.navbarTabContainer
        }
      >
        <div className={side.center}>
          <Image src={`${props.imagelink}`} />
        </div>
        <p className={active ? side.linktextactive : side.linktext}>{props.name}</p>
      </div>
    </Link>
    </div>
  );
};

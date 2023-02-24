import React from "react";
import side from "./User.module.css";
import { Container, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const navbarlinksandtitle = [
  {
    name: "Dashboard",
    links: "/icons/dashboard-icon.svg",
  },
  {
    name: "Projects",
    links: "/icons/project-icon.svg",
  },
  {
    name: "Tasks",
    links: "/icons/tasks-icon.svg",
  },
  {
    name: "Reports",
    links: "/icons/reports-icon.svg",
  },
  {
    name: "Messages",
    links: "/icons/messages-icon.svg",
  },
];

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
            imagelink="/icons/dashboard-icon.svg"
            name="Dashboard"
            path="/"
          />
          <NavbarTab
            imagelink="/icons/project-icon.svg"
            name="Projects"
            path="project"
          />
          <NavbarTab
            imagelink="/icons/tasks-icon.svg"
            name="Tasks"
            path="tasks"
          />
          <NavbarTab
            imagelink="/icons/reports-icon.svg"
            name="Reports"
            path="report"
          />
          <NavbarTab
            imagelink="/icons/messages-icon.svg"
            name="Messages"
            path="message"
          />
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

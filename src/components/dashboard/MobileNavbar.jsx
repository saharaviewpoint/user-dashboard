import React from "react";
import sidenav from "./User.module.css";

const MobileNavbar = () => {
  return (
    <div className={sidenav.sidenavcontainer}>
      <NavbarTab
        imagelinkactive="/icons/sidebar/dashboard-icon.svg"
        imagelink="/icons/sidebar/dashboard.svg"
        // imagelinkactive = "/icons/sidebar/svp.svg"
        name="Dashboard"
        path="/"
      />
      <NavbarTab
        imagelink="/icons/sidebar/project-icon.svg"
        imagelinkactive="/icons/sidebar/active-project.svg"
        name="Projects"
        path="/project"
        path1="/project/board"
        path2="/project/grid"
        path3="/project/form"
      />
      <NavbarTab
        imagelink="/icons/sidebar/tasks-icon.svg"
        imagelinkactive="/icons/sidebar/active-tasks.svg"
        name="Tasks"
        path="/task"
        path1="/task/board"
        path2="/task/calendar"
      />
      <NavbarTab
        imagelink="/icons/sidebar/reports-icon.svg"
        imagelinkactive="/icons/sidebar/active-reports.svg"
        name="Reports"
        path="/reports"
        path1="/reports/table"
        path2="/reports/grid"
      />
      <NavbarTab
        imagelink="/icons/sidebar/messages-icon.svg"
        imagelinkactive="/icons/sidebar/active-messages.svg"
        name="Messages"
        path="/message"
      />
    </div>
  );
};

export default MobileNavbar;

const NavbarTab = (props) => {
  const active =
    location.pathname === props.path ||
    location.pathname === props.path1 ||
    location.pathname === props.path2 ||
    location.pathname === props.path3;
  return (
    <div className={sidenav.hovertext}>
      <Link to={props.path}>
        <div
          className={
            active ? sidenav.navbarTabContainerActive : sidenav.navbarTabContainer
          }
        >
          <div className={sidenav.center}>
            {active ? (
              <Image src={`${props.imagelinkactive}`} />
            ) : (
              <Image src={`${props.imagelink}`} />
            )}
          </div>
          <div className={sidenav.center}>
            <p className={active ? sidenav.linktextactive : sidenav.linktext}>
              {props.name}
            </p>
            <p className={sidenav.displaytext}>{props.path1}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
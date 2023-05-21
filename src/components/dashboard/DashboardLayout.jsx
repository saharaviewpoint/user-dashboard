import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import side from "./User.module.css";
import { Container, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "@/features/auth/authSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetDetailsQuery } from "@/app/services/auth/authService";
import { authApi } from "../../app/services/auth/authService";
import ModalContainer from "./ModalContainer";
import { truncateString } from "./../../../util/text";

const DashboardLayout = (props) => {
  const [display, setDisplay] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  // const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user, isFetching, isLoading } = useGetDetailsQuery();

  const UserInfo = user || [];

  const LogOut = () => {
    dispatch(logout());
    dispatch(authApi.util.resetApiState());
    navigate("/");
  };

  const handleClick = () => setModalShow(true);
  return (
    <Container className={side.container}>
      <Row className={side.rowcontainer}>
        <Col lg={2} className={display ? side.activemainnav : side.mainnav}>
          <div className={side.navbar}>
            <div
              className={side.closecontainer}
              onClick={() => setDisplay(!display)}
            >
              <Image
                src="/icons/sidebar/close.svg"
                className={side.hamburgericon}
              />
            </div>
            <div className={side.centerimage}>
              <img
                src="/images/svp.png"
                className={side.header}
                alt="..."
              ></img>
            </div>
            <div className={side.centercontainer1}>
              <p className={side.welcomemessage}>
                Hello, &nbsp;
                <span className={side.welcomecolormessage}>
                  {UserInfo.firstname || (
                    <Skeleton
                      baseColor="#ebab34"
                      highlightColor="#f2cb07"
                      width={100}
                    />
                  )}
                </span>
              </p>
              <NavbarTab
                imagelinkactive="/icons/sidebar/dashboard-icon.svg"
                imagelink="/icons/sidebar/dashboard.svg"
                // imagelinkactive = "/icons/sidebar/svp.svg"
                name="Dashboard"
                path="/dashboard"
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
            <div className={side.logOutContainer}>
              <div className={side.center}>
                <div className={side.flex}>
                  <div className={side.absolutecenter}>
                    <p className={side.avatar}>
                      {UserInfo?.firstname?.charAt(0) || null}
                      <span className={side.label}>
                        {UserInfo?.lastname?.charAt(0) || null}
                      </span>
                    </p>
                  </div>
                  <div className={side.textcontainer}>
                    <p className={side.avatartitle}>
                      {UserInfo.firstname || (
                        <Skeleton
                          baseColor="#ebab34"
                          highlightColor="#f2cb07"
                          width={100}
                        />
                      )}
                    </p>
                    <p className={side.avatarcontext}>
                      {isLoading ? (
                        <Skeleton
                          baseColor="#ebab34"
                          highlightColor="#f2cb07"
                          width={100}
                        />
                      ) : (
                        truncateString(
                          UserInfo.email || "",
                          17
                        )
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className={side.center1}>
                <div className={side.button} onClick={LogOut}>
                  <p className={side.logouttext}>Log Out</p>
                  <Image
                    src="/icons/sidebar/log-out.svg"
                    onClick={handleClick}
                    className={side.alarm}
                    alt="log-out-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={10} className={side.centercontainer}>
          <div className={side.rightcontainer}>
            <div className={side.titlecontainer}>
              <div
                className={side.hamburgercontainer}
                onClick={() => setDisplay(!display)}
              >
                <Image
                  src="/icons/sidebar/hamburger.svg"
                  className={side.hamburgericon}
                />
              </div>
              <div className={side.center}>
                <p className={side.headertitle}>{props.name}</p>
              </div>
              <Image
                src="/icons/dashboard/alarm-icon.svg"
                className={side.alarm}
                onClick={handleClick}
              />
            </div>
          </div>
          <div className={side.contentscontainer}>{props.children}</div>
        </Col>
      </Row>
      <ModalContainer show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
};

export default DashboardLayout;

const NavbarTab = (props) => {
  const active =
    location.pathname === props.path ||
    location.pathname === props.path1 ||
    location.pathname === props.path2 ||
    location.pathname === props.path3;
  return (
    <div className={side.hovertext}>
      <Link to={props.path}>
        <div
          className={
            active ? side.navbarTabContainerActive : side.navbarTabContainer
          }
        >
          <div className={side.center}>
            {active ? (
              <Image src={`${props.imagelinkactive}`} />
            ) : (
              <Image src={`${props.imagelink}`} />
            )}
          </div>
          <div className={side.center}>
            <p className={active ? side.linktextactive : side.linktext}>
              {props.name}
            </p>
            <p className={side.displaytext}>{props.path1}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

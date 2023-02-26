import React from "react";
import dash from "./Layout.module.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import Sidebar from "../../components/User/Dashboard/Sidebar";
import DashboardContents from '../../components/User/Dashboard/DashboardContents';

const Dashboard = () => {
  return (
    <Container className={dash.container}>
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col lg={10} className={dash.centercontainer}>
          <div className={dash.rightcontainer}>
            <div className={dash.titlecontainer}>
              <div className={dash.center}>
                <p className={dash.title}>dashboard</p>
              </div>
              <Image src="/icons/dashboard/alarm-icon.svg" />
            </div>
          </div>
          <div className={dash.contentscontainer}>
          <DashboardContents/>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

import React from "react";
import dash from "./Layout.module.css";
import { Container } from "react-bootstrap";
import DashboardLayout from "../../components/User/Dashboard/DashboardLayout";
import DashboardContents from "../../components/User/Dashboard/DashboardContents";

const Dashboard = () => {
  return (
    <Container className={dash.container}>
      <DashboardLayout name = "Dashboard">
        <DashboardContents />
      </DashboardLayout>
    </Container>
  );
};

export default Dashboard;

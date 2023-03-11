import React from "react";
import dash from "./Layout.module.css";
import { Container } from "react-bootstrap";
import DashboardLayout from "../../components/user/dashboard/DashboardLayout";
import DashboardContents from "../../components/user/dashboard/DashboardContents";

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

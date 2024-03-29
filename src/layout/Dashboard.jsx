import React, { useEffect } from "react";
import dash from "./Layout.module.css";
import { Container } from "react-bootstrap";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardContents from "../components/dashboard/DashboardContents";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container className={dash.container}>
      <DashboardLayout name="Dashboard">
        <DashboardContents />
      </DashboardLayout>
    </Container>
  );
};

export default Dashboard;

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import React from "react";
import { Container } from "react-bootstrap";
import reportgrid from "./reports.module.css";

const ReportsGridDashboard = () => {
  return (
    <Container className={reportgrid.container}>
      <DashboardLayout name="Reports"></DashboardLayout>
    </Container>
  );
};

export default ReportsGridDashboard;

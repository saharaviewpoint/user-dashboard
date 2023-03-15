import DashboardLayout from "@/components/dashboard/DashboardLayout";
import React from "react";
import { Container } from "react-bootstrap";
import reporttable from "./reports.module.css";

const ReportsTableDashboard = () => {
  return (
    <Container className={reportttable.container}>
      <DashboardLayout name="Reports"></DashboardLayout>
    </Container>
  );
};

export default ReportsTableDashboard;

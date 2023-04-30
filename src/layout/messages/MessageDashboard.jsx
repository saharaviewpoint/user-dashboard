import DashboardLayout from "@/components/dashboard/DashboardLayout";
import React from "react";
import message from "./message.module.css";
import { Container } from "react-bootstrap";

const MessageDashboard = () => {
  return (
    <Container className={message.container}>
      <DashboardLayout name="Messages">
        <div className={message.overallcontainer}>
          <div>
            <p className={message.title}>Feature unavailable</p>
            <p className={message.content}>
              This feature is only available on the supervised demo
            </p>
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default MessageDashboard;

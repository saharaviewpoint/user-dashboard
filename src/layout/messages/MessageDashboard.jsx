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
            <p className={message.title}>Feature Unavailable</p>
            <p className={message.content}>
              This Feature is only available in the demo
            </p>
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default MessageDashboard;

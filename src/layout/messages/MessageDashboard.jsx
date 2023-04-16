import React from "react";
import { Container, Image } from "react-bootstrap";
import message from "./message.module.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

const MessageDashboard = () => {
  return (
    <Container className={message.container}>
      <DashboardLayout name="Messages">
        <div className={message.overallcontainer}>
          <div>
            <p className={message.title}>Feature Unavailable</p>
            <p className={message.warning}>
              This feature is only available in the live demo
            </p>
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default MessageDashboard;

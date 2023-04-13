import React from "react";
import { Container, Image } from "react-bootstrap";
import message from "./message.module.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

const MessageDashboard = () => {
  return (
    <Container className={message.container}>
      <DashboardLayout name="Messages">
        <div className={message.overallcontainer}>
          <div className={message.absolutecenter}>
            <Image src="/icons/construction.svg" alt="construction" />
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default MessageDashboard;

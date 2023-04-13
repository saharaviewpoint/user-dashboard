import React from "react";
import { Container, Image } from "react-bootstrap";
import message from "./message.module.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

const MessageDashboard = () => {
  return (
    <Container className={message.container}>
      <DashboardLayout name="Messages">
        <div className={message.overallcontainer}>
          <Image
            style={{ margin: "0 auto" }}
            src="/icons/frame.png"
            // width="80%"
            // alt="construction"
          />
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default MessageDashboard;

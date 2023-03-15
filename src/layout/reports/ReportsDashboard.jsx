import React from "react";
import { Container, Button } from "react-bootstrap";
import report from "./reports.module.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Header from "../../components/reports/Header";
import TableHeaderNav from "../../components/project/TableHeaderNav";
import FileInputContainer from "@/components/reports/FileInputContainer";

const ReportsDashboard = () => {
  return (
    <Container className={report.container}>
      <DashboardLayout name="Reports">
        <FileInputContainer />
        <div className={report.overallcontainer}>
          <Header name="My Reports" />
          <div className={report.leftcontainer}>
            <div className={report.flexwrap}>
              <NavCategories
                name="All Files"
                total="(23)"
                // onClick={() => setFilter(null)}
              />

              <NavCategories
                name="Pictures"
                total="(02)"
                // onClick={() => setFilter("Approved")}
              />
              <NavCategories
                name="Video"
                total="(10)"
                // onClick={() => setFilter("Pending")}
              />
              <NavCategories
                name="Documents"
                total="(11)"
                // onClick={() => setFilter("Declined")}
              />
            </div>
            <TableHeaderNav />
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default ReportsDashboard;

const NavCategories = (props) => {
  return (
    <Button className={report.tablenavcontainer} onClick={props.onClick}>
      {/* <p className={project.tablenavtext}> */}
      {props.name}
      <span>{props.total}</span>
      {/* </p> */}
    </Button>
  );
};

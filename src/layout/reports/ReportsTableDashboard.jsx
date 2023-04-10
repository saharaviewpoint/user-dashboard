import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FileInputContainer from "@/components/reports/FileInputContainer";
import React, { useState, useMemo, forwardRef } from "react";
import { Container, Button, Image } from "react-bootstrap";
import reporttable from "./reports.module.css";
import "./changes.css";
import Header from "@/components/reports/Header";
import ReportsTableContents from "@/components/reports/ReportsTableContents";
import { TablesData } from "../../../data/reports";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReportsTableDashboard = () => {
  const [filter, setFilter] = useState(null);
  const [startDate, setStartDate] = useState(new Date("01/01/1998"));
  const [endDate, setEndDate] = useState(new Date("01/01/2023"));

  const data = useMemo(() => {
    if (!filter) return TablesData;
    const filteredData = TablesData.filter((item) => item.file === filter);
    return filteredData;
  }, [filter]);

  const filteredImage = TablesData.filter((item) => item.file === "image");
  const filteredVideo = TablesData.filter((item) => item.file === "video");
  const filteredDocument = TablesData.filter(
    (item) => item.file === "document"
  );
  return (
    <Container className={reporttable.container}>
      <DashboardLayout name="Reports">
        <FileInputContainer />
        <div className={reporttable.overallcontainer}>
          <Header name="My Reports" />
          <div className={reporttable.leftcontainer}>
            <div className={reporttable.flexwrap}>
              <NavCategories
                name="All Files"
                total={`(${TablesData.length})`}
                filter={filter}
                filter1={null}
                onClick={() => setFilter(null)}
              />

              <NavCategories
                name="Pictures"
                filter={filter}
                filter1="image"
                total={`(${filteredImage.length})`}
                onClick={() => setFilter("image")}
              />
              <NavCategories
                name="Video"
                filter={filter}
                filter1="video"
                total={`(${filteredVideo.length})`}
                onClick={() => setFilter("video")}
              />
              <NavCategories
                name="Documents"
                filter={filter}
                filter1="document"
                total={`(${filteredDocument.length})`}
                onClick={() => setFilter("document")}
              />
            </div>
            <div className={reporttable.datepickertitle}>
              <p className={reporttable.datepickertitlelabel}>Start Date</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                customInput={<ExampleCustomInput />}
                // width={300}
              />
            </div>
            <div className={reporttable.absolutecenter}>
              <div className={reporttable.dash}></div>
            </div>
            <div className={reporttable.datepickertitle}>
              <p className={reporttable.datepickertitlelabel}>End Date</p>
              <DatePicker
                showIcon
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                dateFormat="dd/MM/yyyy"
                customInput={<ExampleCustomInput />}
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </div>
          <ReportsTableContents>
            {data.map((tabledata, index) => (
              <tr key={index}>
                <td>
                  <div className={reporttable.flextable}>
                    <Image src={tabledata.src} />
                    <div className={reporttable.absolutecenter}>
                      <p className={reporttable.tablename}>{tabledata.name}</p>
                    </div>
                  </div>
                </td>
                <td>{tabledata.projectname}</td>
                <td>{tabledata.sentfrom}</td>
                <td>{tabledata.sentto}</td>
                <td>{tabledata.datereceived}</td>
              </tr>
            ))}
          </ReportsTableContents>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default ReportsTableDashboard;

const NavCategories = (props) => {
  const active = props.filter === props.filter1;
  return (
    <Button
      className={
        active
          ? reporttable.tablenavcontaineractive
          : reporttable.tablenavcontainer
      }
      onClick={props.onClick}
    >
      {/* <p className={project.tablenavtext}> */}
      {props.name}
      <span>{props.total}</span>
      <span className={reporttable.disappear}>{props.filter}</span>
      <span className={reporttable.disappear}>{props.filter1}</span>
      {/* </p> */}
    </Button>
  );
};

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className={reporttable.datepickerbutton} onClick={onClick} ref={ref}>
    <div className={reporttable.center}>
      <Image
        src="/icons/calendar.svg"
        alt="icon"
        className={reporttable.calendaricon}
      />
    </div>
    <p className={reporttable.datevalue}>{value}</p>
  </button>
));

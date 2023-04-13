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
import { useGetReportsDetailsQuery } from "../../app/services/auth/authService";
import "react-datepicker/dist/react-datepicker.css";

const ReportsTableDashboard = () => {
  const [filter, setFilter] = useState(null);
  const [startDate, setStartDate] = useState(new Date("01/01/1998"));
  const [endDate, setEndDate] = useState(new Date("01/01/2023"));

  const { data: AdminReports } = useGetReportsDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const ReportsCollection = AdminReports || [];

  const data = useMemo(() => {
    if (!filter) return ReportsCollection;
    const filteredData = ReportsCollection.map((report) => ({
      ...report,
      attachments: report.attachments.filter((attachment) =>
        attachment.type.startsWith(filter)
      ),
    }));
    return filteredData;
  }, [filter, ReportsCollection]);

  const filteredImage = ReportsCollection.map((reportcollection) =>
    reportcollection.attachments.filter((attachment) =>
      attachment.type.startsWith("image")
    )
  );

  const filteredVideo = ReportsCollection.map((reportcollection) =>
    reportcollection.attachments.filter((attachment) =>
      attachment.type.startsWith("video")
    )
  );

  const filteredDocument = ReportsCollection.map((reportcollection) =>
    reportcollection.attachments.filter((attachment) =>
      attachment.type.startsWith("document")
    )
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
                // total={`(${filteredImage.length})`}
                filter={filter}
                filter1={null}
                onClick={() => setFilter(null)}
              />

              <NavCategories
                name="Pictures"
                filter={filter}
                filter1="image"
                // total={`(${filteredImage.length})`}
                onClick={() => setFilter("image")}
              />
              <NavCategories
                name="Video"
                filter={filter}
                filter1="video"
                // total={`(${filteredVideo.length})`}
                onClick={() => setFilter("video")}
              />
              <NavCategories
                name="Documents"
                filter={filter}
                filter1="document"
                // total={`(${filteredDocument.length})`}
                onClick={() => setFilter("document")}
              />
            </div>
            <div className={reporttable.datepickertitle}>
              <p className={reporttable.datepickertitlelabel}>Start Date</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                showYearDropdown
                yearDropdownItemNumber={15}
                scrollableYearDropdown
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
                showYearDropdown
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                dateFormat="dd/MM/yyyy"
                customInput={<ExampleCustomInput />}
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </div>
          <ReportsTableContents>
            {data.map((report, index) => {
              const projectname = report.project.name;
              return (
                <>
                  {report.attachments.map((tabledata, index) => (
                    <tr key={index}>
                      <td>
                        <div style={{ display: "flex" }}>
                          {tabledata.type === "image/jpeg" ? (
                            <Image src="/icons/jpg.svg" alt="jpg" />
                          ) : tabledata.type === "image/png" ? (
                            <Image src="/icons/jpg.svg" alt="jpg" />
                          ) : tabledata.type === "image/svg+xml" ? (
                            <Image src="/icons/jpg.svg" alt="jpg" />
                          ) : null}
                          <div className={reporttable.absolutecenter}>
                            {tabledata?.name?.substring(0, 10)}
                          </div>
                        </div>
                      </td>
                      <td>{projectname}</td>
                      <td>{tabledata?.send_from}</td>
                      <td>{tabledata?.sent_to}</td>
                      <td>{new Date(tabledata?.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </>
              );
            })}
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

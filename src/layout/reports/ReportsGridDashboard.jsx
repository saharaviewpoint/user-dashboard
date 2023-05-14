import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FileInputContainer from "@/components/reports/FileInputContainer";
import React, { useState, useMemo, forwardRef } from "react";
import Header from "../../components/reports/Header";
import reportsgrid from "./reports.module.css";
import { Container, Button, Image, Form } from "react-bootstrap";
import { reportgriddata } from "../../../data/reports";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useGetReportsDetailsQuery,
  useGetProjectDetailsQuery,
  useGetTaskDetailsQuery,
} from "@/app/services/auth/authService";
import Skeleton from "react-loading-skeleton";


const ReportsGridDashboard = () => {
  const [filter, setFilter] = useState(null);
  const [select, setSelect] = useState("");
  const [task, setTask] = useState("");
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState(false);

  const { data: AdminReports } = useGetReportsDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const { data: projects, isLoading } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const { data: tasks } = useGetTaskDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const projectsCollection = projects || [];

  const taskCollection = tasks || [];

  const ReportsCollection = AdminReports || [];

  console.log("Batman");
  console.log(ReportsCollection);

  const [startDate, setStartDate] = useState(new Date("01/01/2022"));
  const [endDate, setEndDate] = useState(new Date("01/01/2029"));

  const convertedStartDate = new Date(startDate).toISOString();
  const convertedEndDate = new Date(endDate).toISOString();

  const finalStartDate = new Date(convertedStartDate).getTime();
  const finalEndDate = new Date(convertedEndDate).getTime();

  const data = useMemo(() => {
    if (!filter) return ReportsCollection;
    const filteredData = ReportsCollection.filter((item) =>
      item.type.startsWith(filter)
    );
    return filteredData;
  }, [filter, ReportsCollection]);

  const filteredCollection = useMemo(() => {
    if (!task) return data;
    const filteredData = data.filter((item) => item.task_id === task);
    console.log(filteredData);
    return filteredData;
  }, [task, data]);

  // const dataByDate = useMemo(() => {
  //   const filtereddata = data.filter(
  //     (item) =>
  //       finalStartDate <= new Date(item.date).getTime() &&
  //       new Date(item.date).getTime() <= finalEndDate
  //   );
  //   return filtereddata;
  // }, [finalStartDate, finalEndDate, data]);

  // console.log(dataByDate);
  const filteredDocument = ReportsCollection.filter((item) =>
    item.type.startsWith("application")
  );

  const filteredImage = ReportsCollection.filter((item) =>
    item.type.startsWith("image")
  );

  const filteredVideo = ReportsCollection.filter((item) =>
    item.type.startsWith("video")
  );

  const handleProject = (e) => {
    setSelect(e.target.value);
    console.log(select);
    setDisplay(true);
  };

  const handleTask = (e) => {
    setTask(e.target.value);
    console.log(task);
    setMessage("There are no reports for selected task");
  };

  const filteredtasks = useMemo(() => {
    const filtereddata = taskCollection.filter(
      (item) => item.project.id === select
    );
    return filtereddata;
  }, [select, ReportsCollection]);

  return (
    <Container className={reportsgrid.container}>
      <DashboardLayout name="Reports">
        <div className={reportsgrid.overallcontainer}>
          <FileInputContainer />
          <Header name="My Reports" />
          <div className={reportsgrid.leftcontainer}>
            <div className={reportsgrid.flexwrap}>
              <NavCategories
                name="All Files"
                filter={filter}
                filter1={null}
                total={`(${ReportsCollection.length})`}
                onClick={() => {
                  setFilter(null);
                  setTask(null);
                  setMessage("There are no reports");
                }}
              />

              <NavCategories
                name="Pictures"
                filter={filter}
                filter1="image"
                total={`(${filteredImage.length})`}
                onClick={() => {
                  setFilter("image");
                  setTask(null);
                  setMessage("There are no images");
                }}
              />
              <NavCategories
                name="Video"
                filter={filter}
                filter1="video"
                total={`(${filteredVideo.length})`}
                onClick={() => {
                  setFilter("videos");
                  setTask(null);
                  setMessage("There are no videos");
                }}
              />
              <NavCategories
                name="Documents"
                filter={filter}
                filter1="document"
                total={`(${filteredDocument.length})`}
                onClick={() => {
                  setFilter("document");
                  setTask(null);
                  setMessage("There are no documents");
                }}
              />
            </div>
            {/* <div className={reportsgrid.datepickertitle}>
              <p className={reportsgrid.datepickertitlelabel}>Start Date</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                showYearDropdown
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                dateFormat="dd/MM/yyyy"
                customInput={<ExampleCustomInput />}
                // width={300}
              />
            </div>
            <div className={reportsgrid.absolutecenter}>
              <div className={reportsgrid.dash}></div>
            </div>
            <div className={reportsgrid.datepickertitle}>
              <p className={reportsgrid.datepickertitlelabel}>End Date</p>
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
            </div> */}
            <div className={reportsgrid.absolutecenter}>
              <Form.Select
                onChange={handleProject}
                // value={select}
                style={{ cursor: "pointer" }}
                aria-label="Default select example"
              >
                <option>Select A Project</option>
                {projectsCollection.map((pcollect, index) => (
                  <option key={index} value={pcollect._id}>
                    {pcollect.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className={reportsgrid.absolutecenter}>
              {display ? (
                <Form.Select
                  onChange={handleTask}
                  aria-label="Default select example"
                >
                  <option>Select A Task</option>
                  {filteredtasks.map((task, index) => (
                    <option key={index} value={task._id}>
                      {task.name}
                    </option>
                  ))}
                </Form.Select>
              ) : null}
            </div>
          </div>
          <div>
            {isLoading ? (
              <Skeleton
                baseColor="#ebab34"
                highlightColor="#f2cb07"
                width={300}
              />
            ) : (
              <>
                {filteredCollection.length >= 1 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "3rem",
                      marginTop: "2rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {filteredCollection.map((repo, index) => {
                      return (
                        <CardGridContainer
                          key={index}
                          url={repo.url}
                          firstname={repo?.send_from || null}
                          // lastname = {repo?.sent_to?.lastname}
                          name={repo.name}
                          imagelink={repo.type}
                          // mainimage={report.mainimage}
                          // avatar={report.avatar}
                          // avatarname={report.avatarname}
                          date={repo.date}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ marginTop: "3rem" }}>
                    <p className={reportsgrid.nothing}>
                      {message || "There are no reports"}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default ReportsGridDashboard;

const NavCategories = (props) => {
  const active = props.filter === props.filter1;
  return (
    <Button
      className={
        active
          ? reportsgrid.tablenavcontaineractive
          : reportsgrid.tablenavcontainer
      }
      onClick={props.onClick}
    >
      {props.name}
      <span>{props.total}</span>
      <span className={reportsgrid.disappear}>{props.filter}</span>
      <span className={reportsgrid.disappear}>{props.filter1}</span>
      {/* </p> */}
    </Button>
  );
};

const CardGridContainer = (props) => {
  return (
    <div className={reportsgrid.cardcontainer}>
      <div className={reportsgrid.fleximageicon}>
        <div className={reportsgrid.centergridicon}>
          {props.imagelink.startsWith("image") ? (
            <Image src="/icons/jpg.svg" alt="jpg" />
          ) : props.imagelink.startsWith("application") ? (
            <Image src="/icons/pdf.svg" alt="jpg" />
          ) : props.imagelink.startsWith("video") ? (
            <Image src="/icons/reports/pdf.svg" alt="jpg" />
          ) : null}
        </div>
        <div className={reportsgrid.absolutecenter}>
          <p className={reportsgrid.filename}>{props.name?.substring(0, 12)}</p>
        </div>
      </div>
      <div className={reportsgrid.flexcontainer}>
        <Image
          src={`${props.url}`}
          className={reportsgrid.gridimage}
          alt="image-icon"
        />
        <div className={reportsgrid.absolutecenter}>
          {/* <p className={reportsgrid.filename}>{props.name?.substring(0, 7)}</p> */}
          {/* <span>{truncateString(props.lastname, 1)}</span> */}
        </div>
      </div>
      {/* <Image
        src={`${props.mainimage}`}
        alt="main-image"
        className={reportsgrid.mainimage}
      /> */}
      <div className={reportsgrid.flexjust}>
        <div className={reportsgrid.flexcontainer}>
          {/* <Image src={`${props.avatar}`} /> */}
          <div className={reportsgrid.absolutecenter}>
            <p className={reportsgrid.avatarname}>{props.firstname}</p>
            <p className={reportsgrid.avatarname}>{props.lastname}</p>
          </div>
        </div>
        <div className={reportsgrid.absolutecenter}>
          <p className={reportsgrid.date}>
            {" "}
            {new Date(props.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className={reportsgrid.datepickerbutton} onClick={onClick} ref={ref}>
    <div className={reportsgrid.center}>
      <Image
        src="/icons/calendar.svg"
        alt="icon"
        className={reportsgrid.calendaricon}
      />
    </div>
    <p className={reportsgrid.datevalue}>{value}</p>
  </button>
));

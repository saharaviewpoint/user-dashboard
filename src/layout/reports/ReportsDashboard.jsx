import React, { useState, useMemo, forwardRef } from "react";
import { Container, Button, Image, Form } from "react-bootstrap";
import report from "./reports.module.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Header from "../../components/reports/Header";
import DatePicker from "react-datepicker";
import "./projects.css";
import "react-datepicker/dist/react-datepicker.css";
import FileInputContainer from "@/components/reports/FileInputContainer";
import ReportModal from "@/components/reports/ReportModal";
import {
  useGetReportsDetailsQuery,
  useGetProjectDetailsQuery,
  useGetTaskDetailsQuery,
} from "../../app/services/auth/authService";
import { truncateString } from "../../../util/text";
import Skeleton from "react-loading-skeleton";

const ReportsDashboard = () => {
  const { data: userReports, isLoading } = useGetReportsDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const { data: projects } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const { data: tasks } = useGetTaskDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const reportsCollection = userReports || [];

  console.log(reportsCollection);

  const projectsCollection = projects || [];

  const taskCollection = tasks || [];

  console.log(taskCollection);

  console.log(reportsCollection);

  const [filter, setFilter] = useState(null);
  const [select, setSelect] = useState("");
  const [task, setTask] = useState("");
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState(false);

  const [startDate, setStartDate] = useState(new Date("01/01/2022"));
  const [endDate, setEndDate] = useState(new Date("01/01/2028"));

  const convertedStartDate = new Date(startDate).toISOString();
  const convertedEndDate = new Date(endDate).toISOString();

  const finalStartDate = new Date(convertedStartDate).getTime();
  const finalEndDate = new Date(convertedEndDate).getTime();

  const data = useMemo(() => {
    if (!filter) return reportsCollection;
    const filteredData = reportsCollection.filter((item) =>
      item.type.startsWith(filter)
    );
    return filteredData;
  }, [filter, reportsCollection]);

  const filteredCollection = useMemo(() => {
    if (!task) return data;
    const filteredData = data.filter((item) => item.task_id === task);
    console.log(filteredData);
    return filteredData;
  }, [task, data]);

  // const dataByDate = useMemo(() => {
  //   const filtereddata =
  //     data ||
  //     filteredCollection.filter(
  //       (item) =>
  //         finalStartDate <= new Date(item.date).getTime() &&
  //         new Date(item.date).getTime() <= finalEndDate
  //     );
  //   return filtereddata;
  // }, [finalStartDate, finalEndDate, data]);

  const filteredDocument = reportsCollection.filter((item) =>
    item.type.startsWith("application")
  );

  const filteredImage = reportsCollection.filter((item) =>
    item.type.startsWith("image")
  );

  const filteredVideo = reportsCollection.filter((item) =>
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
  }, [select, reportsCollection]);

  // console.log(filteredImage);
  return (
    <Container className={report.container}>
      <DashboardLayout name="Reports">
        <div className={report.overallcontainer}>
          <FileInputContainer />
          <Header name="My Reports" />
          <div className={report.leftcontainer}>
            <div className={report.flexwrap}>
              <NavCategories
                name="All Files"
                total={`(${reportsCollection.length})`}
                filter={filter}
                filter1={null}
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
                  setFilter("video");
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
            {/* <div className={report.datepickertitle}>
              <p className={report.datepickertitlelabel}>Start Date</p>
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
            <div className={report.absolutecenter}>
              <div className={report.dash}></div>
            </div>
            <div className={report.datepickertitle}>
              <p className={report.datepickertitlelabel}>End Date</p>
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
            <div className={report.absolutecenter}>
              <Form.Select
                onChange={handleProject}
                style={{ cursor: "pointer" }}
                // value={select}
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
            <div className={report.absolutecenter}>
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

            {/* )} */}
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
                  <div className={report.filecontainergrid}>
                    {filteredCollection.map((repo, index) => {
                      return (
                        <FileContainer
                          key={index}
                          name={repo.name}
                          size={repo.size}
                          date={repo.date}
                          imagelink={repo.type}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ marginTop: "3rem" }}>
                    <p className={report.nothing}>
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

export default ReportsDashboard;

const NavCategories = (props) => {
  const active = props.filter === props.filter1;
  return (
    <Button
      className={
        active ? report.tablenavcontaineractive : report.tablenavcontainer
      }
      onClick={props.onClick}
    >
      {/* <p className={project.tablenavtext}> */}
      {props.name}
      <span>{props.total}</span>
      <span className={report.disappear}>{props.filter}</span>
      <span className={report.disappear}>{props.filter1}</span>
      {/* </p> */}
    </Button>
  );
};

const FileContainer = (props) => {
  return (
    <div className={report.filecontainer} onClick={props.handleclick}>
      <div className={report.centericon}>
        {props.imagelink.startsWith("image") ? (
          <Image src="/icons/jpg.svg" alt="jpg" />
        ) : props.imagelink.startsWith("application") ? (
          <Image src="/icons/pdf.svg" alt="jpg" />
        ) : props.imagelink.startsWith("video") ? (
          <Image src="/icons/reports/pdf.svg" alt="jpg" />
        ) : null}
      </div>
      <div className={report.filerightcontainer}>
        <p className={report.name}>{truncateString(props.name, 10)}</p>
        <div className={report.flex}>
          <p className={report.size}> {Math.round(props.size / 1000) + "kb"}</p>
          <p className={report.date}>
            {" "}
            {new Date(props.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className={report.datepickerbutton} onClick={onClick} ref={ref}>
    <div className={report.center}>
      <Image
        src="/icons/calendar.svg"
        alt="icon"
        className={report.calendaricon}
      />
    </div>
    <p className={report.datevalue}>{value}</p>
  </button>
));

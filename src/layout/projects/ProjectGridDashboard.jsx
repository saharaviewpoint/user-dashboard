import React, { forwardRef, useState, useMemo } from "react";
import { Container, Image, Button } from "react-bootstrap";
import project from "./project.module.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Header from "../../components/project/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProjectGridContainer from "../../components/project/ProjectGridContainer";
import { ButtonProject } from "../../components/dashboard/DashboardContents";
import { useGetProjectDetailsQuery } from "@/app/services/auth/authService";
import SkeleteonBoard from "@/components/dashboard/SkeletonBoard";

const ProjectGridDashboard = () => {
  const { data: UserProjectGrid, isLoading } = useGetProjectDetailsQuery({
    refetchOnMountArgChange: true,
  });
  const ProjectGridCollection = UserProjectGrid || [];
  const [startDate, setStartDate] = useState(new Date("01/01/1998"));
  const [endDate, setEndDate] = useState(new Date("01/01/2022"));

  const convertedStartDate = new Date(startDate).toISOString();
  const convertedEndDate = new Date(endDate).toISOString();

  const finalStartDate = new Date(convertedStartDate).getTime();
  const finalEndDate = new Date(convertedEndDate).getTime();

  const [filter, setFilter] = useState(null);

  const data = useMemo(() => {
    if (!filter) return ProjectGridCollection;
    const filteredData = ProjectGridCollection.filter(
      (item) =>
        item.user_status === filter &&
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filteredData;
  }, [filter, finalStartDate, finalEndDate, ProjectGridCollection]);

  const filteredInProgressData = ProjectGridCollection.filter(
    (item) => item.user_status === "In Progress"
  );

  const filteredUpcomingData = ProjectGridCollection.filter(
    (item) => item.user_status === "Awaiting Approval"
  );

  const filteredCompleteData = ProjectGridCollection.filter(
    (item) => item.user_status === "Complete"
  );
  return (
    <Container className={project.container}>
      <DashboardLayout name="Projects">
        <div className={project.overallcontainer}>
          <ButtonProject />
          <Header name="My Projects" />
          {/* <div className={project.absolutecenter}> */}
          <div className={project.leftcontainer}>
            <div className={project.flexwrap}>
              <NavCategories
                name="All Projects"
                filter={filter}
                filter1={null}
                total={`(${ProjectGridCollection.length})`}
                onClick={() => setFilter(null)}
              />

              <NavCategories
                name="Awaiting Approval"
                filter={filter}
                filter1="Upcoming"
                total={`(${filteredUpcomingData.length})`}
                onClick={() => setFilter("Awaiting Approval")}
              />
              <NavCategories
                name="In Progress"
                filter1="inprogress"
                filter={filter}
                total={`(${filteredInProgressData.length})`}
                onClick={() => setFilter("In Progress")}
              />
              <NavCategories
                name="Completed"
                filter={filter}
                filter1="Complete"
                total={`(${filteredCompleteData.length})`}
                onClick={() => setFilter("Complete")}
              />
            </div>
            <div className={project.datepickertitle}>
              <p className={project.datepickertitlelabel}>Start Date</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                customInput={<ExampleCustomInput />}
                width={300}
              />
            </div>
            <Image style={{ marginTop: "18px" }} src="/icons/dash.svg" />
            <div className={project.datepickertitle}>
              <p className={project.datepickertitlelabel}>End Date</p>
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
          {/* </div> */}
          {isLoading ? (
            <SkeleteonBoard />
          ) : (
            <div className={project.wrap}>
              {data.map((projectcollect, index) => (
                <ProjectGridContainer
                  key={index}
                  text={projectcollect.name}
                  date={projectcollect.due}
                  status={projectcollect.user_status}
                  priority={projectcollect.priority}
                ></ProjectGridContainer>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default ProjectGridDashboard;

const ImageIcon = (props) => {
  return <Image src={`${props.imagelink}`} alt="priority" />;
};

const NavCategories = (props) => {
  const active = props.filter === props.filter1;
  return (
    <Button
      className={
        active ? project.tablenavcontaineractive : project.tablenavcontainer
      }
      onClick={props.onClick}
    >
      {/* <p className={project.tablenavtext}> */}
      {props.name}
      <span>{props.total}</span>
      <span className={project.disappear}>{props.filter}</span>
      <span className={project.disappear}>{props.filter1}</span>
      {/* </p> */}
    </Button>
  );
};

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className={project.datepickerbutton} onClick={onClick} ref={ref}>
    <div className={project.center}>
      <Image
        src="/icons/calendar.svg"
        alt="icon"
        className={project.calendaricon}
      />
    </div>
    <p className={project.datevalue}>{value}</p>
  </button>
));

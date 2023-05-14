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
import ModalProject from "../../components/project/ModalProject";

const ProjectGridDashboard = () => {
  const { data: UserProjectGrid, isLoading } = useGetProjectDetailsQuery({
    refetchOnMountArgChange: true,
  });
  const [modalShow, setModalShow] = React.useState(false);
  const [setting, setSetting] = useState("");
  const ProjectGridCollection = UserProjectGrid || [];
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const convertedStartDate = new Date(startDate).toISOString();
  const convertedEndDate = new Date(endDate).toISOString();

  const finalStartDate = new Date(convertedStartDate).getTime();
  const finalEndDate = new Date(convertedEndDate).getTime();

  const [filter, setFilter] = useState(null);

  const data = useMemo(() => {
    if (!filter) return ProjectGridCollection;
    const filteredData = ProjectGridCollection.filter(
      (item) => item.user_status === filter
    );
    return filteredData;
  }, [filter, ProjectGridCollection]);

  const dataByDate = useMemo(() => {
    if (!startDate && !endDate) return data;
    const filtereddata = data.filter(
      (item) =>
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filtereddata;
  }, [finalStartDate, finalEndDate, data]);

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
                onClick={() => {
                  setFilter(null);
                  setStartDate(null);
                  setEndDate(null);
                }}
              />

              <NavCategories
                name="Awaiting Approval"
                filter={filter}
                filter1="Awaiting Approval"
                total={`(${filteredUpcomingData.length})`}
                onClick={() => {
                  setFilter("Awaiting Approval");
                  setStartDate(null);
                  setEndDate(null);
                }}
              />
              <NavCategories
                name="In Progress"
                filter1="In Progress"
                filter={filter}
                total={`(${filteredInProgressData.length})`}
                onClick={() => {
                  setFilter("In Progress");
                  setStartDate(null);
                  setEndDate(null);
                }}
              />
              <NavCategories
                name="Completed"
                filter={filter}
                filter1="Complete"
                total={`(${filteredCompleteData.length})`}
                onClick={() => {
                  setFilter("Complete");
                  setStartDate(null);
                  setEndDate(null);
                }}
              />
            </div>
            <div className={project.datepickertitle}>
              <p className={project.datepickertitlelabel}>Start Date</p>
              <DatePicker
                selected={startDate ?? new Date("01/01/2023")}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                showYearDropdown
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                dateFormat="dd/MM/yyyy"
                customInput={<ExampleCustomInput />}
                // width={300}
              />
            </div>
            <div className={project.absolutecenter}>
              <div className={project.dash}></div>
            </div>
            <div className={project.datepickertitle}>
              <p className={project.datepickertitlelabel}>End Date</p>
              <DatePicker
                showIcon
                selected={endDate ?? new Date("10/10/2023")}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                showYearDropdown
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                dateFormat="dd/MM/yyyy"
                customInput={<ExampleCustomInput />}
                endDate={endDate}
              />
            </div>
          </div>
          {/* </div> */}
          {isLoading ? (
            <SkeleteonBoard />
          ) : (
            <>
              {dataByDate.length >= 1 ? (
                <div className={project.wrap}>
                  {data.map((projectcollect, index) => (
                    <div
                      onClick={() => {
                        setSetting(projectcollect._id);
                        setModalShow(true);
                      }}
                    >
                      <ProjectGridContainer
                        key={index}
                        text={projectcollect.name}
                        date={projectcollect.due}
                        status={projectcollect.user_status}
                        priority={projectcollect.priority}
                      ></ProjectGridContainer>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ marginTop: "2rem" }}>
                  <p className={project.nothing}>There are no projects</p>
                </div>
              )}
            </>
          )}
        </div>
      </DashboardLayout>
      <ModalProject
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={setting}
      />
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

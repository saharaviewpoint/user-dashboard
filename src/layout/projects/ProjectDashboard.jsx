import React, { useMemo, useState, forwardRef } from "react";
import { Button, Container, Image, Row, Col } from "react-bootstrap";
import project from "./project.module.css";
import "./projects.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Header from "../../components/project/Header";
import TableDisplay from "../../components/project/TableDisplay";
import ModalProject from "../../components/project/ModalProject";
import { useGetProjectDetailsQuery } from "@/app/services/auth/authService";
import { ButtonProject } from "../../components/dashboard/DashboardContents";
import SkeleteonLoaderTable from "../../components/dashboard/SkeleteonLoaderTable";

const ProjectDashboard = () => {
  const { data: UserTableProjects, isLoading } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const [filter, setFilter] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [setting, setSetting] = useState("");

  const ProjectsCollection = UserTableProjects || [];

  console.log(ProjectsCollection);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const convertedStartDate = new Date(startDate).toISOString();
  const convertedEndDate = new Date(endDate).toISOString();

  const finalStartDate = new Date(convertedStartDate).getTime();
  const finalEndDate = new Date(convertedEndDate).getTime();

  const data = useMemo(() => {
    if (!filter) return ProjectsCollection;
    const filteredData = ProjectsCollection.filter(
      (item) => item.user_status === filter
    );
    return filteredData;
  }, [filter, ProjectsCollection]);

  const dataByDate = useMemo(() => {
    if (!startDate || !endDate) return data;
    const filtereddata = data.filter(
      (item) =>
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filtereddata;
  }, [finalStartDate, finalEndDate, data]);

  const filteredInProgressData = ProjectsCollection.filter(
    (item) => item.user_status === "In Progress"
  );

  const filteredUpcomingData = ProjectsCollection.filter(
    (item) => item.user_status === "Awaiting Approval"
  );

  const filteredCompleteData = ProjectsCollection.filter(
    (item) => item.user_status === "Complete"
  );

  console.log(ProjectsCollection);
  return (
    <Container className={project.container}>
      <DashboardLayout name="Projects">
        <div className={project.overallcontainer}>
          <ButtonProject />
          <Header name="My Projects" />
          <div className={project.leftcontainer}>
            <div className={project.flexwrap}>
              <NavCategories
                name="All Projects"
                total={`(${ProjectsCollection.length})`}
                filter={filter}
                filter1={null}
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
                filter1="inprogress"
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
                total={`(${filteredCompleteData.length})`}
                filter={filter}
                filter1="Complete"
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
                // minDate={endDate ?? new Date("01/01/2023")}
              />
            </div>
          </div>
          {isLoading ? (
            <SkeleteonLoaderTable />
          ) : (
            <div>
              {dataByDate.length >= 1 ? (
                <TableDisplay>
                  {dataByDate.map((projectcollect, index) => (
                    <tr
                      onClick={() => {
                        setSetting(projectcollect._id);
                        setModalShow(true);
                      }}
                      key={index}
                      className={project.tablerow}
                    >
                      <td className={project.align}>{projectcollect.name}</td>
                      <td>
                        {projectcollect?.assigned_to?.firstname &&
                        projectcollect?.assigned_to?.lastname ? (
                          <div className={project.absolutecenter}>
                            <p className={project.avatar}>
                              {" "}
                              {projectcollect?.assigned_to?.firstname.charAt(0)}
                              <span>
                                {projectcollect?.assigned_to?.lastname.charAt(
                                  0
                                )}
                              </span>
                            </p>
                          </div>
                        ) : (
                          <div className={project.absolutecenter}>
                            <p className={project.unassigned}>Unassigned</p>
                          </div>
                        )}
                      </td>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        <StatusButton text={projectcollect.user_status} />
                      </td>
                      <td className={project.centericon}>
                        {new Date(projectcollect.date).toLocaleDateString()}
                      </td>
                      <td className={project.centericon}>
                        {projectcollect.priority === "red" ? (
                          <ImageIcon imagelink="/icons/table/redflag.svg" />
                        ) : projectcollect.priority === "gray" ? (
                          <ImageIcon imagelink="/icons/table/normalflag.svg" />
                        ) : projectcollect.priority === "yellow" ? (
                          <ImageIcon imagelink="/icons/table/warningflag.svg" />
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </TableDisplay>
              ) : (
                <div style={{ marginTop: "3rem" }}>
                  <p className={project.nothing}>There are no projects</p>
                </div>
              )}
            </div>
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

export default ProjectDashboard;

const StatusButton = (props) => {
  return (
    <div className={project.statusbutton}>
      <p
        className={
          props.text === "Awaiting Approval"
            ? project.awaitbuttontext
            : props.text === "Complete"
            ? project.completebuttontext
            : props.text == "In Progress"
            ? project.incomingtext
            : null
        }
      >
        {props.text}
      </p>
    </div>
  );
};

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

import React, { useMemo, useState, forwardRef } from "react";
import { Container, Button, Image, Form } from "react-bootstrap";
import task from "./task.module.css";
import "./task.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TaskTableDisplay from "../../components/tasks/TaskTableDisplay";
import TaskHeader from "../../components/tasks/TaskHeader";
import ModalTask from "@/components/tasks/ModalTask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useGetProjectDetailsQuery,
  useGetTaskDetailsQuery,
} from "../../app/services/auth/authService";
import SkeleteonLoaderTable from "../../components/dashboard/SkeleteonLoaderTable";

const TasksDashboard = () => {
  const { data: TaskCollection, isLoading } = useGetTaskDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const { data: projectsCollection } = useGetProjectDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const TasksTableCollection = TaskCollection || [];

  const projects = projectsCollection || [];

  const [select, setSelect] = useState("");
  const [tasked, setTasked] = useState("");
  const [display, setDisplay] = useState(false);

  console.log(TasksTableCollection);
  const [filter, setFilter] = useState(null);

  const [setting, setSetting] = useState("");
  const [modalShow, setModalShow] = React.useState(false);

  const [startDate, setStartDate] = useState(new Date("01/01/1998"));
  const [endDate, setEndDate] = useState(new Date("01/01/2077"));

  const convertedStartDate = new Date(startDate).toISOString();
  const convertedEndDate = new Date(endDate).toISOString();

  const finalStartDate = new Date(convertedStartDate).getTime();
  const finalEndDate = new Date(convertedEndDate).getTime();

  const data = useMemo(() => {
    if (!filter) return TasksTableCollection;
    const filteredData = TasksTableCollection.filter(
      (item) => item.user_status === filter
    );
    return filteredData;
  }, [filter, TasksTableCollection]);

  // const dataByDate = useMemo(() => {
  //   const filtereddata = data.filter(
  //     (item) =>
  //       finalStartDate <= new Date(item.due).getTime() &&
  //       new Date(item.due).getTime() <= finalEndDate
  //   );
  //   return filtereddata;
  // }, [finalStartDate, finalEndDate, data]);
  console.log(data);
  console.log(tasked);
  const filteredCollection = useMemo(() => {
    if (!tasked) return data;
    const filteredData = data.filter((item) => item._id === tasked);
    console.log(filteredData);
    return filteredData;
  }, [tasked, data]);

  console.log(data);
  console.log(filteredCollection);
  // console.log(filteredCollection);
  const filteredApprovedData = TasksTableCollection.filter(
    (item) => item.user_status === "Approved"
  );

  const filteredPendingData = TasksTableCollection.filter(
    (item) => item.user_status === "Awaiting Approval"
  );

  const filteredDeclinedData = TasksTableCollection.filter(
    (item) => item.user_status === "Declined"
  );

  const handleProject = (e) => {
    setSelect(e.target.value);
    console.log(select);
    setDisplay(true);
  };

  const handleTask = (e) => {
    setTasked(e.target.value);
    console.log(tasked);
    // setMessage("There are no reports for selected task");
  };

  const filteredtasks = useMemo(() => {
    const filtereddata = TasksTableCollection.filter(
      (item) => item.project.id === select
    );
    return filtereddata;
  }, [select, TasksTableCollection]);

  return (
    <Container className={task.container}>
      <DashboardLayout name="Tasks">
        <div className={task.overallcontainer}>
          <TaskHeader name="My Tasks" />
          <div className={task.leftcontainer}>
            <div className={task.flexwrap}>
              <NavCategories
                name="All Tasks"
                total={`(${TasksTableCollection.length})`}
                filter={filter}
                filter1={null}
                onClick={() => setFilter(null)}
              />

              <NavCategories
                name="Approved"
                total={`(${filteredApprovedData.length})`}
                filter={filter}
                filter1="Approved"
                onClick={() => setFilter("Approved")}
              />
              <NavCategories
                name="Awaiting Approval"
                total={`(${filteredPendingData.length})`}
                filter1="Awaiting Approval"
                filter={filter}
                onClick={() => setFilter("Awaiting Approval")}
              />
              <NavCategories
                name="Declined"
                total={`(${filteredDeclinedData.length})`}
                filter={filter}
                filter1="Declined"
                onClick={() => setFilter("Declined")}
              />
            </div>
            <div className={task.absolutecenter}>
              <Form.Select
                onChange={handleProject}
                value={select}
                aria-label="Default select example"
              >
                <option>Select A Project</option>
                {projects.map((pcollect, index) => (
                  <option key={index} value={pcollect._id}>
                    {pcollect.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className={task.absolutecenter}>
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
          {isLoading ? (
            <SkeleteonLoaderTable />
          ) : (
            <div>
              {filteredCollection.length >= 1 ? (
                <TaskTableDisplay>
                  {filteredCollection.map((taskcollect, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        setSetting(taskcollect._id);
                        setModalShow(true);
                      }}
                    >
                      <td>
                        <div className={task.flexcontent}>
                          {taskcollect.star === "true" ? (
                            <Icon imagelink="/icons/dashboard/task/starred.svg" />
                          ) : (
                            <Icon imagelink="/icons/dashboard/task/star.svg" />
                          )}
                          <div className={task.centertext}>
                            <p className={task.tasktitle}>{taskcollect.name}</p>
                          </div>
                        </div>
                      </td>
                      <td>{taskcollect.project.name}</td>
                      <td>
                        <div className={task.absolutecenter}>
                          <p className={task.avatar}>
                            {" "}
                            {taskcollect.assigned_to?.firstname.charAt(0)}
                            <span>
                              {taskcollect.assigned_to?.lastname.charAt(0)}
                            </span>
                          </p>
                        </div>
                      </td>
                      <td>
                        <StatusButton text={taskcollect.status} />
                      </td>
                      <td className={task.centericon}>
                        {" "}
                        {new Date(taskcollect.date).toLocaleDateString()}
                      </td>
                      <td className={task.centericon}>
                        {taskcollect.priority === "red" ? (
                          <ImageIcon imagelink="/icons/table/redflag.svg" />
                        ) : taskcollect.priority === "gray" ? (
                          <ImageIcon imagelink="/icons/table/normalflag.svg" />
                        ) : taskcollect.priority === "yellow" ? (
                          <ImageIcon imagelink="/icons/table/warningflag.svg" />
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </TaskTableDisplay>
              ) : (
                <div style={{ marginTop: "3rem" }}>
                  <p className={task.nothing}>There are no tasks</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DashboardLayout>
      <ModalTask
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={setting}
      />
    </Container>
  );
};

export default TasksDashboard;

const NavCategories = (props) => {
  const active = props.filter === props.filter1;
  return (
    <Button
      className={active ? task.tablenavcontaineractive : task.tablenavcontainer}
      onClick={props.onClick}
    >
      {/* <p className={project.tablenavtext}> */}
      {props.name}
      <span>{props.total}</span>
      <span className={task.disappear}>{props.filter}</span>
      <span className={task.disappear}>{props.filter1}</span>

      {/* </p> */}
    </Button>
  );
};

const StatusButton = (props) => {
  return (
    <div
      className={
        props.text === "In Progress"
          ? task.statusbutton
          : props.text === "Declined"
          ? task.declinedbutton
          : props.text == "Approved"
          ? task.approvedbutton
          : props.text == "Awaiting Approval"
          ? task.pendingbutton
          : null
      }
    >
      <p className={task.statusbuttontext}>{props.text}</p>
    </div>
  );
};

const ImageIcon = (props) => {
  return <Image src={`${props.imagelink}`} alt="priority" />;
};

const Icon = (props) => {
  return <Image src={`${props.imagelink}`} alt="icon" />;
};

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className={task.datepickerbutton} onClick={onClick} ref={ref}>
    <div className={task.center}>
      <Image
        src="/icons/calendar.svg"
        alt="icon"
        className={task.calendaricon}
      />
    </div>
    <p className={task.datevalue}>{value}</p>
  </button>
));

import React, { useMemo, useState, forwardRef, useEffect } from "react";
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
  useAddStarTaskMutation,
} from "../../app/services/auth/authService";
import SkeleteonLoaderTable from "../../components/dashboard/SkeleteonLoaderTable";
import { toast, Toaster } from "react-hot-toast";

const TasksDashboard = () => {
  const {
    data: TaskCollection,
    isLoading,
    refetch,
  } = useGetTaskDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const { data: projectsCollection } = useGetProjectDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const TasksTableCollection = TaskCollection || [];

  const projects = projectsCollection || [];

  const [addStarMutation] = useAddStarTaskMutation();

  const sortedArray = [
    ...TasksTableCollection.filter((item) => item.star === true),
    ...TasksTableCollection.filter((item) => item.star === false),
  ];

  const [select, setSelect] = useState("");
  const [tasked, setTasked] = useState("");
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState("There are no tasks");

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
    if (!filter) return sortedArray;
    const filteredData = sortedArray.filter((item) => item.status === filter);
    return filteredData;
  }, [filter, sortedArray]);

  const filteredCollection = useMemo(() => {
    if (select === "Select A Project" || !select) return data;
    const filteredData = data.filter((item) => item.project.id === select);
    return filteredData;
  }, [select, data]);

  const filteredApprovedData = sortedArray.filter(
    (item) => item.status === "Approved"
  );

  const filteredPendingData = sortedArray.filter(
    (item) => item.status === "Awaiting Approval"
  );

  const filteredDeclinedData = sortedArray.filter(
    (item) => item.status === "Declined"
  );

  const filteredInProgressData = sortedArray.filter(
    (item) => item.status === "In Progress"
  );

  const handleProject = (e) => {
    setSelect(e.target.value);
    setDisplay(true);
    // setMessage("There are no reports for selected task");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                onClick={() => {
                  setFilter(null);
                  setMessage("There are no tasks");
                  setSelect("Select A Project");
                }}
              />

              <NavCategories
                name="Approved"
                total={`(${filteredApprovedData.length})`}
                filter={filter}
                filter1="Approved"
                onClick={() => {
                  setFilter("Approved");
                  setMessage("There are no approved tasks");
                  setSelect("Select A Project");
                }}
              />
              <NavCategories
                name="Awaiting Approval"
                total={`(${filteredPendingData.length})`}
                filter1="Awaiting Approval"
                filter={filter}
                onClick={() => {
                  setFilter("Awaiting Approval");
                  setMessage("There are no tasks awaiting approval");
                  setSelect("Select A Project");
                }}
              />
              <NavCategories
                name="In Progress"
                total={`(${filteredInProgressData.length})`}
                filter1="In Progress"
                filter={filter}
                onClick={() => {
                  setFilter("In Progress");
                  setMessage("There are no tasks in progress");
                  setSelect("Select A Project");
                }}
              />
              <NavCategories
                name="Declined"
                total={`(${filteredDeclinedData.length})`}
                filter={filter}
                filter1="Declined"
                onClick={() => {
                  setFilter("Declined");
                  setMessage("There are no declined tasks");
                  setSelect("Select A Project");
                }}
              />
            </div>
            <div className={task.absolutecenter}>
              <Form.Select
                onChange={handleProject}
                value={select}
                style={{ cursor: "pointer" }}
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
          </div>
          {isLoading ? (
            <SkeleteonLoaderTable />
          ) : (
            <div>
              {filteredCollection.length >= 1 ? (
                <TaskTableDisplay>
                  {filteredCollection.map((taskcollect, index) => (
                    <tr key={index}>
                      <td>
                        <div className={task.flexcontent}>
                          {taskcollect.star ? (
                            <div
                              onClick={async (id) => {
                                try {
                                  await toast.promise(
                                    addStarMutation(taskcollect._id).unwrap(),
                                    {
                                      loading: "Saving",
                                      success: "Starred",
                                      error: "Failed to star",
                                    }
                                  );
                                  // toast.success("Project Registered Successfully");
                                  refetch();
                                } catch (error) {
                                  toast.error(error.status);
                                }
                              }}
                            >
                              <Icon imagelink="/icons/dashboard/task/starred.svg" />
                            </div>
                          ) : (
                            <div
                              onClick={async (id) => {
                                try {
                                  await toast.promise(
                                    addStarMutation(taskcollect._id).unwrap(),
                                    {
                                      loading: "Saving",
                                      success: "Starred",
                                      error: "Failed to star",
                                    }
                                  );
                                  // toast.success("Project Registered Successfully");
                                  refetch();
                                } catch (error) {
                                  toast.error(error.status);
                                }
                              }}
                            >
                              <Icon imagelink="/icons/dashboard/task/star.svg" />
                            </div>
                          )}
                          <div
                            onClick={() => {
                              setSetting(taskcollect._id);
                              setModalShow(true);
                            }}
                            className={task.centertext}
                          >
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
                <div style={{ marginTop: "2rem" }}>
                  <p className={task.nothing}>{message}</p>
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
      <Toaster
        position="top-left"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
            fontFamily: "Inter, sans-serif",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
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

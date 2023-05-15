import React, { useState, forwardRef, useMemo } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { Container, Image } from "react-bootstrap";
import taskboard from "./task.module.css";
import TaskHeader from "../../components/tasks/TaskHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetTaskDetailsQuery } from "../../app/services/auth/authService";
import SkeleteonGrid from "@/components/dashboard/SkeletonGrid";
import ModalTask from "@/components/tasks/ModalTask";

const TaskBoardDashboard = () => {
  const { data: TaskCollection, isLoading } = useGetTaskDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const TasksBoardCollection = TaskCollection || [];

  const [startDate, setStartDate] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [setting, setSetting] = useState("");
  const [endDate, setEndDate] = useState(null);

  const convertedStartDate = new Date(startDate).toISOString();
  const convertedEndDate = new Date(endDate).toISOString();

  const finalStartDate = new Date(convertedStartDate).getTime();
  const finalEndDate = new Date(convertedEndDate).getTime();

  const inprogressdata = useMemo(() => {
    const filteredData = TasksBoardCollection.filter(
      (item) => item.status === "In Progress"
    );
    return filteredData;
  }, [finalStartDate, finalEndDate, TasksBoardCollection]);

  const dataByDateinprogress = useMemo(() => {
    if (!startDate || !endDate) return inprogressdata;
    const filtereddata = inprogressdata.filter(
      (item) =>
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filtereddata;
  }, [finalStartDate, finalEndDate, inprogressdata]);

  const upcomingdata = useMemo(() => {
    const filteredData = TasksBoardCollection.filter(
      (item) => item.status === "Awaiting Approval"
    );
    return filteredData;
  }, [finalStartDate, finalEndDate, TasksBoardCollection]);

  const dataByDateupcoming = useMemo(() => {
    if (!startDate || !endDate) return upcomingdata;
    const filtereddata = upcomingdata.filter(
      (item) =>
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filtereddata;
  }, [finalStartDate, finalEndDate, upcomingdata]);

  const completedata = useMemo(() => {
    const filteredData = TasksBoardCollection.filter(
      (item) =>
        item.status === "Complete" &&
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filteredData;
  }, [finalStartDate, finalEndDate, TasksBoardCollection]);

  const dataByDatecomplete = useMemo(() => {
    if (!startDate || !endDate) return completedata;
    const filtereddata = completedata.filter(
      (item) =>
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filtereddata;
  }, [finalStartDate, finalEndDate, upcomingdata]);

  return (
    <Container className={taskboard.container}>
      <DashboardLayout name="Tasks">
        <div className={taskboard.overallcontainer}>
          <TaskHeader name="My Tasks" />
          <div className={taskboard.rightboardcontainer}>
            <div className={taskboard.datepickertitle}>
              <p className={taskboard.datepickertitlelabel}>Start Date</p>
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
            <div className={taskboard.absolutecenter}>
              <div className={taskboard.dash}></div>
            </div>
            <div className={taskboard.datepickertitle}>
              <p className={taskboard.datepickertitlelabel}>End Date</p>
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
          <div className={taskboard.flexboardcontainer}>
            {isLoading ? (
              <SkeleteonGrid />
            ) : (
              <div className={taskboard.sizecontainer}>
                <BoarderHeader text="In Progress" />
                <>
                  {dataByDateinprogress.length >= 1 ? (
                    <>
                      {dataByDateinprogress.map((filtereddata, index) => (
                        <ContentContainer
                          key={index}
                          name={filtereddata.name}
                          firstname={filtereddata.assigned_to?.firstname}
                          lastname={filtereddata.assigned_to?.lastname}
                          headertext={filtereddata.projectname}
                          content={filtereddata.comments}
                          onClick={() => {
                            setSetting(filtereddata._id);
                            setModalShow(true);
                          }}
                          date={filtereddata.due}
                          imagelink={filtereddata.imagelink}
                          priority={filtereddata.priority}
                        />
                      ))}
                    </>
                  ) : (
                    <div style={{ marginTop: "3rem" }}>
                      <p className={taskboard.nothing}>There are no projects</p>
                    </div>
                  )}
                </>
              </div>
            )}

            {isLoading ? (
              <SkeleteonGrid />
            ) : (
              <div className={taskboard.sizecontainer}>
                <BoarderHeader text="Awaiting Approval" />
                <>
                  {dataByDateupcoming.length >= 1 ? (
                    <>
                      {dataByDateupcoming.map((filtereddata, index) => (
                        <ContentContainer
                          key={index}
                          name={filtereddata.name}
                          firstname={filtereddata.assigned_to?.firstname}
                          lastname={filtereddata.assigned_to?.lastname}
                          headertext={filtereddata.projectname}
                          content={filtereddata.comments}
                          onClick={() => {
                            setSetting(filtereddata._id);
                            setModalShow(true);
                          }}
                          date={filtereddata.due}
                          imagelink={filtereddata.imagelink}
                          priority={filtereddata.priority}
                        />
                      ))}
                    </>
                  ) : (
                    <div style={{ marginTop: "2rem" }}>
                      <p className={taskboard.nothing}>
                        There are no upcoming tasks
                      </p>
                    </div>
                  )}
                </>
              </div>
            )}
            {isLoading ? (
              <SkeleteonGrid />
            ) : (
              <div className={taskboard.sizecontainer}>
                <BoarderHeader text="Completed" />
                <>
                  {dataByDatecomplete.length >= 1 ? (
                    <>
                      {dataByDatecomplete.map((filtereddata, index) => (
                        <ContentContainer
                          key={index}
                          name={filtereddata.name}
                          firstname={filtereddata.assigned_to?.firstname}
                          lastname={filtereddata.assigned_to?.lastname}
                          headertext={filtereddata.projectname}
                          content={filtereddata.comments}
                          date={filtereddata.duedate}
                          status={filtereddata.status}
                          onClick={() => {
                            setSetting(filtereddata._id);
                            setModalShow(true);
                          }}
                          imagelink={filtereddata.imagelink}
                          priority={filtereddata.priority}
                        />
                      ))}
                    </>
                  ) : (
                    <div style={{ marginTop: "2rem" }}>
                      <p className={taskboard.nothing}>
                        There are no completed tasks
                      </p>
                    </div>
                  )}
                </>
              </div>
            )}
          </div>
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

export default TaskBoardDashboard;

const BoarderHeader = (props) => {
  return (
    <div
      className={
        props.text === "In Progress"
          ? taskboard.boarderheadercontainer
          : props.text === "Awaiting Approval"
          ? taskboard.boarderheadercontainerpurple
          : props.text === "Completed"
          ? taskboard.borderheadercontainerblue
          : null
      }
    >
      <p className={taskboard.bordertext}>{props.text}</p>
    </div>
  );
};

const ContentContainer = (props) => {
  return (
    <div className={taskboard.contentcontainer}>
      <div className={taskboard.innercontainer}>
        <div className={taskboard.flexname}>
          <div className={taskboard.absolutecenter}>
            <p className={taskboard.name}>{props.name}</p>
          </div>
          <Image
            src="/icons/dots.svg"
            style={{ cursor: "pointer" }}
            alt="dots"
            onClick={props.onClick}
          />
        </div>
        <p className={taskboard.name1}>
          {props.firstname} <span>{props.lastname}</span>
        </p>
        <p className={taskboard.contenttext}>{props.headertext}</p>
        <p className={taskboard.content}>{props.content}</p>
        <div className={taskboard.flextext}>
          <p className={taskboard.assigned1}>Due:</p>
          <p className={taskboard.value}>
            {" "}
            {new Date(props.date).toLocaleDateString()}
          </p>
        </div>
        {props.status ? (
          <div className={taskboard.flextext}>
            <div className={taskboard.absolutecenter}>
              <p className={taskboard.assigned1}>Status:</p>
            </div>
            <div
              className={
                props.status === "Approved"
                  ? taskboard.approvedbutton
                  : props.status === "Awaiting Approval"
                  ? taskboard.pendingbutton
                  : props.status === "Declined"
                  ? taskboard.declinedbutton
                  : null
              }
            >
              <p className={taskboard.statusbuttontext1}>{props.status}</p>
            </div>
          </div>
        ) : null}
        {props.priority ? (
          <div className={taskboard.flextext}>
            <div className={taskboard.absolutecenter}>
              <p className={taskboard.assigned1}>Priority</p>
            </div>
            {props.priority === "red" ? (
              <ImageIcon imagelink="/icons/table/redflag.svg" />
            ) : props.priority === "gray" ? (
              <ImageIcon imagelink="/icons/table/normalflag.svg" />
            ) : props.priority === "yellow" ? (
              <ImageIcon imagelink="/icons/table/warningflag.svg" />
            ) : null}
          </div>
        ) : null}
      </div>

      <div className={taskboard.absoluterightcontainer}>
        <div className={taskboard.flexicon}>
          <ImageTextIcon src="/icons/attach.svg" value="3" />
          <ImageTextIcon src="/icons/message.svg" value="3" />
        </div>
      </div>
    </div>
  );
};

const ImageIcon = (props) => {
  return <Image src={`${props.imagelink}`} alt="priority" />;
};

const ImageTextIcon = (props) => {
  return (
    <div className={taskboard.imagetexticon}>
      <Image src={`${props.src}`} alt="priority" />
      <div className={taskboard.absolutecenter}>
        <p className={taskboard.icontext}>{props.value}</p>
      </div>
    </div>
  );
};

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className={taskboard.datepickerbutton} onClick={onClick} ref={ref}>
    <div className={taskboard.center}>
      <Image
        src="/icons/calendar.svg"
        alt="icon"
        className={taskboard.calendaricon}
      />
    </div>
    <p className={taskboard.datevalue}>{value}</p>
  </button>
));

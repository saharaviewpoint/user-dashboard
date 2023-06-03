import React, { useState, forwardRef } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TaskHeader from "../../components/tasks/TaskHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import taskcalendar from "./task.module.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./task.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container, Image } from "react-bootstrap";
import { calendarevents } from "../../../data/calendarevents";
import { useGetTaskDetailsQuery } from "@/app/services/auth/authService";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const TaskCalendarDashboard = () => {
  const [startDate, setStartDate] = useState(new Date("01/01/1998"));
  const [endDate, setEndDate] = useState(new Date("01/01/2024"));

  const { data: TaskCollection, isLoading } = useGetTaskDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const TasksBoardCollection = TaskCollection || [];

  const eventList = TasksBoardCollection.map((event) => {
    new Date(moment(event.date).format("YYYY,MM,DD"));
    return {
      title: event.name,
      start: new Date(moment(event.date).format("YYYY,MM,DD")),
      end: new Date(moment(event.due).format("YYYY,MM,DD")),
      // start: new Date(moment(event.date).format("YYYY-MM-DD")),
      // end: new Date(moment(event.due).format("YYYY-MM-DD")),
    };
  });

  return (
    <Container className={taskcalendar.container}>
      <DashboardLayout name="Tasks">
        <div className={taskcalendar.overallcontainer}>
          <TaskHeader name="My Tasks" />
          <div className={taskcalendar.rightboardcontainer}>
            <div className={taskcalendar.datepickertitle}>
              <p className={taskcalendar.datepickertitlelabel}>Start Date</p>
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
            <div className={taskcalendar.absolutecenter}>
              <div className={taskcalendar.dash}></div>
            </div>
            <div className={taskcalendar.datepickertitle}>
              <p className={taskcalendar.datepickertitlelabel}>End Date</p>
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
          <div style={{ height: 700, marginTop: "2rem" }}>
            <Calendar
              events={eventList}
              step={60}
              localizer={localizer}
              // views={allViews}
              // defaultView={week}
              // views={["week"]}
              // defaultDate={new Date(2023, 5, 1)}
              // popup={false}
              //   onShowMore={(events, date) =>
              //     this.setState({ showModal: true, events })
              //   }
            />
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default TaskCalendarDashboard;

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className={taskcalendar.datepickerbutton} onClick={onClick} ref={ref}>
    <div className={taskcalendar.center}>
      <Image
        src="/icons/calendar.svg"
        alt="icon"
        className={taskcalendar.calendaricon}
      />
    </div>
    <p className={taskcalendar.datevalue}>{value}</p>
  </button>
));

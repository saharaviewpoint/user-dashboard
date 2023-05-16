import React, { useState } from "react";
import { Modal, Image } from "react-bootstrap";
import { ProjectsCollection } from "../../../data/projects";
import modal from "./general.module.css";
import Form from "react-bootstrap/Form";
import "./Modal.css";
import {
  useGetProjectDetailsQuery,
  useGetProjectSpecificTaskQuery,
} from "@/app/services/auth/authService";
import Skeleton from "react-loading-skeleton";

const ModalProject = (props) => {
  const { data: UserProjects } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });
  const { data: task, isFetching } = useGetProjectSpecificTaskQuery(props.id);

  const specifictask = task || [];

  const [more, setMore] = useState(false);

  const ModalProjectsCollection = UserProjects || [];

  return (
    <Modal
      className={modal.modal}
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {ModalProjectsCollection.map((collect, index) =>
        props.id === collect._id ? (
          <div key={index}>
            <Modal.Header closeButton>
              <Modal.Title
                className={modal.containedmodaltitlecenter}
                id="contained-modal-title-vcenter"
              >
                <div className={modal.flexheader}>
                  <StatusButton text={collect.user_status} />
                  <CalendarText
                    datetitle="Project created:"
                    date={new Date(collect.date).toLocaleDateString()}
                  />
                  <CalendarText
                    datetitle="Due date:"
                    date={new Date(collect.due).toLocaleDateString()}
                  />
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={modal.modalbody}>
              <div className={modal.flexequalcontainer}>
                <div className={modal.descriptionleftcontainer}>
                  <div className={modal.paddingcontain}>
                    <p className={modal.nameproject}>{collect.name}</p>
                    <p className={modal.description}>{collect.details}</p>
                    <>
                      <p className={modal.assigned}>Assigned to:</p>
                      <div className={modal.yellowbackground}>
                        <Image
                          src="/images/avatar.png"
                          className={modal.imageavatar}
                          alt="avatar"
                        />
                        {collect?.assigned_to?.firstname &&
                        collect?.assigned_to?.lastname ? (
                          <>
                            <div className={modal.absolutecenter}>
                              <p className={modal.textname}>
                                {" "}
                                {collect?.assigned_to?.firstname} &nbsp;
                                <span>{collect?.assigned_to?.lastname}</span>
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className={modal.absolutecenter}>
                            <p className={modal.title1}>Unassigned</p>
                          </div>
                        )}
                      </div>

                      <p className={modal.taskname}>Tasks</p>
                      <div className={modal.taskcontainer}>
                        <div className={modal.taskheader}>
                          <div className={modal.flexheader}>
                            <Image
                              src="/icons/sidebar/tasks-icon.svg"
                              alt="task-icon"
                            />
                            <div className={modal.absolutecenter}>
                              <p className={modal.headertext1}>All Tasks</p>
                            </div>
                          </div>
                          <div className={modal.absolutecenter}>
                            <p className={modal.headertext1}>
                              0/ {specifictask.length}
                            </p>
                          </div>
                        </div>
                        <div className={modal.progressbar}>
                          <div className={modal.progressyellow}></div>
                        </div>
                        <div className={modal.formcontainer}>
                          <Form>
                            {isFetching ? (
                              <Skeleton
                                width={300}
                                baseColor="#ebab34"
                                highlightColor="#f2cb07"
                              />
                            ) : (
                              <>
                                {specifictask.length < 1 ? (
                                  <p className={modal.title1}>
                                    No Task Available
                                  </p>
                                ) : (
                                  <>
                                    {specifictask.length < 3 ? (
                                      <div>
                                        {specifictask?.map((task, index) => (
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              marginTop: "5px",
                                            }}
                                          >
                                            <div
                                              className={modal.absolutecenter}
                                            >
                                              <Form.Check
                                                type="checkbox"
                                                key={index}
                                                // checked={isActive}
                                                // onChange={changeHandler}
                                                id="custom-switch"
                                                label={task?.name}
                                              />
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div>
                                        {more ? (
                                          <>
                                            <div>
                                              {specifictask?.map(
                                                (task, index) => (
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      justifyContent:
                                                        "space-between",
                                                      marginTop: "5px",
                                                    }}
                                                  >
                                                    <div
                                                      className={
                                                        modal.absolutecenter
                                                      }
                                                    >
                                                      <Form.Check
                                                        type="checkbox"
                                                        key={index}
                                                        // checked={isActive}
                                                        // onChange={changeHandler}
                                                        id="custom-switch"
                                                        label={task?.name}
                                                      />
                                                    </div>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            {specifictask
                                              ?.slice(0, 3)
                                              .map((task, index) => (
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    justifyContent:
                                                      "space-between",
                                                    marginTop: "5px",
                                                  }}
                                                >
                                                  <div
                                                    className={
                                                      modal.absolutecenter
                                                    }
                                                  >
                                                    <Form.Check
                                                      type="checkbox"
                                                      key={index}
                                                      // checked={isActive}
                                                      // onChange={changeHandler}
                                                      id="custom-switch"
                                                      label={task?.name}
                                                    />
                                                  </div>
                                                </div>
                                              ))}
                                          </>
                                        )}
                                        {more ? (
                                          <p
                                            className={modal.title1}
                                            onClick={() => setMore(!more)}
                                          >
                                            See Less
                                          </p>
                                        ) : (
                                          <p
                                            className={modal.title1}
                                            onClick={() => setMore(!more)}
                                          >
                                            See More
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </Form>
                        </div>
                      </div>

                      <p className={modal.taskname}>Attachment</p>
                      <div className={modal.attachmentflex}>
                        {collect.attachments.length < 1 ? (
                          <p className={modal.notask}>
                            No Attachment available
                          </p>
                        ) : (
                          <>
                            {collect.attachments.length > 1 ? (
                              collect.attachments
                                .slice(0, 3)
                                .map((attachment, index) => (
                                  <Attachment
                                    key={index}
                                    imagelink={attachment.type}
                                    attachmentname={attachment.name}
                                    attachmentsize={attachment.size}
                                  />
                                ))
                            ) : (
                              <div className={modal.absolutebuttoncenter}>
                                <div className={modal.buttonname}>
                                  <p className={modal.buttontext}>
                                    See All Attachments
                                  </p>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  </div>
                </div>
                <div className={modal.descriptionrightcontainer}>
                  <div className={modal.activitycontainer1}>
                    <p className={modal.activitytext}>Recent Activity</p>
                    {ModalProjectsCollection.map((collect, index) =>
                      props.id === collect._id ? (
                        <div
                          className={modal.activityboardcontainer}
                          key={index}
                        >
                          {collect.activities.length < 1 ? (
                            <div>
                              <p className={modal.nothing}>No new activities</p>
                            </div>
                          ) : (
                            <>
                              {collect?.activities?.map((activities, index) => {
                                return (
                                  <div key={index}>
                                    {activities.action_type ===
                                    "project manager" ? (
                                      <AssignedActivitycontainer
                                        src="/icons/activity/user.svg"
                                        date={activities.date}
                                        type={activities.action_type}
                                        name={activities.initiator}
                                        assignee={activities.ref.name}
                                      />
                                    ) : activities.action_type === "task" ? (
                                      <AssignedTaskTitle
                                        src="/icons/activity/add.svg"
                                        date={activities.date}
                                        type={activities.action_type}
                                        name={activities.initiator}
                                        assignee={activities.ref.name}
                                      />
                                    ) : null}
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
        ) : null
      )}
    </Modal>
  );
};

export default ModalProject;

const StatusButton = (props) => {
  return (
    <div className={modal.statusbutton}>
      <p
        className={
          props.text === "Awaiting Approval"
            ? modal.statusbuttontext
            : props.text === "Complete"
            ? modal.completebuttontext
            : props.text == "Upcoming"
            ? modal.upcomingtext
            : props.text === "In Progress"
            ? modal.inprogresstext
            : null
        }
      >
        {props.text}
      </p>
    </div>
  );
};

const CalendarText = (props) => {
  return (
    <div className={modal.calendartextcontainer}>
      <p className={modal.datetitletext}>{props.datetitle}</p>
      <div className={modal.icontextcontainer}>
        <Image
          src="/icons/calendar.svg"
          className={modal.calendaricon}
          alt="priority"
        />
        <p className={modal.datetext}>{props.date}</p>
      </div>
    </div>
  );
};

const Attachment = (props) => {
  return (
    <div className={modal.attachmentcontainer}>
      <div className={modal.absolutecenter}>
        {props.imagelink.startsWith("image") ? (
          <Image src="/icons/jpg.svg" alt="jpg" />
        ) : props.imagelink.startsWith("application") ? (
          <Image src="/icons/pdf.svg" alt="jpg" />
        ) : props.imagelink.startsWith("video") ? (
          <Image src="/icons/reports/pdf.svg" alt="jpg" />
        ) : null}
      </div>
      <div>
        <p className={modal.attachmenttext}>
          {props.attachmentname.substring(0, 7)}
        </p>
        <p className={modal.attachmentsize}>
          {Math.round(props.attachmentsize / 1000) + "kb"}
        </p>
      </div>
    </div>
  );
};

const Activitycontainer = (props) => {
  return (
    <div className={modal.activitycontainer}>
      <Image src={`${props.src}`} className={modal.imageactivity} />
      <div className={modal.spacecontainer}>
        <p className={modal.activitydescription}>
          {props.description}
          <span className={modal.spantext}>{props.name}</span>
        </p>
        <p className={modal.activitydate}>{props.date}</p>
      </div>
    </div>
  );
};

const AssignedActivitycontainer = (props) => {
  return (
    <div className={modal.activitycontainer}>
      <Image src={`${props.src}`} className={modal.imageactivity} />
      <div className={modal.spacecontainer}>
        <p className={modal.activitydescription}>
          {props.name} assigned {props.type} as new {props.assignee}
          {/* <span className={modal.spantext}>{props.name}</span> */}
        </p>
        <p className={modal.activitydate}>
          {" "}
          Added at{" "}
          {new Date(props.date).toLocaleDateString("en-GB", {
            timeZone: "UTC",
          })}
        </p>
      </div>
    </div>
  );
};

const AssignedTaskTitle = (props) => {
  return (
    <div className={modal.activitycontainer}>
      <Image src={`${props.src}`} className={modal.imageactivity} />
      <div className={modal.spacecontainer}>
        <p className={modal.activitydescription}>
          {props.name} assigned {props.type} to {props.assignee}
          {/* <span className={modal.spantext}>{props.name}</span> */}
        </p>
        <p className={modal.activitydate}>
          {" "}
          Added at{" "}
          {new Date(props.date).toLocaleDateString("en-GB", {
            timeZone: "UTC",
          })}
        </p>
      </div>
    </div>
  );
};

const AssignedApproved = (props) => {
  return (
    <div className={modal.activitycontainer}>
      <Image src={`${props.src}`} className={modal.imageactivity} />
      <div className={modal.spacecontainer}>
        <p className={modal.activitydescription}>
          {props.name} {props.type} task :{" "}
          <span className={modal.taskassign}>{props.assignee}</span>
          {/* <span className={modal.spantext}>{props.name}</span> */}
        </p>
        <p className={modal.activitydate}>
          {" "}
          Added at{" "}
          {new Date(props.date).toLocaleDateString("en-GB", {
            timeZone: "UTC",
          })}
        </p>
      </div>
    </div>
  );
};

const AssignedDeclined = (props) => {
  return (
    <div className={modal.activitycontainer}>
      <Image src={`${props.src}`} className={modal.imageactivity} />
      <div className={modal.spacecontainer}>
        <p className={modal.activitydescription}>
          {props.name} {props.type} task :{" "}
          <span className={modal.taskassign}>{props.assignee}</span>
          {/* <span className={modal.spantext}>{props.name}</span> */}
        </p>
        <p className={modal.activitydate}>
          {" "}
          Added at{" "}
          {new Date(props.date).toLocaleDateString("en-GB", {
            timeZone: "UTC",
          })}
        </p>
      </div>
    </div>
  );
};

const AssignedRequested = (props) => {
  return (
    <div className={modal.activitycontainer}>
      <Image src={`${props.src}`} className={modal.imageactivity} />
      <div className={modal.spacecontainer}>
        <p className={modal.activitydescription}>
          {props.name} {props.type} task approval
          {/* <span className={modal.spantext}>{props.name}</span> */}
        </p>
        <p className={modal.activitydate}>
          {" "}
          Added at{" "}
          {new Date(props.date).toLocaleDateString("en-GB", {
            timeZone: "UTC",
          })}
        </p>
      </div>
    </div>
  );
};

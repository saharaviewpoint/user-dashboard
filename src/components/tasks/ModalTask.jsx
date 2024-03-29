import React, { useEffect } from "react";
import modal from "./tasktable.module.css";
import { Modal, Image } from "react-bootstrap";
import { MdOutlineCloudUpload } from "react-icons/md";
import "../project/Modal.css";
import {
  useGetTaskDetailsQuery,
  useGetSpecificTaskQuery,
} from "../../app/services/auth/authService";
import { Link } from "react-router-dom";
import { truncateString } from "./../../../util/text";
import ReportModalTask from "../reports/ReportModalTask";

const ModalTask = ({ show, onHide, id }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const { data: UserTasks, refetch } = useGetTaskDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const ModalTaskCollection = UserTasks || [];

  const { data: specificTask } = useGetSpecificTaskQuery(id);

  const specified = specificTask || [];

  useEffect(() => {
    refetch();
  }, [specified?.attachments]);

  return (
    <Modal
      className={modal.modal}
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {ModalTaskCollection.map((collect, index) =>
        id === collect._id ? (
          <div key={index}>
            {console.log(collect)}
            <Modal.Header closeButton>
              <Modal.Title
                className={modal.containedmodaltitlecenter}
                id="contained-modal-title-vcenter"
              >
                <div className={modal.flexheader}>
                  <StatusButton text={collect.status} />
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
                    <div className={modal.flexmodalcontainer}>
                      <div className={modal.firstphase}>
                        <p className={modal.nameproject}>{collect.name}</p>
                        {collect.priority === "red" ? (
                          <Image src="/icons/table/redflag.svg" />
                        ) : collect.priority === "gray" ? (
                          <Image src="/icons/table/normalflag.svg" />
                        ) : collect.priority === "yellow" ? (
                          <Image src="/icons/table/warningflag.svg" />
                        ) : null}
                      </div>

                      <div>
                        <div
                          className={modal.buttonname}
                          onClick={() => {
                            setModalShow(true);
                          }}
                        >
                          <p className={modal.buttontext}>
                            Upload Attachments <MdOutlineCloudUpload />
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className={modal.description}>
                      {collect.description || "No description available"}
                    </p>
                    <p className={modal.assigned}>Assigned to:</p>
                    <div className={modal.yellowbackground}>
                      <div className={modal.absolutecenter}>
                        {collect?.assigned_to?.firstname &&
                        collect?.assigned_to.lastname ? (
                          <>
                            <p className={modal.avatar}>
                              <span className={modal.label}>
                                {collect?.assigned_to?.firstname?.charAt(0)}
                              </span>
                              <span className={modal.label}>
                                {collect?.assigned_to?.lastname?.charAt(0)}
                              </span>
                            </p>
                            <span className={modal.label1}>
                              {collect?.assigned_to?.firstname} {""}
                              {collect?.assigned_to?.lastname}
                            </span>
                          </>
                        ) : (
                          <div className={modal.absolutecenter}>
                            <p className={modal.unassigned}>Unassigned</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className={modal.instructionheading}>Instruction</p>
                    <p className={modal.instruction}>
                      {collect.instruction || "No instructions available"}
                    </p>

                    <p className={modal.taskname}>Attachment</p>
                    <div className={modal.attachmentflex}>
                      {collect.attachments.length < 1 ? (
                        <p className={modal.attachmentempty}>No attachments</p>
                      ) : (
                        <>
                          {collect.attachments
                            .slice(0, 3)
                            .map((attachment, index) => {
                              return (
                                <>
                                  {Array.isArray(attachment) ? (
                                    <>
                                      {attachment.map((attach, index) => {
                                        return (
                                          <Attachment
                                            key={index}
                                            name={attach.name}
                                            imagelink={attach.type}
                                            size={attach.size}
                                          />
                                        );
                                      })}
                                    </>
                                  ) : (
                                    <Attachment
                                      key={index}
                                      name={attachment.name}
                                      imagelink={attachment.type}
                                      size={attachment.size}
                                    />
                                  )}
                                </>
                              );
                            })}
                        </>
                      )}
                    </div>
                    {collect.attachments.length > 2 ? (
                      <Link to="/reports">
                        <div className={modal.absolutebuttoncenter}>
                          <div className={modal.buttonname}>
                            <p className={modal.buttontext}>
                              See All Attachments
                            </p>
                          </div>
                        </div>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
        ) : null
      )}
      <ReportModalTask
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={id}
      />
    </Modal>
  );
};

export default ModalTask;

const StatusButton = (props) => {
  return (
    <div
      className={
        props.text === "In Progress"
          ? modal.statusbutton
          : props.text === "Declined"
          ? modal.declinedbutton
          : props.text == "Approved"
          ? modal.approvedbutton
          : props.text == "Awaiting Approval"
          ? modal.pendingbutton
          : null
      }
    >
      <p className={modal.statusbuttontext}>{props.text}</p>
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
          className={modal.calendaricon1}
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
      {/* <div className={modal.absolutecenter}> */}
      {props.imagelink.startsWith("image") ? (
        <Image src="/icons/jpg.svg" alt="jpg" />
      ) : props.imagelink.startsWith("application") ? (
        <Image src="/icons/pdf.svg" alt="jpg" />
      ) : props.imagelink.startsWith("video") ? (
        <Image src="/icons/reports/pdf.svg" alt="jpg" />
      ) : null}
      {/* </div> */}
      <div>
        <p className={modal.attachmenttext}>{truncateString(props.name, 7)}</p>
        <p className={modal.attachmentsize}>
          {Math.round(props.size / 1000) + "kb"}
        </p>
      </div>
    </div>
  );
};

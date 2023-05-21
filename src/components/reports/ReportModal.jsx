import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Modal, Image, Button, FormGroup } from "react-bootstrap";
import modal from "./general.module.css";
import "./Reportmodal.css";
// import "./modal.css";
import toast, { Toaster } from "react-hot-toast";
import Form from "react-bootstrap/Form";
import {
  useAddReportDetailsMutation,
  useGetTaskDetailsQuery,
  useGetProjectDetailsQuery,
  useGetSpecificProjectQuery,
} from "../../app/services/auth/authService";
import Skeleton from "react-loading-skeleton";

const ReportModal = ({ show, onHide }) => {
  const [more, setMore] = useState(false);
  const [display, setDisplay] = useState(false);
  const [select, setSelect] = useState("");
  const [addReportsMutation] = useAddReportDetailsMutation();
  const { data: TaskCollection } = useGetTaskDetailsQuery({
    refetchOnMountArgChange: true,
  });
  const TaskCollections = TaskCollection || [];

  // const { data: Users } = useGetAllUsersDetailsQuery({
  //   refetchOnMountArgChange: true,
  // });

  // const UserCollection = Users || [];

  const { data: Projects } = useGetProjectDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const { data: specificproject, isLoading } =
    useGetSpecificProjectQuery(select);

  console.log(specificproject);

  const ProjectCollections = Projects || [];

  const { register, reset, handleSubmit } = useForm();

  const filteredAsignedtoProjects = ProjectCollections.filter(
    (item) => item.assigned_to != undefined
  );

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const handleChanges = (e) => {
    setSelect(e.target.value);
    setDisplay(true);
  };

  // const filteredProjects = useMemo(() => {
  //   const filtereddata = ProjectCollections.filter(
  //     (item) => item?.project?.id === select
  //   );
  //   return filtereddata;
  // }, [select, ProjectCollections]);

  // console.log(filteredProjects);

  const filteredtasks = useMemo(() => {
    const filtereddata = TaskCollections.filter(
      (item) => item.project.id === select
    );
    return filtereddata;
  }, [select, TaskCollections]);

  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    setFiles([...files, e.target.files[0]]);
  };

  const removeImage = (index) => {
    const newArray = [...files];
    newArray.splice(index, 1);
    setFiles(newArray);
  };

  const submitForm = async (data) => {
    if (!files.length) return toast.error("Select a file");
    const conversion = { ...data };
    const stringid = conversion.send_to.toString();
    const formData = new FormData();
    // files.map((file) => {
    //   return formData.append("attachments", file);
    // });
    for (let i = 0; i < files.length; i++) {
      formData.append(`attachments`, files[i]);
    }
    formData.append("project", conversion.project);
    formData.append("task", conversion.task);
    formData.append("send_to", stringid);
    formData.append("note", conversion.note);

    try {
      await toast.promise(addReportsMutation(formData).unwrap(), {
        loading: "Saving Form",
        success: "File Uploaded Successfully",
        error: "Failed to create form",
      });
      reset();
      setfile(null);
      // toast.success("Project Registered Successfully");
    } catch (error) {
      toast.error(error.status);
    }
    onHide();
  };

  return (
    <Modal
      className={modal.modal}
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className={modal.modalbody}>
        <Form onSubmit={handleSubmit(submitForm)}>
          <div className={modal.attachmentflex}>
            {files.map((file, index) => {
              return (
                <Attachment
                  key={index}
                  attachmentname={file.name}
                  imagelink={file.type}
                  onClick={removeImage}
                  attachmentsize={file.size}
                />
              );
            })}
          </div>
          <div className={modal.fileabsolutecenter}>
            <div className={modal.customfileinput}>
              <p className={modal.fileinputbutton}>Add New File</p>
              <Image src="/icons/addreport.svg" alt="add" />
            </div>
            <input
              type="file"
              className={modal.fileinputhide}
              // className={modal.customfileinput}
              // {...register("attachments")}
              onChange={handleFileChange}
            ></input>
          </div>
          <p className={modal.title}>Projects</p>
          {more ? (
            <>
              {filteredAsignedtoProjects.map((project, index) => (
                // <FormGroup>
                <Form.Check
                  key={index}
                  required
                  type="radio"
                  onClick={handleChanges}
                  // key={index}
                  {...register("project")}
                  // name="project"
                  value={project._id}
                  label={project.name}
                />
                // </FormGroup>
              ))}
            </>
          ) : (
            // <div>
            <>
              {filteredAsignedtoProjects?.slice(0, 3)?.map((project, index) => (
                // <FormGroup>
                <Form.Check
                  type="radio"
                  // onClick={(e)=> setSelect(e.target.value)}
                  key={index}
                  required
                  onClick={handleChanges}
                  {...register("project")}
                  // name="project"
                  value={project._id}
                  label={project.name}
                />
                // </FormGroup>
              ))}
            </>
            // </div>
          )}
          {filteredAsignedtoProjects.length > 3 ? (
            more ? (
              <p className={modal.title1} onClick={() => setMore(!more)}>
                See Less
              </p>
            ) : (
              <p className={modal.title1} onClick={() => setMore(!more)}>
                See More
              </p>
            )
          ) : null}
          {display ? (
            <>
              <p className={modal.title}>Tasks</p>
              {filteredtasks.length < 1 ? (
                <p className={modal.notask}> There are no selected tasks</p>
              ) : (
                <>
                  {filteredtasks.map((task, index) => (
                    <Form.Check
                      type="radio"
                      key={index}
                      name="task"
                      required
                      {...register("task")}
                      value={task._id}
                      label={task.name}
                    />
                  ))}
                </>
              )}
            </>
          ) : null}
          {display ? (
            <>
              <div className={modal.flexcontainer}>
                <p className={modal.title}>Send to:</p>
                <div className={modal.fileabsolutecenter}>
                  <div className={modal.searchiconcontainer}>
                    <input
                      type="text"
                      placeholder="Search Clients"
                      className={modal.search}
                    ></input>
                    <Image
                      src="/icons/search.svg"
                      className={modal.searchicon}
                    />
                  </div>
                </div>
              </div>
              <>
                {isLoading ? (
                  <Skeleton
                    baseColor="#ebab34"
                    highlightColor="#f2cb07"
                    width={100}
                  />
                ) : (
                  <>
                    {specificproject?.participants?.map(
                      (usercollect, index) => {
                        return (
                          <Form.Check
                            type="checkbox"
                            // required
                            key={index}
                            {...register("send_to")}
                            value={usercollect.id}
                            label={usercollect?.firstname}
                          />
                        );
                      }
                    )}
                  </>
                )}
              </>
            </>
          ) : null}
          <p className={modal.title}>Note</p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              className={modal.textarea}
              {...register("note")}
              rows={3}
              placeholder="Type here"
            />
          </Form.Group>
          <div className={modal.absoluterightendcontainer}>
            <div className={modal.flexbuttoncontainer}>
              <Button type="submit" className={modal.sharebutton}>
                Submit Form
              </Button>
            </div>
          </div>
          <Toaster
            position="top-left"
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
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReportModal;

const Attachment = (props) => {
  return (
    <div className={modal.attachmentcontainer}>
      <div className={modal.centericon}>
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
          {props.attachmentname?.substring(0, 7)}
        </p>
        <p className={modal.attachmentsize}>
          {Math.round(props.attachmentsize / 1000) + "kb"}
        </p>
      </div>
      <div className={modal.reportabsolutecenter}>
        <Image
          src="/icons/reportclose.svg"
          onClick={props.onClick}
          style={{ cursor: "pointer" }}
          alt="close"
        />
      </div>
    </div>
  );
};

export const createPreviewURL = (file) => {
  return URL.createObjectURL(file);
};

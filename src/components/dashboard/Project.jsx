import React, { useMemo, useState } from "react";
import project from "./User.module.css";
import { Image } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./Modal.css";
import {
  useGetProjectDetailsQuery,
  useAddStarProjectMutation,
} from "@/app/services/auth/authService";
import SkeletonLoader from "./SkeletonLoader";
import ModalProject from "./../project/ModalProject";
import { toast, Toaster } from "react-hot-toast";

const Project = () => {
  const { data: UserProjects, isLoading, refetch } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const UserProjectsCollection = UserProjects || [];

  const [filter, setFilter] = useState(null);

  const [modalShow, setModalShow] = React.useState(false);
  const [setting, setSetting] = useState("");
  const [message, setMessage] = useState("There are no projects");

  const sortedArray = [
    ...UserProjectsCollection.filter((item) => item.star === true),
    ...UserProjectsCollection.filter((item) => item.star === false),
  ];

  const [addStarMutation] = useAddStarProjectMutation();

  const data = useMemo(() => {
    if (!filter) return UserProjectsCollection;
    const filteredData = UserProjectsCollection.filter(
      (item) => item.user_status === filter
    );
    return filteredData;
  }, [filter, UserProjectsCollection]);

  return (
    <div className={project.projectcontainer1}>
      <div className={project.projectflexcontainer}>
        <div className={project.absolutecenter}>
          <p className={project.projectheader}>project</p>
        </div>
        <div className={project.projectflexbuttonscontainer}>
          <Buttons
            name="All Categories"
            filter={filter}
            filter1={null}
            onClick={() => {
              setFilter(null);
              setMessage("There are no projects");
            }}
          />
          <Buttons
            name="Active"
            filter={filter}
            filter1="In Progress"
            imagelink="/icons/dashboard/project/tick.svg"
            imagelinkinactive="/icons/dashboard/project/tickinactive.svg"
            onClick={() => {
              setFilter("In Progress");
              setMessage("There are no active projects");
            }}
          />
          <Buttons
            name="Inactive"
            imagelink="/icons/dashboard/project/cancel.svg"
            imagelinkinactive="/icons/dashboard/project/cancelinactive.svg"
            filter={filter}
            filter1={"Awaiting Approval" || "Completed"}
            onClick={() => {
              setFilter("Awaiting Approval" || "Completed");
              setMessage("There are no inactive projects");
            }}
          />
        </div>
      </div>
      <div className={project.tablecontainer}>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div style={{ marginBottom: "3rem" }}>
            {data.length >= 1 ? (
              <Table className={project.tablestriped}>
                <thead className={project.tableheader}>
                  <tr>
                    <th>PROJECT NAME</th>
                    <th className={project.centericon}>ASSIGNED TO</th>
                    <th className={project.centericon}>DUE DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedArray.slice(0, 5).map((projectdata, index) => (
                    <tr key={index} className={project.pointer}>
                      <td className={project.align}>
                        <div className={project.flexcontent}>
                          {projectdata.star ? (
                            <div
                              onClick={async (id) => {
                                try {
                                  await toast.promise(
                                    addStarMutation(projectdata._id).unwrap(),
                                    {
                                      loading: "Saving",
                                      success: "Starred",
                                      error: "Failed to star",
                                    }
                                  );
                                  // toast.success("Project Registered Successfully");
                                  refetch();
                                } catch (error) {
                                  console.log(error);
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
                                    addStarMutation(projectdata._id).unwrap(),
                                    {
                                      loading: "Saving",
                                      success: "Starred",
                                      error: "Failed to star",
                                    }
                                  );
                                  // toast.success("Project Registered Successfully");
                                  refetch();
                                } catch (error) {
                                  console.log(error);
                                }
                              }}
                            >
                              <Icon imagelink="/icons/dashboard/task/star.svg" />
                            </div>
                          )}
                          <div
                            onClick={() => {
                              setSetting(projectdata._id);
                              setModalShow(true);
                            }}
                            className={project.centertext}
                          >
                            <p className={project.tasktitle}>
                              {projectdata.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className={project.centericon}>
                        <div className={project.absolutecenter}>
                          {projectdata?.assigned_to?.firstname?.charAt(0) &&
                          projectdata?.assigned_to?.lastname?.charAt(0) ? (
                            <p className={project.avatar}>
                              {projectdata?.assigned_to?.firstname?.charAt(0)}
                              <span className={project.label}>
                                {projectdata?.assigned_to?.lastname?.charAt(0)}
                              </span>
                            </p>
                          ) : (
                            <p style={{ marginBottom: "0px" }}>Unassigned</p>
                          )}
                        </div>
                      </td>
                      <td className={project.centericon}>
                        {new Date(projectdata.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div style={{ marginBottom: "3rem" }}>
                <p className={project.nothing1}>{message}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <ModalProject
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
    </div>
  );
};

export default Project;

const Buttons = (props) => {
  const active = props.filter === props.filter1;
  return (
    <div
      className={active ? project.projectbuttonactive : project.projectbutton}
      onClick={props.onClick}
    >
      {/* <Image src = {`${props.imagelink || undefined }`} className = {project.projectbuttonicon}/> */}
      {props.imagelink || props.imagelinkinactive ? (
        <>
          {active ? (
            <div className={project.absolutecenter}>
              <Image
                src={`${props.imagelink}`}
                className={project.projectbuttonicon}
              />
            </div>
          ) : (
            <div className={project.absolutecenter}>
              <Image
                src={`${props.imagelinkinactive}`}
                className={project.projectbuttonicon}
              />
            </div>
          )}
        </>
      ) : null}
      <p
        className={
          active ? project.textbuttonactive : project.projecttextbutton
        }
      >
        {props.name}
      </p>
      <span className={project.disappear}>{props.filter}</span>
      <span className={project.disappear}>{props.filter1}</span>
    </div>
  );
};

const Icon = (props) => {
  return <Image src={`${props.imagelink}`} alt="icon" />;
};

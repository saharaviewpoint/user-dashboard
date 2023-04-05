import React, { useMemo, useState } from "react";
import { Button, Container, Image, Row, Col } from "react-bootstrap";
import project from "./project.module.css";
import "./projects.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Header from "../../components/project/Header";
import TableHeaderNav from "../../components/project/TableHeaderNav";
import TableDisplay from "../../components/project/TableDisplay";
import ModalProject from "../../components/project/ModalProject";
import { useGetProjectDetailsQuery } from "@/app/services/auth/authService";
import { ButtonProject } from "../../components/dashboard/DashboardContents";

const ProjectDashboard = () => {
  const [filter, setFilter] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [setting, setSetting] = useState("");
  const { data: UserProjects } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  // const data = useMemo(() => {
  //   if (!filter) return ProjectsCollection;
  //   const filteredData = ProjectsCollection.filter(
  //     (item) => item.activestatus === filter
  //   );
  //   return filteredData;
  // }, [filter]);

  const ProjectsCollection = UserProjects || [];

  console.log(setting);
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
                total="(23)"
                // filter={filter}
                // filter1={null}
                // onClick={() => setFilter(null)}
              />

              <NavCategories
                name="Upcoming"
                total="(02)"
                filter={filter}
                filter1="Upcoming"
                // onClick={() => setFilter("Upcoming")}
              />
              <NavCategories
                name="In Progress"
                total="(10)"
                filter1="In Progress"
                // filter={filter}
                // onClick={() => setFilter("In Progress")}
              />
              <NavCategories
                name="Completed"
                total="(11)"
                // filter={filter}
                filter1="Complete"
                // onClick={() => setFilter("Complete")}
              />
            </div>
            <TableHeaderNav />
          </div>
          <TableDisplay>
            {ProjectsCollection.map((projectcollect, index) => (
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
                  <div className={project.absolutecenter}>
                    <p className={project.avatar}>
                      {" "}
                      {projectcollect.requested_by.firstname.charAt(0)}
                      <span>
                        {projectcollect.requested_by.lastname.charAt(0)}
                      </span>
                    </p>
                  </div>
                </td>
                <td>
                  <StatusButton text={projectcollect.status} />
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
    <div
      className={
        props.text === "inprogress"
          ? project.statusbutton
          : props.text === "Complete"
          ? project.completebutton
          : props.text == "Upcoming"
          ? project.upcoming
          : null
      }
    >
      <p className={project.statusbuttontext}>{props.text}</p>
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

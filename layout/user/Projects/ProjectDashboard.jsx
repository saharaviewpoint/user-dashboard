import React, { useMemo, useState } from "react";
import { Button, Container, Image } from "react-bootstrap";
import project from "./project.module.css";
import DashboardLayout from "../../../components/User/Dashboard/DashboardLayout";
import Header from "../../../components/User/Project/Header";
import { ProjectsCollection } from "../../../data/projects";
import TableHeaderNav from "../../../components/User/Project/TableHeaderNav";
import TableDisplay from "../../../components/User/Project/TableDisplay";
import ModalProject from "../../../components/User/Project/ModalProject";
import { ButtonProject } from "../../../components/User/Dashboard/DashboardContents";

const ProjectDashboard = () => {
  const [filter, setFilter] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [setting, setSetting] = useState("");
  // const handleclick = () => setModalShow(true);

  const data = useMemo(() => {
    if (!filter) return ProjectsCollection;
    const filteredData = ProjectsCollection.filter(
      (item) => item.activestatus === filter
    );
    return filteredData;
  }, [filter]);

  // console.log(data);

  console.log(filter);
  return (
    <Container className={project.container}>
      <DashboardLayout name="Projects">
        <div className={project.overallcontainer}>
          <ButtonProject />
          <Header name="My Projects" />
          <div className={project.leftcontainer}>
            <NavCategories
              name="All Projects"
              total="(23)"
              onClick={() => setFilter(null)}
            />

            <NavCategories
              name="Upcoming"
              total="(02)"
              onClick={() => setFilter("Upcoming")}
            />
            <NavCategories
              name="In Progress"
              total="(10)"
              onClick={() => setFilter("InProgress")}
            />
            <NavCategories
              name="Completed"
              total="(11)"
              onClick={() => setFilter("Complete")}
            />
            <TableHeaderNav />
          </div>
          <TableDisplay>
            {data.map((projectcollect, index) => (
              <tr
                onClick={() => {
                  setSetting(projectcollect.id);
                  setModalShow(true);
                }}
                key={index}
                className={project.tablerow}
              >
                <td>{projectcollect.name}</td>
                <td>
                  <div className={project.absolutecenter}>
                    <p className={project.avatar}>{projectcollect.initials}</p>
                  </div>
                </td>
                <td>
                  <StatusButton text={projectcollect.status} />
                </td>
                <td className={project.centericon}>{projectcollect.date}</td>
                <td className={project.centericon}>
                  {projectcollect.priority === "important" ? (
                    <ImageIcon imagelink="/icons/table/redflag.svg" />
                  ) : projectcollect.priority === "normal" ? (
                    <ImageIcon imagelink="/icons/table/normalflag.svg" />
                  ) : projectcollect.priority === "warning" ? (
                    <ImageIcon imagelink="/icons/table/warningflag.svg" />
                  ) : null}
                </td>
              </tr>
            ))}
          </TableDisplay>
        </div>
      </DashboardLayout>
      x
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
        props.text === "InProgress"
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
  return (
    <Button className={project.tablenavcontainer} onClick={props.onClick}>
      {/* <p className={project.tablenavtext}> */}
      {props.name}
      <span>{props.total}</span>
      {/* </p> */}
    </Button>
  );
};
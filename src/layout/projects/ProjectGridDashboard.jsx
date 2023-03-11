import React, { useState, useMemo } from "react";
import { Container, Image, Button } from "react-bootstrap";
import project from "./project.module.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Header from "../../components/project/Header";
import TableHeaderNav from "../../components/project/TableHeaderNav";
// import TableDisplay from "../../../components/User/Project/TableDisplay";
import ProjectGridContainer from "../../components/project/ProjectGridContainer";
import { ButtonProject } from "../../components/dashboard/DashboardContents";
import { ProjectsCollection } from "../../../data/projects";

const ProjectGridDashboard = () => {
  const [filter, setFilter] = useState(null);

  const data = useMemo(() => {
    if (!filter) return ProjectsCollection;
    const filteredData = ProjectsCollection.filter(
      (item) => item.activestatus === filter
    );
    return filteredData;
  }, [filter]);
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

            <div className={project.absoluterightcontainer}>
              <TableHeaderNav />
            </div>
          </div>
          <div className={project.wrap}>
            {data.map((projectcollect, index) => (
              <ProjectGridContainer
                key={index}
                text={projectcollect.name}
                date={projectcollect.date}
                status={projectcollect.status}
              >
                {projectcollect.priority === "important" ? (
                  <ImageIcon imagelink="/icons/table/redflag.svg" />
                ) : projectcollect.priority === "normal" ? (
                  <ImageIcon imagelink="/icons/table/normalflag.svg" />
                ) : projectcollect.priority === "warning" ? (
                  <ImageIcon imagelink="/icons/table/warningflag.svg" />
                ) : null}
              </ProjectGridContainer>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default ProjectGridDashboard;

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

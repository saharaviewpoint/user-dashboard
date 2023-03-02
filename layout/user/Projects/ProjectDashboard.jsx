import React from 'react'
import { Container } from 'react-bootstrap';
import project from './project.module.css'
Header
import DashboardLayout from '../../../components/User/Dashboard/DashboardLayout';
import Header from '../../../components/User/Project/Header';


const ProjectDashboard = () => {
  return (
   <Container className = {project.container}>
   <DashboardLayout name = "Projects">
   {/* <div className= {project.overallcontainer}> */}
    <Header name = "My Projects"/>
   {/* </div> */}
   </DashboardLayout>
   </Container>
  )
}

export default ProjectDashboard
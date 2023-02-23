import React from 'react'
import Sidebar from '../Components/Sidebar';
import './dashboard.css'
import { Container, Row, Col } from 'react-bootstrap';



const Dashboard = () => {
  return (
    <Container>
      <Row>
        <Col lg = {2}>
        <Sidebar/>
        </Col>
        <Col lg = {10}>
          <p>Batwoman</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
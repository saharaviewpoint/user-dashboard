import React from "react";
import { Modal, Image, Button } from "react-bootstrap";
import modal from "./general.module.css";
import "./modal.css";
import Form from "react-bootstrap/Form";

const ImageAttachment = [
  {
    src: "/icons/pdf.svg",
    attachmentname: "Site Clearing.pdf",
    attachmentsize: "2 MB",
  },
  {
    src: "/icons/jpg.svg",
    attachmentname: "Site Clearing.jpg",
    attachmentsize: "2 MB",
  },
];

const ReportModal = (props) => {
  return (
    <Modal
      className={modal.modal}
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className={modal.modalbody}>
        <div className={modal.attachmentflex}>
          {ImageAttachment.map((attachment, index) => (
            <Attachment
              key={index}
              imagelink={attachment.src}
              attachmentname={attachment.attachmentname}
              attachmentsize={attachment.attachmentsize}
            />
          ))}
        </div>
        <div className={modal.absolutecenter2}>
          <Button className={modal.addfile}>Add New File</Button>
        </div>
        <p className={modal.title}>Tasks</p>
        <Form>
          <Form.Check
            defaultChecked
            type="radio"
            id="custom-switch"
            label="Site Clearing"
          />
          <Form.Check
            type="radio"
            label="Site hoarding"
            id="disabled-custom-switch"
          />
          <Form.Check
            type="radio"
            label="Plant procurement"
            id="disabled-custom-switch"
          />
          <Form.Check
            type="radio"
            label="Sand procurement"
            id="disabled-custom-switch"
          />
          <Form.Check
            type="radio"
            label="Cement procurement"
            id="disabled-custom-switch"
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
      <div className={modal.absolutecenter1}>
        <Image
          src={`${props.imagelink}`}
          alt="image-link"
          className={modal.attachmentimage}
        />
      </div>
      <div>
        <p className={modal.attachmenttext}>{props.attachmentname}</p>
        <p className={modal.attachmentsize}>{props.attachmentsize}</p>
      </div>
    </div>
  );
};

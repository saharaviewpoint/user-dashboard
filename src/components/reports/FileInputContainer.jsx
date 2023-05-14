import React from "react";
import input from "./general.module.css";
import { Button } from "react-bootstrap";
import { MdOutlineCloudUpload } from "react-icons/md";
import ReportModal from "./ReportModal";

const FileInputContainer = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className={input.absolutecenter}>
      <div className={input.innercontainer}>
        <div className={input.innercontainer1}>
          <Button
            className={input.button}
            onClick={() => {
              setModalShow(true);
            }}
          >
            Upload
            <MdOutlineCloudUpload className={input.icon} />
          </Button>
        </div>
      </div>
      <ReportModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default FileInputContainer;

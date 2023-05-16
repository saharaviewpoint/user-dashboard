import React from "react";
import input from "./general.module.css";
import { Button } from "react-bootstrap";
import { MdOutlineCloudUpload } from "react-icons/md";
import ReportModal from "./ReportModal";
import { useGetProjectDetailsQuery } from "@/app/services/auth/authService";
import { toast, Toaster } from "react-hot-toast";

const FileInputContainer = () => {
  const { data: UserTableProjects, isLoading } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });
  const ProjectsCollection = UserTableProjects || [];
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className={input.absolutecenter}>
      <div className={input.innercontainer}>
        <div className={input.innercontainer1}>
          <Button
            className={input.button}
            onClick={() => {
              ProjectsCollection.length < 1
                ? toast.error("No Project has been added")
                : setModalShow(true);
            }}
          >
            Upload
            <MdOutlineCloudUpload className={input.icon} />
          </Button>
        </div>
      </div>
      <ReportModal show={modalShow} onHide={() => setModalShow(false)} />
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
        }}
      />
    </div>
  );
};

export default FileInputContainer;

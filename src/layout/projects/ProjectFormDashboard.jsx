import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import projectform from "./project.module.css";
import Form from "react-bootstrap/Form";
import { Container, Button } from "react-bootstrap";
import "./projects.css";
import { Link, useNavigate } from "react-router-dom";
import {
  useAddProjectDetailsMutation,
  useGetDetailsQuery,
} from "@/app/services/auth/authService";
import toast, { Toaster } from "react-hot-toast";

const ProjectFormDashboard = () => {
  const [type, setType] = useState("");
  const [addProjectDetailsMutation] = useAddProjectDetailsMutation();
  const navigate = useNavigate();
  const { data: user } = useGetDetailsQuery();
  // toast.configure();

  console.log(user);

  const { register, control, reset, handleSubmit } = useForm();

  const submitForm = async (data) => {
    const useradditionaldetails = {
      requested_by: {
        firstname: data.firstname,
        lastname: data.lastname,
        id: user._id,
      },
    };
    console.log(useradditionaldetails);
    const completeform = {
      ...useradditionaldetails,
      ...data,
    };

    delete completeform.firstname;
    delete completeform.lastname;

    console.log(completeform);
    try {
      await toast.promise(addProjectDetailsMutation(completeform).unwrap(), {
        loading: "Saving Form",
        success: "Project Form Created Successfully",
        error: "Failed to create form",
      });
      reset();
      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
    }
  };

  function MyBooleanInput({ control, name }) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <>
            <div className="radio-item">
              <label className={projectform.label}>
                <input
                  type="radio"
                  onBlur={onBlur} // notify when input is touched
                  onChange={() => onChange(true)} // send value to hook form
                  checked={value === true}
                  inputRef={ref}
                />
                <span className={projectform.label1}>Yes</span>
              </label>
            </div>
            <div className="radio-item">
              <label className={projectform.label}>
                <input
                  type="radio"
                  onBlur={onBlur} // notify when input is touched
                  onChange={() => onChange(false)} // send value to hook form
                  checked={value === false}
                  inputRef={ref}
                />
                <span className={projectform.label1}>No</span>
              </label>
            </div>
          </>
        )}
      />
    );
  }
  return (
    <Container className={projectform.container}>
      <DashboardLayout name="Projects">
        <div className={projectform.overallcontainer}>
          <p className={projectform.header}>Project Request Form</p>
          <div className={projectform.secondheader}>
            <p className={projectform.header1}>PROJECT INFORMATION</p>
          </div>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className={projectform.formcontainer}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <div className={projectform.formcontainer1}>
                  <Form.Label className={projectform.form1}>
                    Requested By
                  </Form.Label>
                  <div className={projectform.side}>
                    <Form.Control
                      className={projectform.form1}
                      {...register("firstname")}
                      required
                      type="text"
                      placeholder="First Name"
                    />
                    <Form.Control
                      {...register("lastname")}
                      className={projectform.form1}
                      required
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </Form.Group>
            </div>
            <div className={projectform.formcontainer1}>
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label className={projectform.form1}>
                  Project Title (for referencing project):
                </Form.Label>
                <Form.Control
                  type="text"
                  {...register("name")}
                  placeholder="Type here..."
                  required
                />
              </Form.Group>
            </div>
            <div className={projectform.formcontainer}>
              <Form.Group className="mb-3" controlId="formBasicDue">
                <Form.Label className={projectform.form1}>
                  When do you need this?
                </Form.Label>
                <input
                  type="date"
                  id="due"
                  value={type}
                  name="due"
                  {...register("due")}
                  required
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
              </Form.Group>
            </div>
            <p className={projectform.header2}>PROJECT INFORMATION</p>
            <div className={projectform.formcontainer1}>
              <Form.Group className="mb-3" controlId="formBasicDetails">
                <Form.Label className={projectform.form1}>
                  Please provide detailed informaton about your project:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type here..."
                  required
                  {...register("details")}
                />
              </Form.Group>
            </div>
            <div className={projectform.formcontainer1}>
              <Form.Group className="mb-3" controlId="formBasicSize">
                <Form.Label className={projectform.form1}>
                  Size of Site:
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  {...register("size")}
                  placeholder="Type here..."
                />
              </Form.Group>
            </div>
            <div className={projectform.formcontainer1}>
              <Form.Group className="mb-3" controlId="formBasicBudget">
                <Form.Label className={projectform.form1}>Budget:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type here..."
                  required
                  {...register("budget")}
                />
              </Form.Group>
            </div>
            <div className={projectform.formcontainer1}>
              <Form.Group className="mb-3" controlId="formBasicLocation">
                <Form.Label className={projectform.form1}>
                  Building Location:
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  {...register("facilities")}
                  placeholder="Type here..."
                />
              </Form.Group>
            </div>
            <div className={projectform.formcontainer1}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={projectform.form1}>
                  Building Type:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type here..."
                  required
                  {...register("building_type")}
                />
              </Form.Group>
            </div>
            <Form.Label className={projectform.form2}>
              Do You Have A Design?
            </Form.Label>
            <div className={projectform.radiocontainer}>
              {/* <Form> */}
              <MyBooleanInput control={control} name={"design"} />
              {/* </Form> */}
            </div>
            <div className={projectform.formcontainer1}>
              <Form.Group className="mb-3" controlId="formBasicSite">
                <Form.Label className={projectform.form1}>
                  What is Site Condition?
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type here..."
                  {...register("site_condition")}
                  required
                />
              </Form.Group>
            </div>
            <div className={projectform.formcontainer1}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={projectform.form1}>
                  Facilities surrounding site and on site:
                </Form.Label>
                <Form.Control
                  type="text"
                  {...register("facilities")}
                  required
                  placeholder="Type here..."
                />
              </Form.Group>
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
            <div className={projectform.absoluterightendcontainer}>
              <div className={projectform.flexbuttoncontainer}>
                <Button
                  className={projectform.cancelbutton}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button type="submit" className={projectform.submitbutton}>
                  Submit Form
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default ProjectFormDashboard;

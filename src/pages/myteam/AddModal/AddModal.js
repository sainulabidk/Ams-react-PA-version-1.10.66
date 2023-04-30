import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import { GoPlus } from "react-icons/go";
import { useFormik } from "formik";
import { ValidSchema } from "../Validation/Validation";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddModal.css";

const AddModal = () => {
  // .............Modal Controls..................//

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // .............Modal Controls End..................//

  // ...........Validation...............//

  const initialValues = {
    firstname: "",
    lastname: "",
    mobile_no: "",
    email: "",
    password: "",
  };
  const handleReset = (formik) => {
    formik.resetForm();
  }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ValidSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values.firstname);
      try {
        create(values);
        resetForm();
        handleClose();
      } catch (error) {
        console.error(error);
      }
    },
    
  });
  // ...........Validation Ends..........//

  // ...............Adding User Here.......................//

  const create = async ({
    firstname,
    lastname,
    email,
    password,
    mobile_no,
  }) => {
    try {
      const user_lic = {
        f_name: firstname,
        l_name: lastname,
        email: email,
        password: password,
        mobile_no: mobile_no,
      };
      const response = await axios.post(
        `http://localhost:8000/myteam`,
        user_lic
      );
      if (response.status === 200) {
        toast.success("User Successfully Created !", {
          toastId: "success",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  // ...............Adding User Ends Here.......................//
  return (
    <>
      <Button
        className="mb-2 fw-600 d-flex align-items-center text-white"
        variant="success"
        onClick={handleShow}
      >
        <GoPlus /> ADD
      </Button>

      <Modal
        show={show}
        backdrop="static"
        centered
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#40536e", color: "white" }}
        >
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Container>
          <Row>
            <Col lg={12}>
              <Form  onSubmit={formik.handleSubmit} action="">
                <Modal.Body
                  style={{ height: "310px" }}
                  className="overflow-auto"
                >
                  <Form.Label className="ms-1 ">First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    defaultValue=""
                    name="firstname"
                    autoComplete="off"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.firstname && formik.touched.firstname ? (
                    <p
                      style={{
                        fontSize: "10px",
                        color: "red",
                        marginTop: "1px",
                        marginLeft: "2%",
                      }}
                      className="form-error"
                    >
                      {formik.errors.firstname}
                    </p>
                  ) : null}
                  <Form.Label className="ms-1 mt-1">Last Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    defaultValue=""
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                  />
                  <Form.Label className="ms-1 mt-1">Phone</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder=""
                    defaultValue=""
                    name="mobile_no"
                    autoComplete="off"
                    value={formik.values.mobile_no}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.mobile_no && formik.touched.mobile_no ? (
                    <p
                      style={{
                        fontSize: "10px",
                        color: "red",
                        marginTop: "1px",
                        marginLeft: "2%",
                      }}
                      className="form-error"
                    >
                      {formik.errors.mobile_no}
                    </p>
                  ) : null}
                  <Form.Label className="ms-1 mt-1">Email</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    defaultValue=""
                    name="email"
                    autoComplete="off"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p
                      style={{
                        fontSize: "10px",
                        color: "red",
                        marginTop: "1px",
                        marginLeft: "2%",
                      }}
                      className="form-error"
                    >
                      {formik.errors.email}
                    </p>
                  ) : null}
                  <Form.Label className="ms-1 mt-1">Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder=""
                    defaultValue=""
                    name="password"
                    autoComplete="off"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <p
                      style={{
                        fontSize: "10px",
                        color: "red",
                        marginTop: "1px",
                        marginLeft: "2%",
                      }}
                      className="form-error"
                    >
                      {formik.errors.password}
                    </p>
                  ) : null}
                </Modal.Body>
                <Modal.Footer className="positoin-fixed">
                  <Button
                  className="text-white"
                    type="reset"
                    variant="danger"
                    onClick={() => {
                      handleReset(formik)
                      handleClose();
                    }}
                  >
                    Close
                  </Button>
                  <Button
                  className="text-white"
                    onClick={() => {
                      formik.isValid ? create(formik.values) : alert(formik.errors);
                    }}
                    type="submit"
                    variant="success ms-2"
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal>
    </>
  );
};

export default AddModal;
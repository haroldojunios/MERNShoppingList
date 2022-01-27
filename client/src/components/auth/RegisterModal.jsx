import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
} from "reactstrap";
import { connect } from "react-redux";

function RegisterModal() {
  const [state, setState] = useState({
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  });
  const toggle = () => setState({ ...state, modal: !state.modal });
  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>

      <Modal isOpen={state.modal} toggle={toggle} autoFocus={false}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={e => {
              e.preventDefault();

              toggle();
            }}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                autoFocus={true}
                className="mb-3"
                onChange={onChange}
              />

              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                autoFocus={true}
                className="mb-3"
                onChange={onChange}
              />

              <Label for="password">Password</Label>
              <Input
                type="text"
                name="password"
                id="password"
                placeholder="Password"
                autoFocus={true}
                className="mb-3"
                onChange={onChange}
              />

              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default connect()(RegisterModal);

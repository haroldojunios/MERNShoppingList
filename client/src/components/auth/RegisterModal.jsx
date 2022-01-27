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
  Alert,
} from "reactstrap";
import { connect, useDispatch, useSelector } from "react-redux";

import { registerUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

function RegisterModal() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  });
  const toggle = () => {
    // Clear errors
    dispatch(clearErrors());
    // Toggle
    setState({ ...state, modal: !state.modal });
  };
  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

  const error = useSelector(state => state.error);
  React.useEffect(() => {
    if (error.id === "REGISTER_FAIL") {
      setState(state => ({ ...state, msg: error.msg.msg }));
    } else {
      setState(state => ({ ...state, msg: null }));
    }
  }, [error]);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  React.useEffect(() => {
    if (state.modal && isAuthenticated) {
      toggle();
    }
  });

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>

      <Modal isOpen={state.modal} toggle={toggle} autoFocus={false}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {state.msg && <Alert color="danger">{state.msg}</Alert>}
          <Form
            onSubmit={e => {
              e.preventDefault();

              // Create user object
              const { name, email, password } = state;
              const newUser = { name, email, password };

              // Attempt to register
              dispatch(registerUser(newUser));
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
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                autoFocus={true}
                className="mb-3"
                onChange={onChange}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
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

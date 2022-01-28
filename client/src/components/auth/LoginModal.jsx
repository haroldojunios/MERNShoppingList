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

import { loginUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

function LoginModal() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    modal: false,
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
    if (error.id === "LOGIN_FAIL") {
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
        Login
      </NavLink>

      <Modal isOpen={state.modal} toggle={toggle} autoFocus={false}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {state.msg && <Alert color="danger">{state.msg}</Alert>}
          <Form
            onSubmit={e => {
              e.preventDefault();

              // Create user object
              const { email, password } = state;
              const user = { email, password };

              // Attempt to login
              dispatch(loginUser(user));
            }}>
            <FormGroup>
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
                className="mb-3"
                onChange={onChange}
              />

              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default connect()(LoginModal);

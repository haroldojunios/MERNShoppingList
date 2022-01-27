import React from "react";
import { connect, useDispatch } from "react-redux";
import { NavLink } from "reactstrap";

import { logoutUser } from "../../actions/authActions";

function Logout() {
  const dispatch = useDispatch();

  return (
    <>
      <NavLink onClick={() => dispatch(logoutUser())} href="#">
        Logout
      </NavLink>
    </>
  );
}

export default connect()(Logout);

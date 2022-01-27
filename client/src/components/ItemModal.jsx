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
} from "reactstrap";
import { connect, useDispatch } from "react-redux";

import { addItem } from "../actions/itemActions";

function ItemModal() {
  const dispatch = useDispatch();

  const [state, setState] = useState({ modal: false, name: "" });
  const toggle = () => setState({ ...state, modal: !state.modal });

  return (
    <div>
      <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
        Add Item
      </Button>

      <Modal isOpen={state.modal} toggle={toggle} autoFocus={false}>
        <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={e => {
              e.preventDefault();

              const newItem = { name: state.name };
              dispatch(addItem(newItem));

              // Close modal
              toggle();
            }}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add Shopping Item"
                autoFocus={true}
                onChange={e =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default connect()(ItemModal);

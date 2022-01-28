import React from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, connect } from "react-redux";
import PropTypes from "prop-types";

import { getItems, addItem, deleteItem } from "../actions/itemActions";

function ShoppingList(props) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const { items } = props.item;

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => {
            return (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {props.isAuthenticated && (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={() => {
                        dispatch(deleteItem(_id));
                      }}>
                      &times;
                    </Button>
                  )}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, addItem, deleteItem })(
  ShoppingList
);

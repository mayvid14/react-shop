import React from 'react';
import { Card, Col, Button, ButtonGroup } from "react-bootstrap";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadProduct } from '../../redux/dispatchers/products';
import { userSelector } from '../../redux/selectors/user';

const ProductCard = props => {
  const { product, user } = props;

  const handleView = async id => {
    try {
      await props.loadProduct(id);
      props.history.push('/view');
    } catch (e) { }
  }

  const handleEdit = async id => {
    try {
      await props.loadProduct(id);
      props.history.push('/edit');
    } catch (e) { }
  }

  return (
    <Col xs={3}>
      <Card className="mb-2">
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Price: {product.price}, Quantity: {product.quantity}</Card.Subtitle>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">
          <ButtonGroup size="sm">
            <Button variant="outline-info" onClick={() => handleView(product.id)}>View Product</Button>
            {user ? <Button variant="outline-info" onClick={() => handleEdit(product.id)} className="float-right">Edit Product</Button> : <></>}
          </ButtonGroup>
        </Card.Footer>
      </Card>
    </Col>
  );
}

const mapStateToProps = state => ({
  user: userSelector(state)
});

const mapDispatchToProps = dispatch => ({
  loadProduct: loadProduct(dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductCard));
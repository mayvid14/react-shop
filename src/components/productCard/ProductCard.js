import React from 'react';
import { Card, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadProduct } from '../../redux/dispatchers/products';

const ProductCard = props => {
  const { product } = props;

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
        <Card.Footer>
          <Card.Link onClick={() => handleView(product.id)}>View Product</Card.Link>
          <Card.Link onClick={() => handleEdit(product.id)}>Edit Product</Card.Link>
        </Card.Footer>
      </Card>
    </Col>
  );
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  loadProduct: loadProduct(dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductCard));
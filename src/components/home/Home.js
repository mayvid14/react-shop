import React, { useEffect } from 'react';
import { Col, Row, CardDeck } from 'react-bootstrap';
import { connect } from 'react-redux';
import { productsSelector } from '../../redux/selectors/products';
import { loadProducts } from '../../redux/dispatchers/products';
import ProductCard from '../productCard/ProductCard';

const Home = props => {
  const { products, loadProducts } = props;
  useEffect(() => {
    if (products.length) return;
    loadProducts();
  }, []);
  return (
    <Col>
      <Row>
        <Col>
          <h1 className="display-4 text-center">React Shop</h1>
        </Col>
      </Row>
      <Row>
        <CardDeck>
          {products ? products.map(p => <ProductCard product={p} key={p.id} />) : <p>No products</p>}
        </CardDeck>
      </Row>
    </Col>
  );
}

const mapStateToProps = state => ({
  products: productsSelector(state),
});

const mapDispatchToProps = dispatch => ({
  loadProducts: loadProducts(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

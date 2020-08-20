import React, { useEffect, useState } from 'react';
import { Col, Row, CardDeck, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { productsSelector } from '../../redux/selectors/products';
import { loadProducts } from '../../redux/dispatchers/products';
import ProductCard from '../productCard/ProductCard';
import Filters from './Filters';

const Home = props => {
  const { products, loadProducts } = props;
  const [filters, setFilters] = useState({
    searchTerm: '',
    filterPrice: false,
    filterPriceLowerLimit: 0.01,
    filterPriceUpperLimit: 99.99,
    filterQuantity: false,
    filterQuantityLowerLimit: 1,
    filterQuantityUpperLimit: 99999,
    sortBy: 'id',
    sortDirection: 'asc'
  });

  useEffect(() => {
    if (products.length) return;
    loadProducts();
  }, []);

  const filter = () => {
    console.log(filters);
    let arr = [...products];

    arr = arr.filter(item => (item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) || item.description.toLowerCase().includes(filters.searchTerm.toLowerCase())));

    if (filters.filterPrice) {
      arr = arr.filter(item => ((item.price >= +filters.filterPriceLowerLimit) && (item.price <= +filters.filterPriceUpperLimit)));
    }

    if (filters.filterQuantity) {
      arr = arr.filter(item => ((item.quantity >= +filters.filterQuantityLowerLimit) && (item.quantity <= +filters.filterQuantityUpperLimit)));
    }

    const sortBy = filters.sortBy;
    const asc = filters.sortDirection === 'asc';
    arr.sort((a, b) => {
      let first = sortBy === 'name' ? a[sortBy].toLowerCase() : +a[sortBy];
      let second = sortBy === 'name' ? b[sortBy].toLowerCase() : +b[sortBy];
      if (first == second) return 0;
      return (first > second ? 1 : -1) * (asc ? 1 : -1);
    });

    return arr;
  }

  const filteredProducts = filter();

  return (
    <Col>
      <Row>
        <Col>
          <Filters handleFilter={setFilters} />
        </Col>
      </Row>
      <hr />
      <Row>
        <CardDeck>
          {filteredProducts ? filteredProducts.map(p => <ProductCard product={p} key={p.id} />) : <Card body>No products</Card>}
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

import React, { useEffect } from 'react';
import { Form, FormControl, InputGroup, Col, Button } from 'react-bootstrap';
import { useFormState } from 'react-use-form-state';

export default props => {
  const { handleFilter } = props;
  const [formState, inputs] = useFormState({
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
    handleFilter(formState.values);
  }, [formState.values]);

  const priceInputGroup = (<>
    <InputGroup.Prepend>
      <InputGroup.Checkbox aria-label="Filter by price" {...inputs.checkbox('filterPrice')} />
      <InputGroup.Text>{formState.values.filterPrice ? 'Price, Min ->' : 'Select to filter by Price'}</InputGroup.Text>
    </InputGroup.Prepend>
    {formState.values.filterPrice ? <>
      <FormControl
        placeholder="from"
        aria-label="Lower limit of price"
        aria-describedby="filterPriceLowerLimit"
        {...inputs.number('filterPriceLowerLimit')}
        min={0.01} max={99.99} step={0.01}
      />
      <FormControl
        placeholder="to"
        aria-label="Upper limit of price"
        aria-describedby="filterPriceUpperLimit"
        {...inputs.number('filterPriceUpperLimit')}
        min={0.01} max={99.99} step={0.01}
      />
      <InputGroup.Append>
        <InputGroup.Text>&lt;- Max</InputGroup.Text>
      </InputGroup.Append>
    </> : <></>}
  </>);

  const quantityInputGroup = (
    <>
      <InputGroup.Prepend>
        <InputGroup.Checkbox aria-label="Filter by quantity" {...inputs.checkbox('filterQuantity')} />
        <InputGroup.Text>{formState.values.filterQuantity ? 'Quantity, Min ->' : 'Select to filter by Quantity'}</InputGroup.Text>
      </InputGroup.Prepend>
      {formState.values.filterQuantity ? <>
        <FormControl
          placeholder="from"
          aria-label="Lower limit of quantity"
          aria-describedby="filterQuantityLowerLimit"
          {...inputs.number('filterQuantityLowerLimit')}
          min={1} max={99999} step={1}
        />
        <FormControl
          placeholder="to"
          aria-label="Upper limit of quantity"
          aria-describedby="filterQuantityUpperLimit"
          {...inputs.number('filterQuantityUpperLimit')}
          min={1} max={99999} step={1}
        />
        <InputGroup.Append>
          <InputGroup.Text>&lt;- Max</InputGroup.Text>
        </InputGroup.Append>
      </> : <></>}
    </>
  );

  return (
    <Form>
      <Form.Row className="mb-3">
        <Col sm={{ span: 4, offset: 2 }}>
          <InputGroup>
            <FormControl
              placeholder="Search by name or description"
              aria-label="Search by name or description"
              aria-describedby="searchTerm"
              {...inputs.text('searchTerm')}
            />
          </InputGroup>
        </Col>

        <Col sm={4}>
          <InputGroup>
            {priceInputGroup}
          </InputGroup>
        </Col>
      </Form.Row>

      <Form.Row className="mb-1">
        <Col sm={{ span: 4, offset: 2 }}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Sort by</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="select" aria-label="Sort by" {...inputs.select('sortBy')}>
              <option value="id">Default</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="quantity">Quantity</option>
            </Form.Control>
            <Form.Control as="select" aria-label="Sort direction" {...inputs.select('sortDirection')}>
              <option value="asc">low to high</option>
              <option value="desc">high to low</option>
            </Form.Control>
          </InputGroup>
        </Col>

        <Col sm={4}>
          <InputGroup>
            {quantityInputGroup}
          </InputGroup>
        </Col>
        <Button variant="outline-danger" size="sm" onClick={() => formState.reset()} disabled={formState.isPristine()}>Reset Filters</Button>
      </Form.Row>
    </Form>
  );
}
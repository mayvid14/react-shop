import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Card, Form, Button } from 'react-bootstrap';
import { useFormState } from 'react-use-form-state';
import { productSelector } from '../../redux/selectors/products';
import { ConfirmationModal } from './ConfirmationModal';
import { deleteProduct, addProduct, updateProduct } from '../../redux/dispatchers/products';
import { userSelector } from '../../redux/selectors/user';

const Product = props => {
  const [confirm, showConfirm] = useState(false);
  const [modalConfig, setModalConfig] = useState({});
  const { mode, user, product, deleteProduct, addProduct, updateProduct } = props;
  const [productObject, inputs] = useFormState(mode.hasData ? { ...product } : {
    name: '',
    price: 0.01,
    quantity: 1,
    description: ''
  });
  const buttons = [];

  useEffect(() => {
    resetMode();
  }, [mode]);

  useEffect(() => {
    if ((mode.isEditable) && (!user)) {
      props.history.push('/');
    }
  }, [user]);

  const resetMode = () => {
    if (!mode.hasData) {
      productObject.setField('name', '');
      productObject.setField('price', 0.01);
      productObject.setField('quantity', 1);
      productObject.setField('description', '');
      productObject.setField('id', null);
    } else {
      productObject.setField('name', product.name);
      productObject.setField('price', product.price);
      productObject.setField('quantity', product.quantity);
      productObject.setField('description', product.description);
      productObject.setField('id', product.id);
    }
  }

  const handleSaveClick = () => {
    setModalConfig({
      title: 'Save changes',
      body: 'Do you want to save the changes?',
      removal: false,
      handleYes: async () => {
        try {
          const data = normalize(productObject.values);
          await (mode.hasData ? updateProduct(data) : addProduct(data));
          props.history.push('/');
        } catch (e) { }
      }
    });
    showConfirm(true);
  }

  const handleDeleteClick = () => {
    setModalConfig({
      title: 'Delete',
      body: 'Do you want to delete the product?',
      removal: true,
      handleYes: async () => {
        try {
          await deleteProduct(product.id);
          props.history.push('/');
        } catch (e) { }
      }
    });
    showConfirm(true);
  }

  const normalize = data => {
    const result = { ...data };
    const price = +result.price;
    result.price = isNaN(price) ? 0.01 : price;
    const quantity = +result.quantity;
    result.quantity = isNaN(quantity) ? 1 : quantity;
    return result;
  }

  const createFormInput = (desc, extraProps) => (
    <>
      <Form.Control
        plaintext={!mode.isEditable}
        readOnly={!mode.isEditable}
        {...extraProps} required />
      {mode.isEditable ? <Form.Text className="text-muted">{desc}</Form.Text> : <></>}
    </>
  );

  const checkValid = () => {
    return productObject.isPristine() ? true : !(Object.values(productObject.errors).every(e => e === undefined) && productObject.values.name.length >= 3 && productObject.values.description.length);
  }

  mode.buttons.forEach(type => {
    if (user) {
      if (type === 'reset') buttons.push(<Button size="sm" variant="warning" type="button" className="mr-2" key="reset" onClick={resetMode}>Reset</Button>);
      else if (type === 'save') buttons.push(<Button size="sm" variant="success" type="button" className="mr-2" onClick={handleSaveClick} key="save" disabled={checkValid()}>Save</Button>);
      else if (type === 'edit') buttons.push(<Button size="sm" variant="info" type="button" className="mr-2" key="edit" onClick={() => props.history.push('/edit')}>Edit</Button>);
      else buttons.push(<Button size="sm" variant="danger" type="button" className="float-right" key="delete" onClick={handleDeleteClick}>Delete</Button>);
    }
  })

  return (
    <Col>
      <Row>
        <Col>
          <h1 className="display-4 text-center">{mode.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group as={Row} controlId="productName">
                  <Form.Label column sm="3">Name</Form.Label>
                  <Col sm="9">
                    {createFormInput('Name of the product', { ...inputs.text('name'), minLength: 3 })}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="productPrice">
                  <Form.Label column sm="3">Price</Form.Label>
                  <Col sm="9">
                    {createFormInput('Price (between 0 and 100)', { min: 0.01, max: 99.99, step: 0.01, ...inputs.number('price') })}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="productQuantity">
                  <Form.Label column sm="3">Quantity</Form.Label>
                  <Col sm="9">
                    {createFormInput('Quantity (between 0 and 100000)', { min: 1, max: 99999, step: 1, ...inputs.number('quantity') })}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="productDescription">
                  <Form.Label column sm="3">Description</Form.Label>
                  <Col sm="9">
                    {createFormInput('Description of the product', { as: 'textarea', rows: 3, ...inputs.textarea('description'), minLength: 3 })}
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer>
              {Object.entries(productObject.errors).map(([k, e]) => { if (e) return <p key={k} className="text-danger">{e}</p>; return <React.Fragment key={k}></React.Fragment>; })}
              {buttons}
            </Card.Footer>
          </Card>
          <ConfirmationModal show={confirm} handleNo={() => showConfirm(false)} config={modalConfig}></ConfirmationModal>
        </Col>
      </Row>
    </Col>
  );
};

const mapStateToProps = state => ({
  product: productSelector(state),
  user: userSelector(state),
});

const mapDispatchToProps = dispatch => ({
  deleteProduct: deleteProduct(dispatch),
  addProduct: addProduct(dispatch),
  updateProduct: updateProduct(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
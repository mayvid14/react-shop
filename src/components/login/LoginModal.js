import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormState } from 'react-use-form-state';

export const LoginModal = props => {
  const { handleNo, handleYes, show } = props;
  const [form, inputs] = useFormState({
    username: '',
    password: ''
  });

  const login = () => {
    handleYes(form.values);
    handleNo();
  }

  return (
    <Modal show={show} onHide={handleNo} centered aria-labelledby="login-modal">
      <Modal.Header closeButton>
        <Modal.Title id="login-modal">Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" {...inputs.text('username')} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" {...inputs.password('password')} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={handleNo}>Cancel</Button>
        <Button variant="success" onClick={login} className="float-right">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
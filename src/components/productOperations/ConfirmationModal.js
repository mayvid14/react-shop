import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const ConfirmationModal = props => {
  const { handleNo, show, config } = props;
  return (
    <Modal show={show} onHide={handleNo} centered aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{config.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{config.body}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant={config.removal ? "success" : "danger"} onClick={handleNo}>No</Button>
        <Button variant={config.removal ? "danger" : "success"} onClick={config.handleYes}>Yes</Button>
      </Modal.Footer>
    </Modal>
  );
}
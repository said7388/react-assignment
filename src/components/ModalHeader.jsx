// @flow strict

import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ModalHeader({ handleClose, title }) {
  const navigate = useNavigate();


  const toggleAllContacts = () => {
    navigate('?contacts=true');
  };

  const toggleUsContacts = () => {
    navigate('?us-contacts=true');
  }

  return (
    <>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <div className="d-flex align-items-center gap-3">
          <Button
            style={{
              backgroundColor: '#46139c',
              border: 0
            }}
            onClick={toggleAllContacts}
          >
            All Contacts
          </Button>
          <Button
            style={{
              backgroundColor: '#ff7f50',
              border: 0
            }}
            onClick={toggleUsContacts}
          >
            US Contacts
          </Button>
          <Button
            variant="secondary"
            style={{
              backgroundColor: '#ffffff',
              borderColor: '#46139c',
              color: '#46139c',
            }}
            onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal.Header>
    </>
  );
};

export default ModalHeader;
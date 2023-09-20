// @flow strict

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import ModalHeader from './ModalHeader';

function AllContacts({ handleClose }) {
  const [contacts, setContacts] = useState([]);
  const [isEven, setIsEven] = useState(false);
  const [page, setPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const loadRef = useRef();

  // Function for data fetching
  const handleFetchContacts = useCallback(async () => {
    if (page === 0) return;
    const response = await fetch(`https://contact.mediusware.com/api/contacts/?page=${page}`);
    const data = await response.json();
    setContacts([...contacts, ...data?.results]);
  }, [page]);


  useEffect(() => {
    handleFetchContacts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
        setPage((prev) => prev + 1);
      }
      else {
        setIsVisible(false);
      }
    });

    observer.observe(loadRef.current);
    // handleFetchContacts();

    return () => {
      loadRef.current && observer.unobserve(loadRef.current);
    };
  }, [loadRef]);

  return (
    <>
      <ModalHeader title="All Contacts" handleClose={handleClose} />
      <Modal.Body>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Country</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {
              contacts.map((contact, index) => {
                if (isEven && contact.id % 2 !== 0) {
                  return null;
                }
                return <tr key={index}>
                  <td>{contact.id}</td>
                  <td>{contact?.country?.name}</td>
                  <td>{contact.phone}</td>
                </tr>
              })
            }
          </tbody>
        </table>

        <div ref={loadRef}>
          {isVisible && <p>Loading...</p>}
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Form.Check // prettier-ignore
          type="checkbox"
          label="Only Even"
          onChange={(e) => setIsEven(e.target.checked)}
        />
      </Modal.Footer>
    </>
  );
};

export default AllContacts;
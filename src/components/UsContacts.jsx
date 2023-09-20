// @flow strict

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import ModalHeader from './ModalHeader';

function UsContacts({ handleClose }) {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const loadRef = useRef();

  // Function for data fetching
  const handleFetchContacts = useCallback(async () => {
    if (page === 0) return;
    const response = await fetch(`https://contact.mediusware.com/api/country-contacts/United%20States/?page=${page}`);
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
      <ModalHeader title="US Contacts" handleClose={handleClose} />
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
              contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.id}</td>
                  <td>{contact?.country?.name}</td>
                  <td>{contact.phone}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <div ref={loadRef}>
          {isVisible && <p>Loading...</p>}
        </div>
      </Modal.Body>
    </>
  );
};

export default UsContacts;
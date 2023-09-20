import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AllContacts from './AllContacts';
import UsContacts from './UsContacts';

const Problem2 = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const contactsModalOpen = searchParams.get('contacts') || false;
    const usContactsModalOpen = searchParams.get('us-contacts') || false;

    const handleClose = () => {
        setShow(false)
    };

    const toggleAllContacts = () => {
        if (contactsModalOpen) {
            navigate('/problem-2');
        } else {
            navigate('?contacts=true');
        }
    };

    const toggleUsContacts = () => {
        if (usContactsModalOpen) {
            navigate('/problem-2');
        } else {
            navigate('?us-contacts=true');
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                <div className="d-flex justify-content-center gap-3">
                    <button
                        onClick={toggleAllContacts}
                        className="btn btn-lg btn-outline-primary"
                        type="button" >All Contacts</button>
                    <button
                        onClick={toggleUsContacts}
                        className="btn btn-lg btn-outline-warning"
                        type="button" >US Contacts</button>
                </div>
            </div>

            <Modal scrollable size='lg' show={contactsModalOpen} onHide={toggleAllContacts}>
                <AllContacts handleClose={toggleAllContacts} />
            </Modal>
            <Modal scrollable size='lg' show={usContactsModalOpen} onHide={toggleUsContacts}>
                <UsContacts handleClose={toggleUsContacts} />
            </Modal>
        </div>
    );
};

export default Problem2;
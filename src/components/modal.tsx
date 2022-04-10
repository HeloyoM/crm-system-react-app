import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

export interface IModal {
    title: string,
    label: string,
    onHideModal(): void,
}

function AppModal(props: IModal) {
   const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true)
    });

    return (
        <Modal
            show={show}
            dialogClassName="modal-90w"
            aria-labelledby="modalTitle"
        >
            <Modal.Header>
                <Modal.Title id="modalTitle" style={{color: "red"}}>{props.title}</Modal.Title>
                <Button variant="secondary" onClick={() => props.onHideModal()}><span style={{ fontSize: 14 }} aria-hidden="true">&times;</span></Button>
            </Modal.Header>
            <Modal.Body>
                <p>{props.label}</p>
            </Modal.Body>
        </Modal>
    );

}
export default AppModal;
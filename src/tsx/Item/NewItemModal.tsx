import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import plusSign from "/src/assets/plus-sign.svg";
import { Item } from "../Types";
import axios from "axios";

function NewItemModal() {
    const [name] = useState("");
    const [image] = useState("");
    const [sound] = useState("");
    const [spokenText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newItem: Item = {
            id: null,
            soundboardId: null,
            name: name,
            image: image,
            sound: sound,
            spokenText: spokenText,
        };
        addItem(newItem);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function addItem(newItem: Item) {
        axios.post("/items", newItem).then((response) => {
            console.log(response.data);
        });
    }

    return (
        <>
            <div onClick={handleShow} id="new-item-icon">
                <img src={plusSign} alt="New Item" />
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create A New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Enter Name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Image">
                            <Form.Label>Image:</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Enter Image URL"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Sound:</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Enter Sound URL"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="spoken-text">
                            <Form.Label>Spoken Text:</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Enter Spoken Text"
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NewItemModal;

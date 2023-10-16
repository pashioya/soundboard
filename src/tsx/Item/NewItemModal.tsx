import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import plusSign from "/src/assets/plus-sign.svg";
import { ItemData } from "../../model/Item";
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";



interface NewItemModalProps {
    onSubmit: (data: ItemData) => void;
}

const itemSchema: z.ZodType<ItemData> = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    spokenText: z.string(),
    sound: z.string().url(),
    image: z.string().url(),
})


function NewItemModal({ onSubmit }: NewItemModalProps) {
    const { handleSubmit,
        control,
        formState: { errors },
    } = useForm<ItemData>({
        resolver: zodResolver(itemSchema),
        defaultValues: {
            name: "",
            image: "",
            sound: "",
            spokenText: "",
        },
    });



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <Form
                        onSubmit={handleSubmit((data) => onSubmit(data))}
                    >
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Form.Control
                                        {...field}
                                        type="text"
                                        placeholder="Enter Name"
                                        isInvalid={!!errors.name}
                                    />
                                )}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name && errors.name.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Image:</Form.Label>
                            <Controller
                                name="image"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Form.Control
                                        {...field}
                                        type="text"
                                        placeholder="Enter Image URL"
                                        isInvalid={!!errors.image}
                                    />
                                )}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="sound">
                            <Form.Label>Sound:</Form.Label>
                            <Controller
                                name="sound"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Form.Control
                                        {...field}
                                        type="text"
                                        placeholder="Enter Sound URL"
                                        isInvalid={!!errors.sound}
                                    />
                                )}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="spokenText">
                            <Form.Label>Spoken Text:</Form.Label>
                            <Controller
                                name="spokenText"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Form.Control
                                        {...field}
                                        type="text"
                                        placeholder="Enter Spoken Text"
                                        isInvalid={!!errors.spokenText}
                                    />
                                )}
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

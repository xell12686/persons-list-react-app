import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';
import axios from 'axios';

const EditPersonModal = (props) => {
    // A Controlled Form using refs
    const [data, setData] = useState({});

    useEffect(() => {
        if (props.editPersonData) {
            setData(props.editPersonData);
        }
        return () => {
            setData({});
        };
    }, [props.editPersonData])

    let stringBirthday = '';
    if (data.birthday) {
        const parsedDate = new Date(data.birthday);
        stringBirthday = parsedDate.toISOString();
    }

    
    const handleEdit = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleEditBirthday = (value) => {
        setData({ ...data,  birthday: value });
    }

    // const handleCancel = (e) => {
    //     e.preventDefault();
    //     props.closeModal();
    // }

    const handleUpdatePerson = (e) => {
        e.preventDefault();
        console.log('init axios post to update');
        console.log(data);
        axios.post('http://localhost:3000/persons', data)
            .then((response) => {
                props.closeModal();
                props.reloadList();
                console.log(response.data);
            })
        ;
    }

    return (
        <Modal isOpen={props.isModalOpen} toggle={props.toggleModal}>
            <ModalHeader toggle={props.toggleModal}>Edit Person</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="name" hidden>Name</Label>
                    <Input id="title" value={data.name} placeholder="Person Name" name="name" onChange={handleEdit} required />
                </FormGroup>
                <FormGroup>
                    <Label for="occupation" hidden>Occupation</Label>
                    <Input id="occupation" value={data.occupation} placeholder="Occupation" name="occupation" onChange={handleEdit} />
                </FormGroup>
                <FormGroup>
                    <Label for="birthday" hidden>Birthday</Label>
                    <DatePicker 
                        name="birthday" 
                        value={stringBirthday}
                        onChange={(v,f) => handleEditBirthday(v, f)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="citizenship" hidden>Citizenship</Label>
                    <Input id="citizenship" value={data.citizenship} placeholder="Citizenship" name="citizenship" onChange={handleEdit} />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUpdatePerson}>Update Person</Button>{' '}
                <Button color="secondary" onClick={props.closeModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default EditPersonModal;
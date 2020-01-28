import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';
import axios from 'axios';

const EditPersonModal = (props) => {
    const [data, setData] = useState({});
    const [previousName, setPreviousName] = useState('');

    useEffect(() => {
        if (props.editPersonData.name) {
            setPreviousName(props.editPersonData.name);
        }
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

    const handleUpdatePerson = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/persons/${previousName}`, data)
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
                    <Input id="name" defaultValue={data.name} data-id={data.ID} name="name" onChange={handleEdit} />
                </FormGroup>
                <FormGroup>
                    <Label for="occupation" hidden>Occupation</Label>
                    <Input id="occupation" value={data.occupation} placeholder="Occupation" name="occupation" onChange={handleEdit} />
                </FormGroup>
                <FormGroup>
                    <Label for="birthday" hidden>Birthday</Label>
                    <DatePicker
                        id="birthday"
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
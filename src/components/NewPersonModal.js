import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';
import axios from 'axios';

const NewPersonModal = (props) => {
    
    const [data, setData] = useState({});
    const [stringBirthday, setBirthday] = useState('');
    
    useEffect(() => {
        if (data.birthday) {
            const parsedDate = new Date(data.birthday);
            const string = parsedDate.toISOString();
            setBirthday(string);
        }        
        return () => {
            //setData({});
        };
    }, [data.birthday])

    
    const handleNewPersonData = (event) => {
        event.preventDefault();
        setData({ ...data, [event.target.name]: event.target.value });
    }
    
    const handleEditBirthday = (value) => {
        setData({ ...data,  birthday: value });
    }

    const handleAddPerson = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/persons', data)
            .then((response) => {
                props.toggleModal();
                props.reloadList();
                console.log(response.data);
            });
    }    



    return (
        <Modal isOpen={props.isModalOpen} toggle={props.toggleModal}>
            <ModalHeader toggle={props.toggleModal}>Add Person</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="name" hidden>Name</Label>
                    <Input id="name" placeholder="Person Name" value={data.name || ''} name="name" onChange={handleNewPersonData} required />
                </FormGroup>
                <FormGroup>
                    <Label for="occupation" hidden>Occupation</Label>
                    <Input id="occupation" placeholder="Occupation" value={data.occupation  || ''} name="occupation" onChange={handleNewPersonData} required/>
                </FormGroup>
                <FormGroup>
                    <Label for="birthday" hidden>Birthday</Label>
                    <DatePicker 
                        name="birthday" 
                        value={stringBirthday || ''}
                        onChange={(v,f) => handleEditBirthday(v, f)}
                    />                    
                </FormGroup>
                <FormGroup>
                    <Label for="citizenship" hidden>Citizenship</Label>
                    <Input id="citizenship" placeholder="Citizenship" value={data.citizenship  || ''} name="citizenship" onChange={handleNewPersonData} required />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" 
                    disabled={(data.name && data.birthday) ? false : true} 
                    onClick={handleAddPerson}>Add Person</Button>{' '}
                <Button color="secondary" onClick={props.toggleModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default NewPersonModal;
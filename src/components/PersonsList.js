import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import NewPersonModal from './NewPersonModal';
import EditPersonModal from './EditPersonModal';
import Moment from 'react-moment';

import './PersonsList.scss';

const PersonsList = () => {
    const [ isLoaded, setLoaded ] = useState(false);
    const [ loadingMessage, setLoadingMessage ] = useState('Loading...');
    const [ persons, setPersons ] = useState([]);
    const [ newPersonModal, setNewPersonModal ] = useState(false);
    const [ editPersonModal, setEditPersonModal ] = useState(false);
    const [ editPersonData, setEditPersonData ] = useState({});

    useEffect(() => {
        if (!isLoaded) {
            axios.get('http://localhost:3000/persons')
                .then((response) => {
                    setPersons(response.data);
                    setLoaded(true);
                })
                .catch(error => {
                    setLoadingMessage('Failed to load persons data...');
                    console.log(error);
                });
        }
    }, [isLoaded]);

    const toggleNewPersonModal = () => {
        setNewPersonModal(!newPersonModal);
    }

    const openEditPersonModal = (e) => {
        e.preventDefault();
        const newTempData = {
            name: e.currentTarget.dataset.name,
            occupation: e.currentTarget.dataset.occupation, 
            birthday: e.currentTarget.dataset.birthday,
            citizenship: e.currentTarget.dataset.citizenship 
        }
        setEditPersonData({ ...editPersonData, ...newTempData });
        setEditPersonModal(!editPersonModal);
    }

    const closeEditPersonModal = (e) => {
        setEditPersonModal(!editPersonModal);
    }

    return (
        <>
            <NewPersonModal
                isModalOpen={newPersonModal}
                toggleModal={toggleNewPersonModal}
                reloadList={() => setLoaded(false)}
            />

            <EditPersonModal
                editPersonData={editPersonData}
                reloadList={() => setLoaded(false)}
                isModalOpen={editPersonModal}
                openModal={openEditPersonModal}
                closeModal={closeEditPersonModal}
            />

            <Table className="mt-3" dark>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Occupation</th>
                        <th>Birthday</th>
                        <th>Citizenship</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {isLoaded ?
                        persons.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.name}</td>
                                    <td>{item.occupation}</td>
                                    <td><Moment format="DD MMMM YYYY" date={item.birthday} /></td>
                                    <td>{item.citizenship}</td>
                                    <td>
                                        <Button color="success" size="sm" 
                                            data-name={item.name} 
                                            data-occupation={item.occupation} 
                                            data-birthday={item.birthday} 
                                            data-citizenship={item.citizenship} 
                                            onClick={openEditPersonModal}>
                                            <FaEdit onClick={(e)=> e.preventDefault()} />
                                        </Button>
                                        <Button color="danger" size="sm"><FaTrashAlt /></Button>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        <tr><td colSpan={5}>{loadingMessage}</td></tr>
                    }
                </tbody>
            </Table>
            {isLoaded &&
                <Button color="primary" onClick={toggleNewPersonModal}>Add Person</Button>
            }
        </>
    );
}

export default PersonsList;

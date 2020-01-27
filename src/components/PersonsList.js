import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

import './PersonsList.scss';

function App() {
    const [ persons, setPersons ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/books').then((response) => {
            setPersons=response.data;
        })
    }, []);

    return (
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
                <tr>
                    <td>Juan de la Cruz</td>
                    <td>Web Developer</td>
                    <td>Jan 18, 1986</td>
                    <td>Filipino</td>
                    <td>
                        <Button color="success" size="sm"><FaEdit /></Button>
                        <Button color="danger" size="sm"><FaTrashAlt /></Button>
                    </td>
                </tr>
                <tr>
                    <td>Juan de la Cruz 2</td>
                    <td>Web Developer</td>
                    <td>Jan 18, 1986</td>
                    <td>Filipino</td>
                    <td>
                        <Button color="success" size="sm"><FaEdit /></Button>
                        <Button color="danger" size="sm"><FaTrashAlt /></Button>
                    </td>
                </tr>
            </tbody>
        </Table>

    );
}

export default App;

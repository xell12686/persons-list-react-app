import React from 'react';
import PersonsList from './components/PersonsList';
import { Container, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App mt-3">
      <Container className="PersonsList">
          <Row>
              <Col>
                <h2>Famous Persons List</h2>
              </Col>
          </Row>
          <Row>
              <Col>
                <PersonsList />
              </Col>
          </Row>
      </Container>      
    </div>
  );
}

export default App;

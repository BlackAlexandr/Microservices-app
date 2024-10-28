import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import DataTable from './DataTable';
import RegistrationModal from './form/RegistrationModal';
import { USERS_API_URL, COMPANIES_API_URL } from '../constants';

class Home extends Component {
    state = {
        items: [],
        companies: []
    }

    componentDidMount() {
        this.getItensEmployee();
        this.getCompanies();
    }

     getItensEmployee = () => {
        fetch(USERS_API_URL)
            .then(res => res.json())
            .then(res => this.setState({ items: res }))
            .catch(err => console.log(err));
    }

    getCompanies = () => {
        fetch(COMPANIES_API_URL)
            .then(res => res.json())
            .then(res => this.setState({ companies: res }))
            .catch(err => console.log(err));
    }

    addUserToState = user => {
        this.setState(previous => ({
            items: [...previous.items, user]
        }));
    }

    updateState = (id) => {
        this.getItensEmployee();
    }

    deleteItemFromState = id => {
        const updated = this.state.items.filter(item => item.id !== id);
        this.setState({ items: updated })
    }

    render() {
        return <Container style={{ paddingTop: "100px" }}>
            <Row>
                <Col>
                    <h3>Справочинк сотрудников</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataTable
                        companies={this.state.companies}
                        items={this.state.items}
                        updateState={this.updateState}
                        deleteItemFromState={this.deleteItemFromState} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <RegistrationModal isNew={true} addUserToState={this.addUserToState} />
                </Col>
            </Row>
        </Container>;
    }
}

export default Home;

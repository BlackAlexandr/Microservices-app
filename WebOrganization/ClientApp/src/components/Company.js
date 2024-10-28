import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import DataTableCompany from './DataTableCompany';
import RegistrationModalCompany from './form/RegistrationModalCompany';
import { COMPANIES_API_URL } from '../constants';

export class Company extends Component {

    state = {
        items: []
    }

    componentDidMount() {
        this.getItensCompany();
    }

    getItensCompany = () => {
        fetch(COMPANIES_API_URL)
            .then(res => res.json())
            .then(res => this.setState({ items: res }))
            .catch(err => console.log(err));
    }
    addCompanyToState = company => {
        this.setState(previous => ({
            items: [...previous.items, company]
        }));
    }

    updateState = (id) => {
        this.getItensCompany();
    }

    deleteItemFromState = id => {
        const updated = this.state.items.filter(item => item.id !== id);
        this.setState({ items: updated })
    }

    render() {
        return <Container style={{ paddingTop: "100px" }}>
            <Row>
                <Col>
                    <h3>Справочинк организаций</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataTableCompany
                        items={this.state.items}
                        updateState={this.updateState}
                        deleteItemFromState={this.deleteItemFromState} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <RegistrationModalCompany isNew={true} addCompanyToState={this.addCompanyToState} />
                </Col>
            </Row>
        </Container>;
    }
}
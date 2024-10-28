import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import { COMPANIES_API_URL } from '../../constants';

class RegistrationForm extends React.Component {


    state = {
        companyId: 0,
        companyName: '',
        legalAddress: '',
        actions: [],
    }


    componentDidMount() {
        if (this.props.company) {
            const { companyId, companyName, legalAddress } = this.props.company;
            this.setState({ companyId, companyName, legalAddress });
        }

        fetch(`${COMPANIES_API_URL}`, {
            method: 'get',
            type: 'application/json; charset=utf-8'
        })
            .then(res => res.json())
            .then(comp => {
                this.setState({ actions: comp });
            })
            .catch(err => console.log(err));
    }


    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitNew = e => {
        e.preventDefault();
        fetch(`${COMPANIES_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                companyId: this.state.companyId,
                companyName: this.state.companyName,
                legalAddress: this.state.legalAddress
            })
        })
            .then(res => res.json())
            .then(comp => {
                this.props.addCompanyToState(comp);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }

    submitEdit = e => {
        e.preventDefault();
        fetch(`${COMPANIES_API_URL}/${this.state.companyId}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                companyName: this.state.companyName,
                legalAddress: this.state.legalAddress
            })
        })
            .then(() => {
                this.props.toggle();
                this.props.updateCompanyIntoState(this.state.companyId);
            })
            .catch(err => console.log(err));
    }

    render() {
        return <Form onSubmit={this.props.company ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="companyId">ИНН:</Label>
                <Input type="number" name="companyId" onChange={this.onChange} value={this.state.companyId} readOnly={this.props.company ? true : false}/>
            </FormGroup>
            <FormGroup>
                <Label for="name">Наименвоание:</Label>
                <Input type="text" name="companyName" onChange={this.onChange} value={this.state.fullNcompanyNameame === '' ? '' : this.state.companyName} />
            </FormGroup>
            <FormGroup>
                <Label for="legalAddress">Юр. адрес:</Label>
                <Input type="text" name="legalAddress" onChange={this.onChange} value={this.state.legalAddress === '' ? '' : this.state.legalAddress} />
            </FormGroup>
            <Button disabled={this.state.companyId != 0 ? false : true}>Отправить</Button>
        </Form>;
    }
}

export default RegistrationForm;
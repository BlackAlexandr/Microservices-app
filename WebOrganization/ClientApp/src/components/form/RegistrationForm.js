import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import { USERS_API_URL, COMPANIES_API_URL } from '../../constants';

class RegistrationForm extends React.Component {


    state = {
        personnelId: 0,
        fullName: '',
        dateOfBirth: '',
        address: '',
        companyId: 0,
        actions: [],
    }


    componentDidMount() {
        if (this.props.user) {
            const { personnelId, fullName, dateOfBirth, address, companyId } = this.props.user;
            this.setState({ personnelId, fullName, dateOfBirth, address, companyId });
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
        fetch(`${USERS_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                personnelId: this.state.personnelId,
                fullName: this.state.fullName,
                dateOfBirth: this.state.dateOfBirth,
                address: this.state.address,
                companyId: this.state.companyId !== null ? this.state.companyId : document.getElementById('companySelect').value
            })
        })
            .then(res => res.json())
            .then(user => {
                this.props.toggle();
                this.props.addUserToState(user);
            })
            .catch(err => console.log(err));
    }

    submitEdit = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL}/${this.state.personnelId}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: this.state.fullName,
                dateOfBirth: this.state.dateOfBirth,
                address: this.state.address,
                companyId: document.getElementById('companySelect').value
            })
        })
            .then(() => {
                this.props.toggle();
                this.props.updateUserIntoState(this.state.personnelId);
                this.props.updateState();
            })
            .catch(err => console.log(err));
    }

    render() {
        const items = this.state.actions;
        return <Form onSubmit={this.props.user ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="personnelId">Табельный номер:</Label>
                <Input type="number" name="personnelId" onChange={this.onChange} value={this.state.personnelId} readOnly={this.props.user ? true : false} />
            </FormGroup>
            <FormGroup>
                <Label for="name">ФИО:</Label>
                <Input type="text" name="fullName" onChange={this.onChange} value={this.state.fullName === '' ? '' : this.state.fullName} />
            </FormGroup>
            <FormGroup>
                <Label for="dateOfBirth">Дата рождения:</Label>
                <Input type="date" id="dateOfBirth" name="dateOfBirth" onChange={this.onChange} value={this.state.dateOfBirth.split('T')[0]} />
            </FormGroup>
            <FormGroup>
                <Label for="address">Адрес:</Label>
                <Input type="text" name="address" onChange={this.onChange} value={this.state.address === null ? '' : this.state.address} />
            </FormGroup>
            <FormGroup>
                <Label for="company">Место работы:</Label>
                <Input type="select" name="companyId" id="companySelect" onChange={this.onChange}>
                    {items.map(e => {
                        return <option id={e.companyId} selected={e.companyId === this.state.companyId && this.state.companyId !== null} value={e.companyId}>{e.companyName}</option>
                    })}
                </Input>
            </FormGroup>

            <Button disabled={(this.state.personnelId != 0 && this.state.dateOfBirth != '') ? false : true}>Отправить</Button>
        </Form>;
    }
}

export default RegistrationForm;
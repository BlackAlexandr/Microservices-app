import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import RegistrationModalCompany from '../components/form/RegistrationModalCompany';
import { COMPANIES_API_URL, USERS_API_URL } from '../constants';
import Employee from '../components/Employee';

class DataTableCompany extends Component {

    deleteItem = id => {
        let confirmDeletion = window.confirm('Удалить?');
        if (confirmDeletion) {
            fetch(`${COMPANIES_API_URL}/${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    this.props.deleteItemFromState(id);
                    this.editCompanyId(id);
                    this.props.updateState();
                    
                })
                .catch(err => console.log(err));
        }
    }

    editCompanyId = id => {
        fetch(`${USERS_API_URL}/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        const items = this.props.items;
        return <Table striped>
            <thead className="thead-dark">
                <tr>
                    <th>ИНН</th>
                    <th>Наименоване</th>
                    <th>Адрес</th>
                    <th style={{ textAlign: "center" }}>Действия</th>
                </tr>
            </thead>
            <tbody>
                {!items || items.length <= 0 ?
                    <tr>
                        <td colSpan="4" align="center"><b>Организации отсутствуют</b></td>
                    </tr>
                    : items.map(item => (
                        <tr key={item.companyId}>
                            <th scope="row">
                                {item.companyId}
                            </th>
                            <td>
                                {item.companyName}
                            </td>
                            <td>
                                {item.legalAddress}
                            </td>
                            <td align="center">
                                <div>
                                    <RegistrationModalCompany
                                        isNew={false}
                                        company={item}
                                        updateCompanyIntoState={this.props.updateState} />
                  &nbsp;&nbsp;&nbsp;
                  <Button color="danger" onClick={() => this.deleteItem(item.companyId)}>Удалить</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>;
    }
}

export default DataTableCompany;

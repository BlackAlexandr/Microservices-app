import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import RegistrationModal from './form/RegistrationModal';

import { USERS_API_URL } from '../constants';

class DataTable extends Component {

    deleteItem = id => {
        let confirmDeletion = window.confirm('Удалить?');
        if (confirmDeletion) {
            fetch(`${USERS_API_URL}/${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    this.props.deleteItemFromState(id);
                    this.props.updateState();
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        const items = this.props.items;
        const companies = this.props.companies;
        console.log(this.props.companies);
        return <Table striped>
            <thead className="thead-dark">
                <tr>
                    <th>Табельный номер</th>
                    <th>ФИО</th>
                    <th>День рождения</th>
                    <th>Адрес</th>
                    <th>Место работы</th>
                    <th style={{ textAlign: "center" }}>Действия</th>
                </tr>
            </thead>
            <tbody>
                {!items || items.length <= 0 ?
                    <tr>
                        <td colSpan="6" align="center"><b>Сотрудники отсутствуют</b></td>
                    </tr>
                    : items.map(item => (
                        <tr key={item.personnelId}>
                            <th scope="row">
                                {item.personnelId}
                            </th>
                            <td>
                                {item.fullName}
                            </td>
                            <td>
                                {item.dateOfBirth != null ? item.dateOfBirth.split('T')[0] : ''}
                            </td>
                            <td>
                                {item.address}
                            </td>
                            <td>
                                {companies.map(comp => (
                                    comp.companyId === item.companyId ? comp.companyName : ''
                                ))}
                            </td>
                            <td align="center">
                                <div>
                                    <RegistrationModal
                                        isNew={false}
                                        user={item}
                                        updateUserIntoState={this.props.updateState} />
                  &nbsp;&nbsp;&nbsp;
                  <Button color="danger" onClick={() => this.deleteItem(item.personnelId)}>Удалить</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>;
    }
}

export default DataTable;

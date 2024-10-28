import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import RegistrationFormCompany from './RegistrationFormCompany';

class RegistrationModalCompany extends Component {

    state = {
        modal: false
    }

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    }

    render() {
        const isNew = this.props.isNew;

        let title = 'Редактирование организации';
        let button = '';
        if (isNew) {
            title = 'Добавление';

            button = <Button
                color="success"
                onClick={this.toggle}
                style={{ minWidth: "200px" }}>Добавить</Button>;
        } else {
            button = <Button
                color="warning"
                onClick={this.toggle}>Редактировать</Button>;
        }

        return <Fragment>
            {button}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

                <ModalBody>
                    <RegistrationFormCompany
                        addCompanyToState={this.props.addCompanyToState}
                        updateCompanyIntoState={this.props.updateCompanyIntoState}
                        toggle={this.toggle}
                        company={this.props.company} />
                </ModalBody>
            </Modal>
        </Fragment>;
    }
}

export default RegistrationModalCompany;
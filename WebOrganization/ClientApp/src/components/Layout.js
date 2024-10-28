import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AppHeader from './AppHeader';

export class Layout extends Component {
  static displayName = Layout.name;

    render() {
        return (
            <div>
                <AppHeader />
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}


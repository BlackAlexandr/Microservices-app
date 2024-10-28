import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';


class AppHeader extends Component {

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: false
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <Container>
                <NavbarBrand tag={Link} to="/">Справочник</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} to="/">Сотрудники</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/company">Органицазии</NavLink>
                        </NavItem>
                    </ul>
                </Collapse>
            </Container>
        </Navbar>
    }
}

export default AppHeader;
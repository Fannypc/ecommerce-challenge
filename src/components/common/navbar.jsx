import React from "react";
import {Nav, Navbar} from 'react-bootstrap';

export default function NavbarApp(){
    return(
        <Navbar bg="light" expand="lg" className="mb-5">
        <Navbar.Brand href="/">E-commerce Challenge</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/">
                    Orders
                </Nav.Link>
            </Nav>
            <div className="justify-content-end">
                <Navbar.Text>
                Signed in as: <a href="#login">Stefany Porras</a>
                </Navbar.Text>
            </div>
        </Navbar.Collapse>
        </Navbar>
    );
}
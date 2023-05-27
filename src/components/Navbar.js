import React, { PureComponent } from 'react'
import Button from 'react-bootstrap/Button';
import logo from '../icon.png'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
    Link
  } from "react-router-dom";

class CustomNavbar extends PureComponent {
    constructor(){
        super();
        this.state={
            searchItem:""
        }
    }
    render() {
        return (
            <>
                <Navbar bg="light"  expand="lg">
                    <Container fluid>
                    <img src={logo} alt="Logo" height={"30rem"} width={"30rem"} className={"mx-4"}/>
                        <Navbar.Brand to="/General">News Monkey</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                
                                <Nav.Link as={Link} to="/">Headlines</Nav.Link>
                                
                                <NavDropdown title="Categories" id="navbarScrollingDropdown">                                 
                                    <NavDropdown.Item as={Link} to="/Business">
                                    Business 
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/Entertainment">
                                    Entertainment 
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/General">
                                    General 
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/Health">
                                    Health 
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/Science">
                                    Science
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/Sports">
                                    Sports
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/Technology">
                                    Technology
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>


                            {/* <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={(event)=>{this.setState({searchItem:event.target.value})}}
                                />
                                <Button variant="outline-success" as={Link} to={`/${this.state.searchItem}`}>Search</Button> 
                            </Form>*/}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default CustomNavbar;


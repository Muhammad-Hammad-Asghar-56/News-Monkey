import React, { PureComponent } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';


class CustomNavbar extends PureComponent {
    render() {
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                
                                <Nav.Link href="#action2">Headlines</Nav.Link>
                                
                                <NavDropdown title="Categories" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    
                                    <NavDropdown.Item href="#action4">
                                    Business 
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                    Entertainment 
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                    General 
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                    Health 
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                    Science
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                    Sports
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                    Technology
                                    </NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Link href="#" disabled>
                                    Link
                                </Nav.Link>
                            </Nav>


                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default CustomNavbar;


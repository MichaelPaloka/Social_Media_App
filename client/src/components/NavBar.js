import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {  useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {io} from 'socket.io-client'
import '../App.css';

const NavBar = ({socket}) => {

    const [followReq, setFollowReq] = useState([])

    const navigate = useNavigate()

    //Gets all user notificiations
    useEffect(()=>{
        axios.get("http://localhost:8000/api/notification/followreq", {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            setFollowReq(...followReq, res.data);
            console.log(followReq)
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    const onLogoutHandler = () => {
        axios.post('http://localhost:8000/api/user/logout')
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
        navigate('/socialmedia')
    }


    return (
        <div >
            <div>
                {/* Navigation Bar */}
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Social</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                            <Nav.Link href="/socialmedia/home">Home</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href= {`/socialmedia/home/user`}>
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Friend List
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Something
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Notifications" id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    example notifiacion
                                </NavDropdown.Item>
                            </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}
export default NavBar;


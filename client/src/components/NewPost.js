import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const NewPost = () => {
    const {id} = useParams();
    const [textBody, setTextBody] = useState("");
    const [postedBy, setPostedBy] = useState({});
    const [comment, setComment] = useState();

    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const createPostHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/post', {
            textBody,
            postedBy,
            comment
        },
        {
            withCredentials: true
        }
        )
            .then( res => {
                console.log(res);
                console.log(res.data);
                navigate("/socialmedia/home");
            })
            .catch( err => {
                console.log(err.response.data);
                setErrors(err.response.data.errors);
                navigate("/socialmedia/home/user/newpost");
            })
    }

    // Based on instructor Josh's and learn platform's Logout function, does not work though.
    
    const onLogoutHandler = async () => {
        axios.post('http://localhost:8000/api/user/logout')
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
        navigate('/Gamepartyfinder')
    }


    // The navbar is imported from react-bootstrap which I am using for the project.
    return (
        <div className='homepage-background'>
            <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">
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
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            <div style={{display: 'flex', justifyContent: 'center', height:1000 }}>
                <form onSubmit={createPostHandler} style={{ backgroundColor: '#FFFFFF', width: 1000, height: 500, marginTop:100, borderStyle: 'solid', borderRadius: 20,padding: 25 }}>
                    <h3 style={{textAlign: 'center', color: "#72A0C1"}}>New Post</h3>
                    <label for="textBody">
                        Textbody
                        <input type="text" onChange = {(e) => setTextBody(e.target.value)} class="form-control"></input>
                    </label>
                    
                    <input type={"submit"} value="Create Post" class="btn btn-outline-primary"/>
                </form>
            </div>
        </div>
    )
}

export default NewPost;
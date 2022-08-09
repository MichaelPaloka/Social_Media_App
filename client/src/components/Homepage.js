import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css';

const Homepage = () => {
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const {id} = useParams();
    const navigate = useNavigate()
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/" + id, {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            setUser(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    useEffect(()=>{
        axios.get("http://localhost:8000/api/post/", {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            setPosts(res.data);
            console.log(posts)
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
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href= {`/socialmedia/home/user/${user.id}`}>
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
            </div>

            <div style={{display: 'flex', justifyContent: 'center',}}>
                <Card style={{ width: 400,  color: 'blue'}}>
                    <Card.Header as="h5">Author's Name</Card.Header>
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                            With supporting text below as a natural lead-in to additional content.
                        </Card.Text>
                        <Button variant="primary">Like Post</Button>
                        <Button variant="primary">Comment</Button>
                    </Card.Body>
                </Card>

                {
                    posts.map((post, index) =>{
                        return (
                            <Card style={{ width: 400,  color: 'blue'}} key={index}>
                                <Card.Header as="h5">{post.postedBy.firstName} {post.postedBy.lastName}</Card.Header>
                                <Card.Body>
                                    <Card.Title>Special title treatment</Card.Title>
                                    <Card.Text>
                                        {post.textBody}
                                    </Card.Text>
                                    <Button variant="primary">Like Post</Button>
                                    <Button variant="primary">Comment</Button>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>
            
        </div>
    )
}
export default Homepage;


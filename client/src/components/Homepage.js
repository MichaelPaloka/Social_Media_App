import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {  useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import NewPost from './NewPost';
import {io} from 'socket.io-client'
import '../App.css';

const Homepage = ({socket}) => {

    const [posts, setPosts] = useState([])
    const [followReq, setFollowReq] = useState([])
    const [updPost, setUpdPost] = useState()
    const [errors, setErrors] = useState({});

    const [modalData, setModalData] = useState();
    console.log('modalData')
    console.log(modalData)

    const navigate = useNavigate()
    
    // For Modal from bootstrap
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Gets all user notificiations
    useEffect(()=>{
        axios.get("http://localhost:8000/api/notification/followreq", {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            setFollowReq(...followReq, res.data);
            console.log(posts)
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    // Gathers data on all posts
    useEffect(()=>{
        axios.get("http://localhost:8000/api/post/", {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            setPosts(...posts, res.data);
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
    
    console.log("the id is "+ errors)


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
                            <Nav.Link href="#home">Home</Nav.Link>
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

                <Stack gap={4} style={{ alignItems: 'center' }}>
                    {/* Form for a new post */}
                    <NewPost></NewPost>
                    {/* Cards for each individual Post */}
                    {
                        posts.slice().reverse().map((post, index) =>{
                            return (
                                    <Card style={{ width: 400,  color: 'blue'}} key={index}>
                                        <Card.Header as="h5">{post.postedBy.firstName} {post.postedBy.lastName}</Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                {post.textBody}
                                            </Card.Text>
                                            <Button variant="primary">Like Post</Button>
                                            <Button variant="primary" onClick={() => {setShow(true); setModalData(post.textBody)}} value={post._id}>Comment</Button>
                                        </Card.Body>
                                    </Card>
                            )
                        })
                    }
                    <div>
                    {
                        followReq.map((aFollowReq, index) =>{
                            return (
                                    <h1>A request sent from {aFollowReq.sentBy.firstName}</h1>
                            )
                        })
                    }
                    </div>
                </Stack>
                
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{} {}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {modalData}
                            <hr></hr>
                            <div style={{ textAlign: 'right' }}>
                                Leave a comment
                                <form>
                                    <input type={"text"}></input>
                                </form>
                            </div>
                            </div>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                        Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}
export default Homepage;


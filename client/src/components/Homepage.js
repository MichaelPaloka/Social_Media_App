import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import '../App.css';

const Homepage = () => {
    const {id} = useParams();
    const [user, setUser] = useState({})

    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState()
    const [textBody, setTextBody] = useState("");
    const [postedBy, setPostedBy] = useState({});

    const [errors, setErrors] = useState({});

    const [modalData, setModalData] = useState();
    console.log(modalData)

    const navigate = useNavigate()
    
    // For Modal from bootstrap
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // Gathers user info based off id for the profile page
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

    // Gathers data on all posts
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

    const createPostHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/post', {
            textBody,
            postedBy,
        },
        {
            withCredentials: true
        }
        )
            .then( res => {
                console.log(res);
                console.log(res.data);
                setPosts([...posts, res.data]);
                navigate("/socialmedia/home");
            })
            .catch( err => {
                console.log(err.response.data);
                setErrors(err.response.data.errors);
                navigate("/socialmedia/home");
            })
    }

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

                <Stack gap={4} style={{ alignItems: 'center' }}>
                    {/* Form for a new post */}
                        <div>
                            <form onSubmit={createPostHandler}>
                                <Card style={{ width: 400,  color: 'blue'}}>
                                    <Card.Header as="h5">Create a Post</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                        <label for="textBody">
                                            <input type="text" onChange = {(e) => setTextBody(e.target.value)} class="form-control"></input>
                                        </label>
                                        {errors.textBody && (
                                            <p style={{color: 'red'}}>{errors.textBody.message}</p>
                                        )}
                                        </Card.Text>
                                        <input type={"submit"} value="Create Post" class="btn btn-outline-primary"/>

                                    </Card.Body>
                                </Card>
                            </form>
                        </div>

                    {/* Cards for each individual Post */}
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
                                            <Button variant="primary" onClick={() => {setShow(true); setModalData(post.textBody)}} value={post._id}>Comment</Button>
                                        </Card.Body>
                                    </Card>
                            )
                        })
                    }
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


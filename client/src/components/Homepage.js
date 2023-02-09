import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {  useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import NavBar from './NavBar';
import NewPost from './NewPost';
import UserList from './UserList';
import {io} from 'socket.io-client'
import '../App.css';

const Homepage = ({socket}) => {

    const [posts, setPosts] = useState([])
    const [followReq, setFollowReq] = useState([])
    const [updPost, setUpdPost] = useState()
    const [errors, setErrors] = useState({});

    const [commentText, setCommentText] = useState();
    const [postId, setPostId] = useState();

    const [users, setUsers] = useState([])

    const [modalData, setModalData] = useState();
    console.log('modalData')
    console.log(modalData)

    const navigate = useNavigate()
    
    // For Modal from bootstrap
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    // Create a new comment
    const createComment = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/post/comment', {
            commentText,
            postId
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
                navigate("/socialmedia/home");
            })
    }

    return (
        <div >
            <div>
                {/* Navigation Bar */}
                <NavBar></NavBar>
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
                                            {post.comments.map((comment, index) => (
                                                <div key={index}>
                                                    {comment.commentText}{comment.postedBy}{comment._id}
                                                    <p></p>
                                                </div>
                                            ))}
                                            <form onSubmit={createComment}>
                                                <input type={"text"} onChange={(e) => setCommentText(e.target.value)}></input>
                                                <input type={"submit"} onClick={(e) => setPostId(post._id)}></input>
                                            </form>
                                        </Card.Body>
                                    </Card>
                            )
                        })
                    }

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
                    
                </Stack>

                
                

                <div>
                    <UserList></UserList>
                </div>

                <div>
                    {
                        followReq.map((aFollowReq, index) =>{
                            return (
                                    <h1>A request sent from {aFollowReq.sentBy.firstName}</h1>
                            )
                        })
                    }
                </div>
        </div>
    )
}
export default Homepage;


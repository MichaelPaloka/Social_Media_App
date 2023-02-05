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
                navigate("/socialmedia/home");
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
        <div>
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
        </div>
    )
}

export default NewPost;
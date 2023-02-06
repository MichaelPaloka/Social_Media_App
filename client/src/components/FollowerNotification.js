import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';


const FollowerNotification = () => {

    const [followReq, setFollowReq] = useState([])

    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    // // Gathers data on all posts
    // useEffect(()=>{
    //     axios.get("http://localhost:8000/api/post/", {withCredentials: true})
    //     .then((res)=>{
    //         console.log(res.data);
    //         setFollowReq(...posts, res.data);
    //         console.log(posts)
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // }, [])

    // Keeps a live update on user notifcations.
    
    return (
        <div>
            
        </div>
    )
}

export default FollowerNotification;
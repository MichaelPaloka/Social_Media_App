import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';


const UserList = () => {
    const [sentTo, setSentTo] = useState()
    const [users, setUsers] = useState([])


    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users", {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            setUsers(...users, res.data);
            console.log(users)
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    const createFollowReq = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/notification/followreq', {
            sentTo,
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
                console.log("This freq did not work " + err.response.data);
                setErrors(err.response.data.errors);
                navigate("/socialmedia/home");
            })
    }

    return (
        <div>
            <div>
                    {
                        users.map((user, index) =>{
                            return (
                                    <div key={index}>
                                        
                                        <form onSubmit={createFollowReq}>
                                            <h1 >{user.firstName}</h1>
                                            {/* <label for={"sentTo"}>
                                                <input type={"hidden"} id={"sentTo"} name={"sentTo"}></input>
                                            </label> */}
                                            <input type={"submit"} value="Follow" onClick={() => setSentTo(user._id)} className="btn btn-outline-primary"/>
                                        </form>
                                    </div>
                            )
                        })
                    }
                </div>
        </div>
    )
}

export default UserList;
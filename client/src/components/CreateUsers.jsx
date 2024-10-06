import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUsers = () =>{

    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [age,setAge] = useState();

    const navigate = useNavigate();

    const Submit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:3001/createUser",{name,email,age})
        .then(e=>{
            console.log(e)
            navigate("/");
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={Submit}>
            <h2>Add User</h2>
            <div className="mb-2">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                id="name"
                placeholder="Enter Name"
                className="form-control"
                onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                placeholder="Enter Email"
                className="form-control"
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="age">Age</label>
                <input
                type="text"
                id="age"
                placeholder="Enter Age"
                className="form-control"
                onChange={(e)=>setAge(e.target.value)}
                />
            </div>
            <button className="btn btn-success">Submit</button>
            </form>
        </div>
        </div>

        </div>
    )
}

export default CreateUsers;

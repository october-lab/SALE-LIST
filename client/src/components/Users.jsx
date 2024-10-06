import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/")
            .then(results => {
                setUsers(results.data)
                window.location.reload
            })
            .catch(err => console.log(err))
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteUser/${id}`)
            .then(user => {
                console.log(user)
                window.location.reload()
            })
            .catch(err => console.log(err));

        navigate("/");
    }

    return (
        <div>
            <h1>Users</h1>
            <button className="btn btn-info">Info</button>

            <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
                <div className="w-50 bg-white rounded p-3">
                    <Link to="/create" className="btn btn-success">Add +</Link>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        {/* You can add buttons or other actions here */}
                                        <Link to={`/update/${user._id}`} className="btn btn-primary">Update</Link>
                                        <button className="btn btn-danger ms-2"
                                            onClick={(e) => { handleDelete(user._id) }}
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Users;

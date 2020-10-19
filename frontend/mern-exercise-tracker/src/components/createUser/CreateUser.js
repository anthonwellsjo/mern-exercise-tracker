import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function () {

    const [username, setUsername] = useState("");

    const onChangeUsername = e => {
        const value = e.target.value;
        setUsername(value);
    }

    const onSubmit = e => {
        e.preventDefault();

        
        const user = {username: username};
        console.log(username);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))
            .catch(err => console.log("Error: " + err))


        setUsername("");
    }

    return (

        <div>
            <h3>
                Create New User
            </h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
};
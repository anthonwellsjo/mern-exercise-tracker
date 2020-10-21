import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';

export default function () {

    const history = useHistory();

    const [exercise, setExercise] = useState({ username: "", description: "", duration: 0, date: new Date() });
    const [users, setUsers] = useState({ users: [] });

    const onChangeUsername = e => {
        const value = e.target.value;
        setExercise(prev => ({ ...prev, username: value }))
    }
    const onChangeDescription = e => {
        const value = e.target.value;
        setExercise(prev => ({ ...prev, description: value }))
    }
    const onChangeDuration = e => {
        const value = e.target.value;
        setExercise(prev => ({ ...prev, duration: value }))
    }
    const onChangeDate = date => {
        setExercise(prev => ({ ...prev, date: date }))
    }

    const onSubmit = e => {
        e.preventDefault();

        const newExercise = JSON.stringify(exercise);
        console.log("new exc", newExercise);
        axios.post("http://localhost:5000/exercises/add", exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log("Error: " + err));
        history.push("/");
    }

    const userInput = useRef();

    useEffect(() => {
        axios.get("http://localhost:5000/users/")
            .then(res => {
                if (res.data.length > 0) {
                    setUsers({ users: res.data.map(user => user.username) });
                    setExercise({
                        username: res.data[0].username,
                        duration: 0,
                        date: new Date()
                    });
                }
            })


        // setExercise(prev => ({ ...prev, username: "test user", users: ["test user"] }))
    }, [])

    return (
        <div>
            <h3>Create new exercise log</h3>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        ref={userInput}
                        required
                        className="form-control"
                        value={exercise.username}
                        onChange={onChangeUsername}
                    >{
                            users.users.map(u => {
                                return <option
                                    key={u}
                                    value={u}>
                                    {u}
                                </option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={exercise.description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="number"
                        className="form-control"
                        value={exercise.duration}
                        onChange={onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={exercise.date}
                            onChange={date => onChangeDate(date)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Exercise Log"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    )
};
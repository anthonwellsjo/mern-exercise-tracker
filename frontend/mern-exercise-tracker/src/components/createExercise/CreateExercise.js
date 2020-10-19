import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';

export default function () {

    const history = useHistory();

    const [exercise, setExercise] = useState({ username: "", description: "", duration: 0, date: new Date(), users: [] });

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
        setExercise(prev => ({ ...prev, username: date }))
    }

    const onSubmit = e => {
        e.preventDefault();

        const newExercise = exercise;
        console.log("new exc", newExercise);
        axios.post("http://localhost:5000/exercises/add", exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log("Error: " + err));
        history.push("/");
    }

    const userInput = useRef();

    useEffect(() => {
        setExercise(prev => ({ ...prev, username: "test user", users: ["test user"] }))
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
                            exercise.users.map(u => {
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
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
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
                            onChange={onChangeDate}
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
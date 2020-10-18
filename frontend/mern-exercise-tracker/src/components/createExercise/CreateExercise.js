import React, { useState, useEffect } from 'react';

export default function () {

    const [exercise, setExercise] = useState({ username: "", description: "", duration: 0, date: new Date(), users: [] });

    const onChangeUsername = e => {
        setExercise(prev => ({ ...prev, username: e.target.value }))
    }
    const onChangedDescription = e => {
        setExercise(prev => ({ ...prev, description: e.target.value }))
    }
    const onChangeDuration = e => {
        setExercise(prev => ({ ...prev, duration: e.target.value }))
    }
    const onChangeDate = date => {
        setExercise(prev => ({ ...prev, username: date }))
    }

    const onSubmit = e => {
        e.preventDefault();

        const newExercise = exercise;
        console.log("new exc", newExercise);
        window.location("/");
    }

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
                        ref="userInput"
                        required
                        className="form-control"
                        value={exercise.username}
                        onChange={e => onChangeUsername(e)}
                    >
                        
                    </select>
                </div>
            </form>
        </div>
    )
};
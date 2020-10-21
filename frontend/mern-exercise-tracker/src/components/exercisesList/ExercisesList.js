import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function () {
  const [exercises, setExercises] = useState([]);

  const deleteExercise = id => {
    axios.delete("http://localhost:5000/exercises/" + id)
      .then(res => console.log(res.data));
    setExercises(exercises.filter(e => e._id !== id))
  }

  const exerciseList = () => {
    return exercises.map(e => {
      return (
        <tr>
          <td>{e.username}</td>
          <td>{e.description}</td>
          <td>{e.duration}</td>
          <td>{e.date}</td>
          <td><button onClick={()=>deleteExercise(e._id)}>Delete</button></td>
        </tr>
      )
    })
  }

  useEffect(() => {
    axios.get("http://localhost:5000/exercises/")
      .then(res => {
        if (res.data.length > 0) {
          setExercises(res.data);
        }
      })
      .catch(err => console.log(err))

    // setExercises
  }, [])

  return (
    <div>
      <h3>
        Logged Exercises:
      </h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exerciseList()}
        </tbody>
      </table>
    </div>
  )
};
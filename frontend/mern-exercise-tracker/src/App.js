import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/navbar/Navbar';
import ExercisesList from './components/exercisesList/ExercisesList'
import EditExercise from './components/editExercise/EditExercise'
import CreateExercise from './components/createExercise/CreateExercise'
import CreateUser from './components/createUser/CreateUser'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;

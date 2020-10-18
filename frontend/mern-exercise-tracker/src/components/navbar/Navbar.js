import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">ExerTracker</Link>
            <div className="collapse navbar-collapse"></div>
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link className="nav-link" to="/">Exercises</Link>
                </li>
                <li className="navbar-item">
                    <Link className="nav-link" to="/create">Create exercises log</Link>
                </li>
                <li className="navbar-item">
                    <Link className="nav-link" to="/user">Create user</Link>
                </li>
            </ul>
        </nav>

    )
};
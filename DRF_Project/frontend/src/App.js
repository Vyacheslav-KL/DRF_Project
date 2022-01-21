import React from 'react';
import './styles/App.css';
import UserList from './components/user.js';
// import ProjectList from './components/project.js';
// import TodoList from './components/todo.js';
import axios from 'axios';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000/api/';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get(`${API_URL}get-users`)
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className='wrapper'>
                <BrowserRouter>
                    <div className='content'>
                        <div className='container'>
                            <h1>menu</h1>
                            <nav>
                                <ul>
                                    <li>
                                        <Link to='/users'>Users</Link>
                                    </li>
                                    <li>
                                        <Link to='/todos'>Todos</Link>
                                    </li>
                                    <li>
                                        <Link to='/projects'>Projects</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className='container'>
                            <Routes>
                                <Route exact path='/users' element={<UserList users={this.state.users} />} />
                            </Routes>
                        </div>
                    </div>
                    <footer className="footer">
                        <div className="container">
                            <div className="footer__row">
                                <div className="footer__text">2022 &copy;</div>
                            </div>
                        </div>
                    </footer>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;

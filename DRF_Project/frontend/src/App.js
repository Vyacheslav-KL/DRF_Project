import React from 'react';
import './styles/App.css';
import UserList from './components/user.js'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
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
                <div className='content'>
                    <div className='container'>
                        <h1>menu</h1>

                    </div>
                    <div className='container'>
                        <UserList users={this.state.users} />
                    </div>
                </div>
                <footer className="footer">
                    <div className="container">
                        <div className="footer__row">
                            <div className="footer__text">2022 &copy;</div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default App;

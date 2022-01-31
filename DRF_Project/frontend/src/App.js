import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from 'axios'
import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'
import Footer from './components/Footer.js'
import Navbar from './components/Menu.js'
import UserList from './components/User.js'
import { ProjectList, ProjectDetail } from './components/Project.js'
import ToDoList from './components/ToDo.js'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';



const DOMAIN = 'http://127.0.0.1:8000'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarItems: [
                { name: 'Users', href: '/' },
                { name: 'Projects', href: '/projects' },
                { name: 'TODOs', href: '/todos' },
            ],
            users: [],
            projects: [],
            project: {},
            todos: [],
            'token': ''
        }

    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout () {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }

    get_token(username, password) {
        axios.post(get_url('/api-token-auth/'), {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Wrong login or password'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token' + this.state.token
        }
    }

    render() {
        return (
            <Router>
                <header>
                    <Navbar navbarItems={this.state.navbarItems} />                  
                </header>
                <br/>
                <li>
                    {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                </li>
                <main role="main" className="flex-shrink-0">
                    <div className="container">
                        <Switch>
                            <Route exact path='/'>
                                <UserList users={this.state.users} />
                            </Route>
                            <Route exact path='/projects'>
                                <ProjectList items={this.state.projects} />
                            </Route>
                            <Route exact path='/todos'>
                                <ToDoList items={this.state.todos} />
                            </Route>
                            
                            <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                            <Route path="/project/:id" children={<ProjectDetail getProject={(id) => this.getProject(id)} item={this.state.project} />} />
                        </Switch>
                    </div>
                </main>

                <Footer />
            </Router>


        )
    }

    getProject(id) {
        console.log('call')
        console.log(get_url(`/api/projects/${id}`))
        axios.get(get_url(`/api/projects/${id}`))
            .then(response => {
                console.log(response.data)
                this.setState({ project: response.data })
            }).catch(error => console.log(error))
    }



    load_data() {
        const headers = this.get_headers()
        axios.get(get_url('/api/users/'), {headers})
            .then(response => {
                //console.log(response.data)
                this.setState({ users: response.data.results })
            }).catch(error => console.log(error))

        axios.get(get_url('/api/projects/'), {headers})
            .then(response => {
                //console.log(response.data)
                this.setState({ projects: response.data.results })
            }).catch(error => console.log(error))

        axios.get(get_url('/api/todos/'), {headers})
            .then(response => {
                //console.log(response.data)
                this.setState({ todos: response.data.results })
            }).catch(error => console.log(error))

    }

    componentDidMount() {
        this.get_token_from_storage()
    }
}


export default App;

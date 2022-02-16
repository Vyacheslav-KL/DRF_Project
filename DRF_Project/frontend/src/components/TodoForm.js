import React from "react";


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', user: props.users.id}
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.name, this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className="form-group">
                <lable for="name">name</lable>
                <input type="text" className="form-control" name="name"
                value={this.state.name} onChange={(event) => this.handleChange(event)} />
            </div>
            <div className="form-group">
                <label for="user">user</label>
                <select name="user" className="form-control"
                    onChange={(event) => this.handleChange(event)}>
                    {this.props.users.map((item) => <option value={item.id}>{item.name}</option>)}
                </select>
            </div>
            <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default TodoForm
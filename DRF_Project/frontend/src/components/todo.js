import React from 'react'


const TodoItem = ({ todo }) => {
    return (
        <tr>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.created}
            </td>
            <td>
                {todo.user}
            </td>
        </tr>
    )
}

const TodoList = ({ todos }) => {
    return (
        <table>
            <th>
                Text
            </th>
            <th>
                Date
            </th>
            <th>
                User
            </th>
            {/* {todos.map((todo) => <TodoItem todo={todo} />)} */}
        </table>
    )
}


export default TodoList
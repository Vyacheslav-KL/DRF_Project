import React from 'react'


const ProjectItem = ({ project }) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.users}
            </td>
            <td>
                {project.repository}
            </td>
        </tr>
    )
}

const ProjectList = ({ projects }) => {
    return (
        <table>
            <th>
                Project
            </th>
            <th>
                Users
            </th>
            <th>
                Repository
            </th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}


export default ProjectList
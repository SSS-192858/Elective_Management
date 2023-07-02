import React from 'react'
import { setInstructorInStorage } from '../services/localStorage_services'
import { Link } from "react-router-dom";

const SubjectInstructorAssignItem = ({instructor,subject}) => {
    const handleClick = () => {
        // setBookInStorage(subject);
        setInstructorInStorage(instructor)
    }

    return (
        <div className = "book" onClick = { handleClick } >
        <Link to = "/assignInstructorConfirmation" >
            <p > { instructor.id } </p> 
            <p> { instructor.instructor_name} </p> 
            <p> { instructor.email } </p> 
            <p > { instructor.phone } </p> 
        </Link> 
        </div>
  )
}

export default SubjectInstructorAssignItem



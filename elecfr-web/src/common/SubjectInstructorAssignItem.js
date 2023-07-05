import React from 'react'
import { setInstructorInStorage } from '../services/localStorage_services'
import { Link } from "react-router-dom";

const SubjectInstructorAssignItem = ({instructor,subject}) => {
    const handleClick = () => {
        // setBookInStorage(subject);
        setInstructorInStorage(instructor)
    }

    return (
        <a href="/assignInstructorConfirmation">
        <div className="card1" onClick={handleClick}>
            <div className="card-body">
                <h1>{instructor.instructor_name}</h1>
                <br />
                <h6>Email- {instructor.email}</h6>
                <h6>Phone- {instructor.phone}</h6>
            </div>
        </div>
    </a>
  )
}

export default SubjectInstructorAssignItem



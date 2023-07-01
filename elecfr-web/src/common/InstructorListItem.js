import React from "react";
import { Link } from "react-router-dom";
import { setInstructorInStorage } from "../services/localStorage_services";

const InstructorListItem = ({ instructor }) => {

    const handleClick = () => {
        setInstructorInStorage(instructor);
    }

    return ( 
        <div className = "book" onClick = { handleClick } >
            <Link to = "/instructorDetail" >
                <p > { instructor.id } </p> 
                <p> { instructor.instructor_name} </p> 
                <p> { instructor.email } </p> 
                <p > { instructor.phone } </p> 
            </Link> 
        </div>
    )
}

export default InstructorListItem;
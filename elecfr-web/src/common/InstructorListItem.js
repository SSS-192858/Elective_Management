import React from "react";
import { Link } from "react-router-dom";
import { setInstructorInStorage } from "../services/localStorage_services";

const InstructorListItem = ({ instructor }) => {

    const handleClick = () => {
        setInstructorInStorage(instructor);
    }

    return ( 
        <div className = "book" onClick = { handleClick } >
            <Link to = "/studentDetail" >
                <p > { student.id } </p> 
                <p> { student.studentName } </p> 
                <p> { student.email } </p> 
                <p > { student.phone } </p> 
            </Link> 
        </div>
    )
}

export default InstructorListItem;
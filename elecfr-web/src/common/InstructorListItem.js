import React from "react";
import { Link } from "react-router-dom";
import { setInstructorInStorage } from "../services/localStorage_services";

const InstructorListItem = ({ instructor }) => {

    const handleClick = () => {
        setInstructorInStorage(instructor);
    }

    return ( 
        <a href="/instructorDetail">
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

export default InstructorListItem;
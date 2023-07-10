import React from "react";
import { setSubjectInStorage } from "../services/localStorage_services"
import "bootstrap/dist/css/bootstrap.min.css";

//list item to show the subject details
const SubjectListItem = ({subject}) => {

    //when clicked, set the subject in storage
    const handleClick = () => {
        setSubjectInStorage(subject);
    }

    //component
    return (
        <a href="/moreInfo">
            <div className="card1" onClick={handleClick}>
                <div className="card-body">
                        <h1>{subject.subjectName}</h1>
                        <br />
                        {subject.instructor ? <h4>Instructor: {subject.instructor.instructor_name}</h4>
                        : null}
                        <p>{subject.subjectDesc}</p>
                </div>
            </div>
        </a>
    )
}
export default SubjectListItem;
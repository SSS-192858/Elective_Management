import React from "react";
import { setSubjectInStorage } from "../services/localStorage_services"
import "bootstrap/dist/css/bootstrap.min.css";

const SubjectListItem = ({subject}) => {

    const handleClick = () => {
        setBookInStorage(subject);
    }

    return (
        <a href="/moreInfo">
            <div class="card" onClick={handleClick}>
                <div class="card-body">
                        <h1>{subject.subjectCode}. {subject.subjectName}</h1>
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
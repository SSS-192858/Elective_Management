import React from 'react'
import { Link } from "react-router-dom";
import { setSubjectStudentInStorage } from '../services/localStorage_services';

export const SubjectStudentListItem = ({subjectStudent}) => {
  
    const handleClick=()=>{
        setSubjectStudentInStorage(subjectStudent);
    }

    return (
    <div className="book" onClick={handleClick}>
    <Link to="/studentSubjectDetail">
        <p> Subject Details :</p>
        <p>{request.subject.subjectCode}</p>
        <p>{request.subject.subjectName}</p>
        <p>{request.subject.subjectDesc}</p>
        

        <p>
            Student Details :
        </p>

        <p>{request.student.id}</p>
        <p>{request.student.studentName}</p>

        <p>
            Start Date : {request.startDate}
        </p>
        <p>
            End Date : {request.endDate}
        </p>
    </Link>
</div>
  )
}

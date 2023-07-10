import React from 'react'
import { setSubjectStudentInStorage } from '../services/localStorage_services';
import dateFormat from 'dateformat';

//list item to show the subject student records
export const SubjectStudentListItem = ({subjectStudent}) => {

    //when clicked, set it in storage, and show details
    const handleClick=()=>{
        setSubjectStudentInStorage(subjectStudent);
    }

    //component
    return (
        <a href="/studentSubjectDetail">
        <div className="card1" onClick={handleClick}>
            <div className="card-body">
                <h3>Subject- {subjectStudent.subject.subjectName}</h3>
                <h3>Student- {subjectStudent.student.studentName}</h3>
                <br/>
                <p>
                    From - {dateFormat(subjectStudent.startDate, "fullDate")}
                </p>
                <p>
                    To - {dateFormat(subjectStudent.endDate, "fullDate")}
                </p>
            </div>
        </div>
        </a>
  )
}

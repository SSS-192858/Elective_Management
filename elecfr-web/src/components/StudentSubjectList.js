import React, {useState} from "react";
import { useEffect } from "react";
import { SubjectStudentListItem } from "../common/SubjectStudentListItem";
import { getSubjectFromStorage, getStudentFromStorage, getInstructorFromStorage} from "../services/localStorage_services";
import {getSubjectStudents, getSubjectStudentsByStudentId, getSubjectStudentByInstructorId, getSubjectStudentsBySubjectCode, getForInstructorAndStudent} from "../services/user_services"

const StudentSubjectList = ({choice}) => {
    const [studentSubjects, setStudentSubjects] = useState([]);
    var subject = null;
    var student = null;
    var instructor = null;

    const getStudentSubjects = async() => {
        if (choice === 1){
            const list = await getSubjectStudents();
            setStudentSubjects(list);
        }else if (choice === 2){
            subject = getSubjectFromStorage();
            const list = await getSubjectStudentsBySubjectCode(subject.subjectCode);
            setStudentSubjects(list);
        }else if (choice === 3){
            student = getStudentFromStorage();
            const list = await getSubjectStudentsByStudentId(student.id);
            setStudentSubjects(list);
        }else if (choice === 4){
            instructor = getInstructorFromStorage();
            const list = await getSubjectStudentByInstructorId(instructor.id);
            setStudentSubjects(list);
        }else if (choice === 5){
            instructor = getInstructorFromStorage();
            student = getStudentFromStorage();
            const list = await getForInstructorAndStudent(student);
            setStudentSubjects(list)
        }
    }

    useEffect(() => {
        getStudentSubjects();
    }, [])

    return (

    <>
    { (studentSubjects.length === 0) ? <div className='container banner'>
            <header className='jumbotron banner'> 
                <h5>Nothing to show</h5>
            </header>
        </div>
        : null
    }
    <div className='container'>
        <div className='row'>
        {studentSubjects.map((data) => (
            <div id="space" key= {data.slno} className="col-lg-4 col-sm-12 col-md-6"><SubjectStudentListItem subjectStudent={data}/></div>
        ))}
        </div>
    </div>
    </>
    )
}

export default StudentSubjectList;
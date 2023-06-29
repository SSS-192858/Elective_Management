import React, {useState} from "react";
import { getSubjectStudents, getSubjectStudentsByStudentId, getSubjectStudentByInstructorId, getSubjectStudentsBySubjectCode } from "../services/request_services";
import { useEffect } from "react";
import RequestListItem from "../common/RequestListItem";
import { getSubjectFromStorage, getStudentFromStorage, getInstructorFromStorage} from "../services/localStorageHandler";

const RequestList = ({choice}) => {
    const [requests, setRequests] = useState([]);
    var subject = null;
    var student = null;

    const getRequests = async() => {
        if (choice === 1){
            const list = await getSubjectStudents();
            setRequests(list);
        }else if (choice === 2){
            subject = getSubjectFromStorage();
            const list = await getSubjectStudentsBySubjectCode(subject.subjectCode);
            setRequests(list);
        }else if (choice === 3){
            student = getStudentFromStorage();
            const list = await getSubjectStudentsByStudentId(student.id);
            setRequests(list);
        }else if (choice === 4){
            instructor = getInstructorFromStorage();
            const list = await getSubjectStudentByInstructorId(instructor.id);
            setRequests(list);
        }
    }

    useEffect(() => {
        getRequests();
    }, [])

    return (
    <>
        { (requests.length === 0) ? <div className='container'>
            <header className='jumbotron'> 
                Nothing to show
            </header>
        </div>
            : null
        }
        <ul id="remove">
            {requests.map((data) => (
                <li id="space" key= {data.slno}><RequestListItem request={data}/></li>
            ))}
        </ul>
    </>
    )
}

export default RequestList;
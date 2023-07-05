import React, {useState} from "react";
import { useEffect } from "react";
import RequestListItem from "../common/RequestListItem";
import { getSubjectFromStorage, getStudentFromStorage, getInstructorFromStorage} from "../services/localStorage_services";
import { getAllRequests, getRequestByStudentId, getRequestByInstructorId, getRequestBySubjectCode } from "../services/user_services";

const RequestList = ({choice}) => {
    const [requests, setRequests] = useState([]);
    var subject = null;
    var student = null;
    var instructor = null;

    const getRequests = async() => {
        if (choice === 1){
            const list = await getAllRequests();
            setRequests(list);
        }else if (choice === 2){
            subject = getSubjectFromStorage();
            const list = await getRequestBySubjectCode(subject.subjectCode);
            setRequests(list);
        }else if (choice === 3){
            student = getStudentFromStorage();
            const list = await getRequestByStudentId(student.id);
            setRequests(list);
        }else if (choice === 4){
            instructor = getInstructorFromStorage();
            const list = await getRequestByInstructorId(instructor.id);
            setRequests(list);
        }
    }

    useEffect(() => {
        getRequests();
    }, [])

    return (
        <>
            { (requests.length === 0) ? <div className='container banner'>
                    <header className='jumbotron banner'> 
                        <h5>Nothing to show</h5>
                    </header>
                </div>
                : null
            }
            <div className='container'>
                <div className='row'>
                {requests.map((data) => (
                    <div id="space" key= {data.slno} className="col-lg-4 col-sm-12 col-md-6"><RequestListItem request={data}/></div>
                ))}
                </div>
            </div>
        </>
    )
}

export default RequestList;
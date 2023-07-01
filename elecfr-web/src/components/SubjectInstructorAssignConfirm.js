import { getInstructorFromStorage, getSubjectFromStorage } from "../services/localStorage_services";
import { useState,useNavigate } from "react";
import { assignInstructortoSubject } from "../services/user_services";
const SubjectAssignInstructorConfirmation = () => {

    const [subject, setSubject] = useState(() => {
        const temp = getSubjectFromStorage();
        return temp;
    })

    const [instructor, setInstructor] = useState(() => {
        const temp = getInstructorFromStorage();
        return temp;
    })
    getDriverFromStorage();
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/assignInstructor");
    }

    const handleAssign = () => {
        // assignDriverToCab(cab.reg_no, driver);
        assignInstructortoSubject(subject.subjectCode,instructor);
        navigate("/subjects")
    }

    return (
        <>
            <p>{subject.subjectCode}</p>
            <p>{subject.subjectName}</p>
            <p>{subject.subjectDesc}</p>
            <p>{instructor.Id}</p>
            <p>{instructor.instructor_name}</p>
            <p>{instructor.email}</p>
            <p>{instructor.phone}</p>
            
            <button className="btn btn-primary btn-block" onClick={handleCancel}>
                Cancel
            </button>

            <button className="btn btn-primary btn-block" onClick={handleAssign}>
                Assign
            </button>
        </>
    )
}

export default SubjectAssignInstructorConfirmation;
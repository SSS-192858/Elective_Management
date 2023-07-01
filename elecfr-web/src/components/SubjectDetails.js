import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteSubject } from "../services/user_services";
import { useNavigate } from "react-router-dom";
import { getSubjectFromStorage, removeSubjectFromStorage, setSubjectInStorage, getInstructorFromStorage} from "../services/localStorageHandler";

const SubjectDetails = ({isStudent,isAdmin,isInstructor}) => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [subject, setSubject] = useState(() => {
        const temp = getSubjectFromStorage();
        return temp;
    })

    const [instructor, setInstructor] = useState(() => {
        const temp = getInstructorFromStorage();
        return temp;
    })
    const handleToClose = () => {
        deleteSubject(subject.subjectCode);
        removeSubjectFromStorage();
        setOpen(false);
        navigate("/subjects");
    };

    const handleCancel = ()=>{
        setOpen(false);
    }

    const navFunc = () => {
        navigate("/subjectUpdate")
    }

    const handleRequest = ()=>{
        setSubjectInStorage(subject);
        console.log(book);
        navigate("/subjectRequest")
    }

    const seeRequestsForSubject = () => {
        navigate("/requestsForSubject");
    }

    const seeStudentSubjectsForSubject = () => {
        navigate("/studentSubjectBySubject");
    }

    const seeInstructor = () => {
        navigate("/instructorForSubject");
    }

    const assignInstructor = ()=>{
        setSubjectInStorage(subject);
        navigate("/assignInstructor")
    }

    return (
        <div>
            <p>{subject.subjectCode}</p>
            <p>{subject.subjectName}</p>
            <p>{subject.instructor.instructor_name}</p>
            <p>{subject.subjectDesc}</p>

            {isStudent &&
            <button onClick={handleRequest} className="btn btn-primary btn-block">
                Request Course
            </button>
            }

            {isAdmin &&
            <>
            <button onClick={seeRequestsForSubject} className="btn btn-primary btn-block">
                See all requests for this subject
            </button>

            <button onClick={assignInstructor} className="btn btn-primary btn-block">
                Assign Instructor for this course
            </button>

            <button onClick={navFunc} className="btn btn-primary btn-block">
                Update Subject
            </button>

            <button onClick={()=>{setOpen(true)}} className="btn btn-primary btn-block">
                Delete Subject
            </button>

            <button onClick={seeStudentSubjectsForSubject} className="btn btn-primary btn-block">
                See all records of students taking this course
            </button>

            </>
            } 

            {(isInstructor && instructor.id === subject.instructor.id) && 

            <>
            <button onClick={seeRequestsForSubject} className="btn btn-primary btn-block">
                See all requests for this subject
            </button>

            <button onClick={navFunc} className="btn btn-primary btn-block">
                Update Subject
            </button>

            <button onClick={seeStudentSubjectsForSubject} className="btn btn-primary btn-block">
                See all records of students taking this course
            </button>
            </>
            } 

            <button onClick={seeInstructor} className="btn btn-primary btn-block"> 
                See instructor details for this course
            </button>
            
            
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Book"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the subject?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="primary" autoFocus>
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                        Delete
                    </button>
                    
                </DialogActions>
            </Dialog>
            
        </div>
    )
}

export default SubjectDetails;
import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteSubject, removeInstructorFromSubject } from "../services/user_services";
import { useNavigate } from "react-router-dom";
import { getSubjectFromStorage, removeSubjectFromStorage, setSubjectInStorage, getInstructorFromStorage} from "../services/localStorage_services";
import { setInstructorInStorage } from "../services/localStorage_services";

const SubjectDetails = ({isStudent,isAdmin,isInstructor}) => {

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

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
        setOpen1(false);
    }

    const navFunc = () => {
        navigate("/subjectUpdate")
    }

    const handleRequest = ()=>{
        setSubjectInStorage(subject);
        navigate("/subjectRequest")
    }

    const seeRequestsForSubject = () => {
        navigate("/requestsForSubject");
    }

    const seeStudentSubjectsForSubject = () => {
        navigate("/studentSubjectBySubject");
    }

    const seeInstructor = () => {
        setInstructorInStorage(subject.instructor)
        navigate("/instructorDetail");
    }

    const assignInstructor = ()=>{
        setSubjectInStorage(subject);
        navigate("/assignInstructor")
    }

    const openDialog = () => {
        setOpen1(true);
    }

    const handleToClose1 = () => {
        removeInstructorFromSubject(subject.subjectCode);
        setOpen1(false);
        navigate("/subjects");
    }

    return (
        <div className="container">
        <div className="card">
            <div className="card-body">
                <h1 className="card-title">
                    {subject.subjectName}
                </h1>
                <div className="card-text">
                    <p>Subject Code - {subject.subjectCode}</p>
                    <p>{subject.subjectDesc}</p>
                    <br />

                    {subject.instructor ?
                        <>
                            <h4>
                                Instructor Details :
                            </h4>
                            <p></p>
                            <p>Instructor Name : {subject.instructor.instructor_name}</p>
                            <p>Email : {subject.instructor.email}</p>
                            <p>Phone : {subject.instructor.phone}</p>
                        </>
                    : null }
                </div>

                {isStudent &&
                    <button onClick={handleRequest} className="btn btn-info">
                        Request Course
                    </button>
                    }

                    {isAdmin &&
                    <>
                    <button onClick={seeRequestsForSubject} className="btn btn-info">
                        See all requests for this subject
                    </button>

                    <button onClick={assignInstructor} className="btn btn-success">
                        Assign Instructor for this course
                    </button>

                    <button onClick={navFunc} className="btn btn-warning">
                        Update Subject
                    </button>

                    <button onClick={()=>{setOpen(true)}} className="btn btn-danger">
                        Delete Subject
                    </button>

                    <button onClick={seeStudentSubjectsForSubject} className="btn btn-info">
                        See all records of students taking this course
                    </button>

                    </>
                    } 

                    {(isInstructor && subject.instructor && instructor.id === subject.instructor.id) && 

                    <>
                    <button onClick={seeRequestsForSubject} className="btn btn-info">
                        See all requests for this subject
                    </button>

                    <button onClick={navFunc} className="btn btn-danger">
                        Update Subject
                    </button>

                    <button onClick={seeStudentSubjectsForSubject} className="btn btn-info">
                        See all records of students taking this course
                    </button>
                    </>
                    } 

                    {(subject.instructor) ? 
                        <>
                        <button onClick={seeInstructor} className="btn btn-info"> 
                            See instructor details for this course
                        </button>
                        {isAdmin &&
                            <button onClick={openDialog} className="btn btn-danger"> 
                                Remove Instructor for this course
                            </button>
                        }
                        </>
                        : null
                    }
            </div>
        </div>

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

        <Dialog open={open1} onClose={handleToClose1}>
            <DialogTitle>{"Remove Instructor for Subject"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to remove the instructor for this subject?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button onClick={handleCancel} color="primary" autoFocus>
                    Cancel
                </button>
                <button onClick={handleToClose1}
                    color="primary" autoFocus>
                    Remove
                </button>
                
            </DialogActions>
        </Dialog>
        </div>
    )
}

export default SubjectDetails;
import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteSubjectStudent } from "../services/user_services";
import { useNavigate } from "react-router-dom";
import { getSubjectStudentFromStorage } from "../services/localStorageHandler";

const SubjectStudentDetails = ({isAdmin}) => {

    const [subjectStudent, setSubjectStudent] = useState(() => {
        const temp = getSubjectStudentFromStorage();
        return temp;
    })

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleToClose = () => {
        deleteSubjectStudent(subjectStudent.slno);
        setOpen(false);
        navigate("/subjectStudents");
    };

    const handleCancel = ()=>{
        setOpen(false);
    }

    return (
        <div>
            <div className="book">
                <p>{subjectStudent.slno}</p>
                <p>
                    Subject Details :
                </p>
                <p>{subjectStudent.subject.subjectCode}</p>
                <p>{subjectStudent.subject.subjectName}</p>
                <p>{subjectStudent.subject.subjectDesc}</p>
                <p>{subjectStudent.subject.instructor.instructor_name}</p>

                <p>
                    Student Details :
                </p>

                <p>{subjectStudent.student.id}</p>
                <p>{subjectStudent.student.studentName}</p>
                <p>{subjectStudent.student.email}</p>
                <p>{subjectStudent.student.phone}</p>

                <p>
                    Start Date : {subjectStudent.startDate}
                </p>
                <p>
                    End Date : {subjectStudent.endDate}
                </p>
            {isAdmin && 
            <button onClick={()=>{setOpen(true)}} className="btn btn-primary btn-block" type="submit">
                Delete Record
            </button>
            }   
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete BookStudent"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this record?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="primary" autoFocus>
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                        Delete Record
                    </button>
                </DialogActions>
            </Dialog>
            </div>
        </div>
    )
}

export default SubjectStudentDetails;
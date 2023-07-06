import { getInstructorFromStorage, getSubjectFromStorage } from "../services/localStorage_services";
import { useState } from "react";
import { assignInstructortoSubject } from "../services/user_services";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";

const SubjectAssignInstructorConfirmation = () => {

    const [subject, setSubject] = useState(() => {
        const temp = getSubjectFromStorage();
        return temp;
    })

    const [open, setOpen] = useState(false);

    const [instructor, setInstructor] = useState(() => {
        const temp = getInstructorFromStorage();
        return temp;
    })

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/assignInstructor");
    }

    const handleAssign = () => {
        // assignDriverToCab(cab.reg_no, driver);
        assignInstructortoSubject(subject.subjectCode,instructor);
        setOpen(true);
    }

    const handleToClose = () => {
        setOpen(false);
        navigate("/subjects");
    }

    return (
        <>
        <div className="container">
        <div className="card">
            <div className="card-body">
            <h1>Confirmation Page</h1>
            <h3>
                Subject Details - 
            </h3>
            <p>Subject code - {subject.subjectCode}</p>
            <p>Subject name - {subject.subjectName}</p>
            <p>Subject description - {subject.subjectDesc}</p>

            <h3>
                Instructor Details
            </h3>
            <p>Instructor id - {instructor.Id}</p>
            <p>Instructor name - {instructor.instructor_name}</p>
            <p>Instructor email - {instructor.email}</p>
            <p>Instructor phone - {instructor.phone}</p>
            
            <button className="btn btn-danger" onClick={handleCancel}>
                Cancel
            </button>

            <button className="btn btn-success" onClick={handleAssign}>
                Assign
            </button>

            </div>
            

            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Assignment successful"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Instructor was assigned successfully, kindly click on the button to close the dialog box.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                        Close
                    </button>
                </DialogActions>
            </Dialog>
            </div></div>
        </>
    )
}

export default SubjectAssignInstructorConfirmation;
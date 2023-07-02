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
        </>
    )
}

export default SubjectAssignInstructorConfirmation;
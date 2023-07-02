import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import deleteInstructor from "../services/user_services"
import { useNavigate } from "react-router-dom";
import { setInstructorInStorage, removeInstructorFromStorage, getPersonalInstructorFromStorage }from "../services/localStorageHandler";

const PersonalInstructorDetails = ({isInstructor, isStudent, isAdmin}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [instructor, setInstructor] = useState(() => {
        const temp = getPersonalInstructorFromStorage();
        setInstructorInStorage(temp);
        return temp;
    })

    const handleToClose = () => {
        deleteInstructor(instructor.id);
        setOpen(false);
        removeInstructorFromStorage();
        navigate("/instructors")
    };

    const handleCancel = ()=>{
        setOpen(false);
    }

    const navFunc1 = () => {
        navigate("/instructorUpdate");
    } 

    const navFunc2 = () => {
        navigate("/requestsForInstructor");
    }

    const navFunc3 = () => {
        navigate("/subjectsByInstructor");
    }

    const navFunc4 = () => {
        navigate("/studentSubjectByInstructor")
    }

    return (
        <div>
            <p>{instructor.id}</p>
            <p>{instructor.instructor_name}</p>
            <p>{instructor.email}</p>
            <p>{instructor.phone}</p>

            {((isInstructor) || isAdmin) && (
                <>
                <button onClick={navFunc1} className="btn btn-primary btn-block" type="submit">
                Update Info
                </button>

                <button onClick={navFunc2} className="btn btn-primary btn-block" type="submit">
                See all subject requests
                </button>
                </>
            )}

            <button onClick={navFunc3} className="btn btn-primary btn-block" type="submit">
                See all subjects taught
            </button>

            <button onClick={navFunc4} className="btn btn-primary btn-block" type="submit">
                See all children enrolled in courses taught by this instructor
            </button>

            {isAdmin && (
                <button onClick={()=>{setOpen(true)}} className="btn btn-primary btn-block" type="submit">
                    Delete Instructor
                </button>
            )}

            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Student"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {instructor.instructor_name}?
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

export default PersonalInstructorDetails;
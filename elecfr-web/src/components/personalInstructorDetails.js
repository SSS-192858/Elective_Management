import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteInstructor } from "../services/user_services"
import { useNavigate } from "react-router-dom";
import { setInstructorInStorage, removeInstructorFromStorage, getPersonalInstructorFromStorage }from "../services/localStorage_services";

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
        <div className="container">
        <div className="card">
            <div className="card-body">
                <h1 className="card-title">
                    Instructor Name - {instructor.instructor_name}
                </h1>
                <div className="card-text">
                    <p>Instructor Email - {instructor.email}</p>
                    <p>Instructor Phone - {instructor.phone}</p>
                </div>

                    {(isInstructor || isAdmin) && (
                        <>
                        <button onClick={navFunc1} className="btn btn-warning" type="submit">
                        Update Info
                        </button>

                        <button onClick={navFunc2} className="btn btn-success" type="submit">
                        See all subject requests
                        </button>
                        </>
                    )}

                    <button onClick={navFunc3} className="btn btn-success" type="submit">
                        See all subjects taught
                    </button>

                    {(isAdmin || isInstructor) && 
                    <button onClick={navFunc4} className="btn btn-info" type="submit">
                        See all children enrolled in courses taught by this instructor
                    </button>
                    }
                    

                    {isAdmin && (
                        <button onClick={()=>{setOpen(true)}} className="btn btn-danger" type="submit">
                            Delete Instructor
                        </button>
                    )}
                    </div>
                </div>


        <Dialog open={open} onClose={handleToClose}>
            <DialogTitle>{"Delete Instructor"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete {instructor.instructor_name}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button onClick={handleCancel} color="light" autoFocus>
                    Cancel
                </button>
                <button onClick={handleToClose}
                    color="warning" autoFocus>
                    Delete
                </button>
                
            </DialogActions>
        </Dialog>
        </div>
    )
}

export default PersonalInstructorDetails;
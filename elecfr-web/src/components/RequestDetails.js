import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteRequest , accept } from "../services/user_services";
import { useNavigate } from "react-router-dom";
import { getRequestFromStorage } from "../services/localStorageHandler";

const RequestDetails = ({isStudent,isAdmin,isInstructor}) => {

    const [open, setOpen] = useState(false);
    const [acceptOpen, setAcceptOpen] = useState(false);
    const navigate = useNavigate();
    
    const [request, setRequest] = useState(() => {
        const temp = getRequestFromStorage();
        return temp;
    })

    const handleToClose = () => {
        deleteRequest(request.slno);
        setOpen(false);
        if(isAdmin){navigate("/allRequests")}
        else if(isStudent){navigate("/requestsForStudent")}
        else if(isInstructor){navigate("/requestsforInstructor")}
    };

    const handleCancel = ()=>{
        setOpen(false);
    }

    const handleCancelAccept = () => {
        setAcceptOpen(false);
    }

    const handleAccept = async() => {
        accept(request).then(
            response => {
                setAcceptOpen(false);
                navigate("/allRequests")
            }
        );
    }

    return (
        <div>
            <p>{request.slno}</p>
            <p>{request.student.id}</p>
            <p>{request.student.studentName}</p>
            <p>{request.student.email}</p>
            <p>{request.student.phone}</p>
            <p>{request.subject.subjectCode}</p>
            <p>{request.subject.subjectName}</p>
            <p>{request.subject.instructor.instructor_name}</p>
            <p>{request.startDate}</p>
            <p>{request.endDate}</p>

            {isAdmin &&
            <button onClick={()=>{setAcceptOpen(true)}} className="btn btn-primary btn-block" type="submit">
                Accept
            </button>
            }
            <button onClick={()=>{setOpen(true)}} className="btn btn-primary btn-block" type="submit" >
                Delete
            </button>
            {message==="" ? (
                <Dialog open={acceptOpen} onClose={handleAccept}>
                    <DialogTitle>{"Accept Request"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleCancelAccept} color="primary" autoFocus>
                            Cancel
                        </button>
                        <button onClick={handleAccept}
                            color="primary" autoFocus>
                            Accept
                        </button>
                        
                    </DialogActions>
                </Dialog>): null  
            }    
            
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Request"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the request?
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

export default RequestDetails;
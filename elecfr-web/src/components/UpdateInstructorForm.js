import React, { useState} from "react";
import { updateInstructor } from "../services/user_services";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useInstructorUpdateFormValidator } from "../validators/InstructorUpdateValidator";
import { getInstructorFromStorage, setInstructorInStorage } from "../services/localStorage_services";

const UpdateInstructor = () => {

    const [open, setOpen] = React.useState(false);
    const [instructor, setInstructor] = useState(() => {
        const temp = getInstructorFromStorage();
        return temp;
    })

    const [form, setForm] = useState({
        instructor_name: instructor.instructor_name,
        email: instructor.email,
        phone: instructor.phone
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const {errors, validateForm} = useInstructorUpdateFormValidator(form)

    const handleClickToOpen = () => {
        const temp = {id: instructor.id, instructor_name: form.instructor_name, email: form.email, phone: form.phone}
        setInstructorInStorage(temp);
        setOpen(true);
    };
 
    const handleToClose = () => {
        setOpen(false);
        navigate("/InstructorDetail")
    };

    const onUpdateField = e => {
        const nextFormState = {
          ...form,
          [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
    };

    const onSubmitForm = e => {
        setMessage("")
        e.preventDefault();    
        const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
        if (!isValid) return;
        updateInstructor(instructor.id, form.instructor_name, form.email, form.phone).then(
            response => {
                handleClickToOpen()
            },
            error => {
                const resMessage = (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                setMessage(resMessage)
            }
        )
    };

    return (

        <div className="col-md-12">
            <div className="card card-container">
            <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
            />

            <form onSubmit={onSubmitForm}>

                    <div className="form-group">
                    <label htmlFor="instructor_name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="instructor_name"
                        aria-label="Instructor Name"
                        value={form.instructor_name}
                        onChange={onUpdateField}
                    />

                    {errors.instructor_name.dirty && errors.instructor_name.error ? (
                            <div className="alert alert-danger" role="alert">{errors.instructor_name.message}</div>
                            ) : null}
                    </div>

                    <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        aria-label="Email"
                        value={form.email}
                        onChange={onUpdateField}
                    />

                    {errors.email.dirty && errors.email.error ? (
                            <div className="alert alert-danger" role="alert">{errors.email.message}</div>
                            ) : null}
                    </div>

                    <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        aria-label="Phone"
                        value={form.phone}
                        onChange={onUpdateField}
                    />

                    {errors.phone.dirty && errors.phone.error ? (
                            <div className="alert alert-danger" role="alert">{errors.phone.message}</div>
                            ) : null}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Update details</button>
                    </div>

                    {message ? 
                        <div className="alert alert-danger" role="alert">{message}</div>
                        : null}
                </form>
            </div>

            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Update successful"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Instructor details have been updated successfully!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                        Close
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdateInstructor;
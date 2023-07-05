import React from "react";
import { Link } from "react-router-dom";
import { setRequestInStorage } from "../services/localStorage_services";

const RequestListItem = ({request}) => {

    const handleClick = () => {
        setRequestInStorage(request);
    }

    return (
        <a href="/requestDetails">
            <div className="card1" onClick={handleClick}>
                <div className="card-body">
                    <h3>Subject- {request.subject.subjectTitle}</h3>
                    <h3>Student- {request.student.studentName}</h3>
                    <br/>
                    <p>
                        From - {dateFormat(request.startDate, "fullDate")}
                    </p>
                    <p>
                        To - {dateFormat(request.endDate, "fullDate")}
                    </p>
                </div>
            </div>
        </a>
    )
}

export default RequestListItem;
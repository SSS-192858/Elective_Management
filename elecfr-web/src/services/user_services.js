import axios from "axios";
import authHeader from "./auth_header";

const API_URL = "http://localhost:8080/";

export const getStudentBoard = () => {
    return axios.get(API_URL + 'dummy_student', { headers: { Authorization: "Bearer " + authHeader() } });
}
export const getAdminBoard = () => {
    return axios.get(API_URL + 'dummy_admin', { headers: { Authorization: "Bearer " + authHeader() } });
}
export const getInstructorBoard = () => {
    return axios.get(API_URL + 'dummy_instructor', { headers: { Authorization: "Bearer " + authHeader() } });
}

export const saveSubject = async(subjectName, subjectDesc) => {
    var token = authHeader();
    await axios.post(API_URL + "subject/save", {
        subjectName,
        subjectDesc
    }, { headers: { Authorization: "Bearer " + token } });

    return "Subject Successfully Saved";
}

export const deleteSubject = async(subjectCode) => {
    var token = authHeader();
    await axios.delete(API_URL + `subject/delete/${subjectCode}`, { headers: { Authorization: "Bearer " + token } })
    return "Subject Successfully Deleted!";
}

export const updateSubject = async(subjectCode, subjectName, subjectDesc) => {
    var token = authHeader();

    await axios.put(API_URL + "subject/update", {
        subjectCode,
        subjectName,
        subjectDesc
    }, { headers: { Authorization: "Bearer " + token } });

    return "Subject Data updated successfully";
}

export const deleteStudent = async(studentId) => {
    await axios.delete(API_URL + `student/delete/${studentId}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return "Student Deleted Successfully";
}

export const updateStudent = async(id, studentName, email, phone) => {
    var token = authHeader();

    await axios.put(API_URL + "student/update", {
        id,
        studentName,
        email,
        phone
    }, { headers: { Authorization: "Bearer " + token } });

    return "Data saved successfully";
}

export const deleteInstructor = async(id) => {
    await axios.delete(API_URL + `instructor/delete/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return "Instructor Deleted Successfully";
}

export const updateInstructor = async(id, instructor_name, email, phone) => {
    var token = authHeader();

    await axios.put(API_URL + "instructor/update", {
        id,
        instructor_name,
        email,
        phone
    }, { headers: { Authorization: "Bearer " + token } });

    return "Data saved successfully";
}

export const getAllRequests = async() => {
    var token = authHeader();
    const responseList = await axios.get(API_URL + "request/getAll", { headers: { Authorization: "Bearer " + token } });
    return responseList.data;
}

export const getRequestByStudentId = async(id) => {
    var token = authHeader();
    const responseList = await axios.get(API_URL + `request/getbyStudent/${id}`, { headers: { Authorization: "Bearer " + token } });
    return responseList.data;
}

export const getRequestByInstructorId = async(id) => {
    var token = authHeader();
    const responseList = await axios.get(API_URL + `request/getbyInstructorId/${id}`, { headers: { Authorization: "Bearer " + token } });
    return responseList.data;
}

export const getRequestBySubjectCode = async(id) => {
    var token = authHeader();
    const responseList = await axios.get(API_URL + `request/getbySubjectId/${id}`, { headers: { Authorization: "Bearer " + token } });
    return responseList.data;
}

export const getRequestById = async(request_id) => {
    const response = await axios.get(API_URL + `request/getbyID/${request_id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const registerRequest = async(student, subject, startDate, endDate) => {
    await axios.post(API_URL + `request/save`, {
        student,
        subject,
        startDate,
        endDate
    }, { headers: { Authorization: "Bearer " + authHeader() } });

    return "Request Added Successfully";
}

export const deleteRequest = async(slno) => {
    const response = await axios.delete(API_URL + `request/delete/${slno}`, { headers: { Authorization: "Bearer " + authHeader() } });
    console.log("Request Deleted " + response.data);
}

export const accept = async(request) => {
    console.log(request);
    const response = await axios.post(API_URL + `studentSubject/accept`, {
        slno: request.slno,
        subject: request.subject,
        student: request.student,
        startDate: request.startDate,
        endDate: request.endDate
    }, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}


export const getSubjects = async() => {
    const subjects = await axios.get(API_URL + "subject/allSubjects", { headers: { Authorization: "Bearer " + authHeader() } });
    return subjects.data;
}

export const getSubjectByCode = async(subject_code) => {
    const response = await axios.get(API_URL + "subject/" + subject_code, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const getSubjectByInstructorId = async(id) => {
    const response = await axios.get(API_URL + "subject/getByInstructorId" + id, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const getStudentByUserId = async() => {
    var token = authHeader();
    const response = await axios.get(API_URL + "student/user/getStudent", { headers: { Authorization: "Bearer " + token } });
    return response.data;
}

export const getInstructorByUserId = async() => {
    var token = authHeader();
    const response = await axios.get(API_URL + "instructor/user/getInstructor", { headers: { Authorization: "Bearer " + token } });
    return response.data;
}

export const getStudents = async() => {
    const response = await axios.get(API_URL + `student/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const getInstructors = async() => {
    const response = await axios.get(API_URL + `instructor/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const getSubjectStudents = async() => {
    const response = await axios.get(API_URL + `studentSubject/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    console.log(response.data)
    return response.data;
}

export const getForInstructorAndStudent = async(student) => {
    const response = await axios.get(API_URL + `studentSubject/getForStudentAndInstructor/${student.id}`, {headers:{Authorization:"Bearer "+authHeader()}});
    return response.data;
}

export const getSubjectStudentsBySubjectCode = async(id) => {
    const response = await axios.get(API_URL + `studentSubject/getBySubject/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const getSubjectStudentsByStudentId = async(id) => {
    var token = authHeader();
    const response = await axios.get(API_URL + `studentSubject/getByStudent/${id}`, { headers: { Authorization: "Bearer " + token } });
    return response.data;
}

export const getSubjectStudentByInstructorId = async(id) => {
    var token = authHeader();
    const response = await axios.get(API_URL + `studentSubject/getByInstructor/${id}`, { headers: { Authorization: "Bearer " + token } });
    return response.data;
}

export const getSubjectStudentsById = async(id) => {
    const response = await axios.get(API_URL + `studentSubject/getbyID/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const deleteSubjectStudent = async(id) => {
    await axios.delete(API_URL + `studentSubject/delete/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
}

export const assignInstructortoSubject = async(id,instructor)=>{
    await axios.put(API_URL+"/subject/assignInstructor/"+id,{instructor},{headers:{Authorization:"Bearer "+authHeader()}});
}
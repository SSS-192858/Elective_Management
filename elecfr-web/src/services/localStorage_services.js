export const setSubjectInStorage = (subject) => {
    localStorage.setItem("subject", JSON.stringify(subject));
}

export const getSubjectFromStorage = () => {
    const subject = JSON.parse(localStorage.getItem("subject"));
    return subject;
}

export const removeSubjectFromStorage = () => {
    localStorage.removeItem("subject");
}

export const setStudentInStorage = (student) => {
    localStorage.setItem("student", JSON.stringify(student));
}

export const getStudentFromStorage = () => {
    const student = JSON.parse(localStorage.getItem("student"));
    return student;
}

export const removeStudentFromStorage = () => {
    localStorage.removeItem("student");
}

export const setInstructorInStorage = (student) => {
    localStorage.setItem("instructor", JSON.stringify(student));
}

export const getInstructorFromStorage = () => {
    const student = JSON.parse(localStorage.getItem("instructor"));
    return student;
}

export const removeInstructorFromStorage = () => {
    localStorage.removeItem("instructor");
}

export const setRequestInStorage = (request) => {
    localStorage.setItem("request", JSON.stringify(request));
}

export const getRequestFromStorage = () => {
    const request = JSON.parse(localStorage.getItem("request"));
    return request;
}

export const removeRequestFromStorage = () => {
    localStorage.removeItem("request");
}

export const setSubjectStudentInStorage = (subjectStudent) => {
    localStorage.setItem("subjectStudent", JSON.stringify(subjectStudent));
}

export const getSubjectStudentFromStorage = () => {
    const subjectStudent = JSON.parse(localStorage.getItem("subjectStudent"));
    return subjectStudent;
}

export const removeSubjectStudentFromStorage = async() => {
    localStorage.removeItem("subjectStudent");
}
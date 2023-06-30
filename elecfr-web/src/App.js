import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { getCurrentUser, logout } from './services/auth_services';
import { useEffect, useState } from 'react';
import LoginForm from './components/loginForm';
import Home from './components/home';
import BoardAdmin from "./components/BoardAdmin";
import BoardInstructor from "./components/BoardInstructor";
import BoardStudent from "./components/BoardStudent";
import SignupInstructor from "./components/SignupInstructor";
import SignupAdmin from "./components/SignupAdmin";
import SignupStudent from "./components/SignupStudent";
import SubjectDetails from "./components/SubjectDetails";
import SubjectsList from "./components/SubjectsList";
import SubjectSaveForm from "./components/SubjectSaveForm";
import SubjectUpdateForm from "./components/UpdateSubjectForm";
import SubjectRequestForm from "./components/SubjectRequestForm";
import UpdateStudent from "./components/UpdateStudentForm";
import UpdateInstructor from "./components/UpdateInstructorForm";
import StudentSubjectList from "./components/StudentSubjectList";
import SubjectStudentDetails from "./components/StudentSubjectDetails";
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetails";
import RequestDetails from "./components/RequestDetails";
import RequestList from "./components/RequestList";
import InstructorDetails from "./components/InstructorDetails";
import InstructorList from "./components/InstructorList";

function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const resolveLogin = () => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.user.roles[0].name === "ADMIN");
      setIsInstructor(user.user.roles[0].name === "INSTRUCTOR");
      setIsStudent(user.user.roles[0].name === "STUDENT");
    }
  };

  const Applogout = () => {
    logout();
    setCurrentUser(null);
    setIsAdmin(false);
    setIsInstructor(false);
    setIsStudent(false);
  }

  useEffect(() => {
    resolveLogin();
  }, []);
  
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Elective Management
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {isAdmin && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {isStudent && (
              <li className="nav-item">
                <Link to={"/student"} className="nav-link">
                  Student Board
                </Link>
              </li>
            )}
          

            {isInstructor&& (
              <li className="nav-item">
              <Link to={"/instructor"} className="nav-link">
                Instructor Board
              </Link>
            </li>
            )}
          
          </div>
            
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={Applogout}>
                  Log out
                </a>
              </li>

              {isAdmin && (
                <li>
                  <a href = "/registerAdmin" className="nav-link">
                    Register New Admin
                  </a>
                </li>
              )}

              {isAdmin && (
                <li>
                  <a href = "/registerInstructor" className="nav-link">
                    Register New Instructor
                  </a>
                </li>
              )}

              {isAdmin && (
                <li>
                  <a href = "/registerStudent" className="nav-link">
                    Register New Student
                  </a>
                </li>
              )}
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            {/* Common webpages */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm setCurrentUser = {setCurrentUser} setIsAdmin = {setIsAdmin} setIsStudent = {setIsStudent} setIsInstructor={setIsInstructor}/>} />
            <Route path="/registerStudent" element={<SignupStudent />} />
            <Route path="/registerAdmin" element={<SignupAdmin />} />
            <Route path="/registerInstructor" element={<SignupInstructor/>} />
            <Route path="/student" element={<BoardStudent/>} />
            <Route path="/admin" element={<BoardAdmin/>}/>
            <Route path="/instructor" element={<BoardInstructor/>}/>
            {/* Subject related webpages */}
            <Route path="/subjects" element={<SubjectsList choice={1}/>} />
            <Route path="/subjectsByInstructor" element={<SubjectsList choice={2}/>} />
            <Route path="/moreInfo" element={<SubjectDetails isAdmin={isAdmin} isInstructor={isInstructor} isStudent={isStudent}/>} />
            <Route path="/addSubject" element={<SubjectSaveForm/>} />
            <Route path="/subjectUpdate" element={<SubjectUpdateForm/>}/>
            <Route path="/subjectRequest" element={<SubjectRequestForm/>} />
            <Route path="/requestsForSubject" element={<RequestList choice={2}/>} />
            <Route path="/studentSubjectBySubject" element={<StudentSubjectList choice={2}/>} />
            <Route path="/instructorForSubject" element={<InstructorDetails isAdmin={isAdmin} isStudent={isStudent} isInstructor={isInstructor}/>} />
            {/* Student related webpages */}
            <Route path="/students" element={<StudentList/>}/>
            <Route path="/updateStudent" element={<UpdateStudent/>} />
            <Route path="/studentDetail" element={<StudentDetails isStudent={isStudent} isAdmin={isAdmin} isInstructor={isInstructor}/>}/>
            <Route path="/requestsForSubject" element={<RequestList choice={2}/>} />
            <Route path="/studentSubjectBySubject" element={<StudentSubjectList choice={2}/>} />
          </Routes>
        </div>
      </div>
  );
}

export default App;

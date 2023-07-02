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
import SubjectByInstructorAssign from "./components/SubjectInstructorAssign";
import SubjectAssignInstructorConfirmation from "./components/SubjectInstructorAssignConfirm";
import PersonalInstructorDetails from "./components/personalInstructorDetails";
import PersonalStudentDetails from "./components/PersonalStudentDetails";

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
              <>
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/addSubject"} className="nav-link">
                  Add a Subject
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/requests"} className="nav-link">
                  All Requests
                </Link>
              </li>

              </>
            )}

            {isStudent && (
              <li className="nav-item">
                <Link to={"/student"} className="nav-link">
                  Student Board
                </Link>
              </li>
            )}
          

            {isInstructor&& (
              <>
              <li className="nav-item">
              <Link to={"/instructor"} className="nav-link">
                Instructor Board
              </Link>
              </li>
              </>
            )}

              <li className="nav-item">
                <Link to={"/subjects"} className="nav-link">
                  Subjects
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/instructors"} className="nav-link">
                  Instructors
                </Link>
              </li>

              {(isAdmin || isInstructor) && 
              <>
                <li className="nav-item">
                  <Link to={"/students"} className="nav-link">
                    All students
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/studentSubjects"} className="nav-link">
                    All student enrollments
                  </Link>
                </li>
              </>
              }
          </div>
            
          {currentUser ? (
            <div className="navbar-nav ml-auto">

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

              {isStudent && (
                <>
                  <li className="nav-item">
                    <Link to={"/requestsForStudent"} className="nav-link">
                      Pending Requests
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/studentSubjectByStudent"} className="nav-link">
                      Subjects Enrolled
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/personalStudentDetail"} className="nav-link">
                      Profile
                    </Link>
                  </li>
                </>
              )}

              {isInstructor && (
                <>
                  <li className="nav-item">
                    <Link to={"/requestsForInstructor"} className="nav-link">
                      Pending Requests
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/studentSubjectByInstructor"} className="nav-link">
                      My students
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/subjectsForInstructor"} className="nav-link">
                      My Subjects
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/personalInstructorDetail"} className="nav-link">
                      Profile
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={Applogout}>
                  Log out
                </a>
              </li>
                  
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
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm setCurrentUser = {setCurrentUser} setIsAdmin = {setIsAdmin} setIsStudent = {setIsStudent} setIsInstructor={setIsInstructor}/>} />
            <Route path="/registerStudent" element={<SignupStudent />} />
            <Route path="/registerAdmin" element={<SignupAdmin />} />
            <Route path="/registerInstructor" element={<SignupInstructor/>} />
            <Route path="/student" element={<BoardStudent/>} />
            <Route path="/admin" element={<BoardAdmin/>}/>
            <Route path="/instructor" element={<BoardInstructor/>}/>
            <Route path="/subjects" element={<SubjectsList choice={1}/>} />
            <Route path="/subjectsByInstructor" element={<SubjectsList choice={2}/>} />
            <Route path="/moreInfo" element={<SubjectDetails isAdmin={isAdmin} isInstructor={isInstructor} isStudent={isStudent}/>} />
            <Route path="/addSubject" element={<SubjectSaveForm/>} />
            <Route path="/subjectUpdate" element={<SubjectUpdateForm/>}/>
            <Route path="/subjectRequest" element={<SubjectRequestForm/>} />
            <Route path="/instructors" element={<InstructorList/>}/>
            <Route path="/instructorUpdate" element={<UpdateInstructor/>} />
            <Route path="/instructorDetail" element={<InstructorDetails isInstructor={isInstructor} isStudent={isStudent} isAdmin={isAdmin}/>}/>
            <Route path="/personalInstructorDetail" element={<PersonalInstructorDetails isInstructor={isInstructor} isStudent={isStudent} isAdmin={isAdmin}/>} />
            <Route path="/students" element={<StudentList/>}/>
            <Route path="/updateStudent" element={<UpdateStudent/>} />
            <Route path="/studentDetail" element={<StudentDetails isStudent={isStudent} isAdmin={isAdmin} isInstructor={isInstructor}/>}/>
            <Route path="/personalStudentDetail" element={<PersonalStudentDetails isStudent={isStudent} isAdmin={isAdmin} isInstructor={isInstructor}/>}/>
            <Route path="/requests" element={<RequestList choice={1}/>} />
            <Route path="/requestDetails" element={<RequestDetails isStudent={isStudent} isAdmin={isAdmin} isInstructor={isInstructor}/>} />
            <Route path="/requestsForSubject" element={<RequestList choice={2}/>} />
            <Route path="/requestsForStudent" element={<RequestList choice={3}/>} />
            <Route path="/requestsForInstructor" element={<RequestList choice={4}/>} />
            <Route path="/studentSubjectDetail" element={<SubjectStudentDetails isAdmin={isAdmin} isInstructor={isInstructor} isStudent={isStudent}/>}/>
            <Route path="/studentSubjects" element={<StudentSubjectList choice={1}/>}/>
            <Route path="/studentSubjectBySubject" element={<StudentSubjectList choice={2}/>} />
            <Route path="/studentSubjectByStudent" element={<StudentSubjectList choice={3}/>} />
            <Route path="/studentSubjectByInstructor" element={<StudentSubjectList choice={4}/>} />
            <Route path="/studentSubjectByStudentAndInstructor" element={<StudentSubjectList choice={5}/>} />
            <Route path="/assignInstructor" element={<SubjectByInstructorAssign/>}/>
            <Route path="/assignInstructorConfirmation" element={<SubjectAssignInstructorConfirmation />}/>
          </Routes>
        </div>
      </div>
  );
}

export default App;

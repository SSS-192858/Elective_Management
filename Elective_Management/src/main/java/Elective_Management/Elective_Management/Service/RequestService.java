package Elective_Management.Elective_Management.Service;

import Elective_Management.Elective_Management.Entity.Instructor;
import Elective_Management.Elective_Management.Entity.Request;
import Elective_Management.Elective_Management.Entity.Student;
import Elective_Management.Elective_Management.Entity.Subject;
import Elective_Management.Elective_Management.Exception.InstructorNotFoundException;
import Elective_Management.Elective_Management.Exception.RequestNotFoundException;
import Elective_Management.Elective_Management.Exception.StudentNotFoundException;
import Elective_Management.Elective_Management.Exception.SubjectNotFoundException;
import Elective_Management.Elective_Management.dao.InstructorDAO;
import Elective_Management.Elective_Management.dao.RequestDAO;
import Elective_Management.Elective_Management.dao.StudentDAO;
import Elective_Management.Elective_Management.dao.SubjectDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RequestService {
    private RequestDAO RequestDAO;

    private StudentDAO studentDAO;

    private SubjectDAO subjectDAO;

    private InstructorDAO instructorDAO;

    @Autowired
    public RequestService (RequestDAO RequestDAO,StudentDAO studentDAO,SubjectDAO subjectDAO,InstructorDAO instructorDAO)
    {
        this.RequestDAO = RequestDAO;
        this.studentDAO = studentDAO;
        this.subjectDAO = subjectDAO;
        this.instructorDAO = instructorDAO;
    }

    public Request saveRequest(Request Request) throws SubjectNotFoundException, StudentNotFoundException {
        int sid = Request.getStudent().getId();
        int subid = Request.getSubject().getSubjectCode();
        Subject subject = this.subjectDAO.findSubjectById(subid);
        Student student = this.studentDAO.findStudentById(sid);
        if(student==null)
        {
            throw new SubjectNotFoundException();
        }
        if(subject==null)
        {
            throw new SubjectNotFoundException();
        }
        return this.RequestDAO.saveRequest(Request);
    }

    public Request getRequestbyId(int id) throws RequestNotFoundException {
        Request request = this.RequestDAO.findRequestById(id);
        if (request == null){
            throw new RequestNotFoundException();
        }
        return request;
    }

    public List<Request> getAllRequest() {
        return this.RequestDAO.findAllRequests();
    }

    public void deleteRequestbyId(int id) throws RequestNotFoundException{
        Request request = this.RequestDAO.findRequestById(id);
        if (request == null){
            throw new RequestNotFoundException();
        }
        this.RequestDAO.deleteById(id);
    }

    public List<Request> getRequestsByInstructorId(Integer id) throws InstructorNotFoundException {
        Instructor instructor = this.instructorDAO.findInstructorById(id);
        if(instructor==null)
        {
            throw new InstructorNotFoundException();
        }
        return this.RequestDAO.getRequestByInstructorId(id);
    }

    public List<Request> getRequestsBySubjectId(Integer id) throws SubjectNotFoundException{
        Subject subject = this.subjectDAO.findSubjectById(id);
        if(subject==null)
        {
            throw new SubjectNotFoundException();
        }
        return this.RequestDAO.getRequestBySubjectId(id);
    }

    public List<Request> getRequestByStudentId(Integer id) throws StudentNotFoundException{
        Student student = this.studentDAO.findStudentById(id);
        if(student==null)
        {
            throw new StudentNotFoundException();
        }
        return this.RequestDAO.getRequestsByStudentId(id);
    }

}

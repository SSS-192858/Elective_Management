package Elective_Management.Elective_Management.Service;

import Elective_Management.Elective_Management.Entity.Instructor;
import Elective_Management.Elective_Management.Entity.Student;
import Elective_Management.Elective_Management.Entity.StudentSubject;
import Elective_Management.Elective_Management.Entity.Subject;
import Elective_Management.Elective_Management.Exception.InstructorNotFoundException;
import Elective_Management.Elective_Management.Exception.StudentNotFoundException;
import Elective_Management.Elective_Management.Exception.StudentSubjectNotFoundException;
import Elective_Management.Elective_Management.Exception.SubjectNotFoundException;
import Elective_Management.Elective_Management.dao.*;
import Elective_Management.Elective_Management.dao.StudentSubjectDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentSubjectService {

    private StudentSubjectDAO studentSubjectDAO;
    private StudentDAO studentDAO;

    private SubjectDAO subjectDAO;

    private InstructorDAO instructorDAO;

    @Autowired
    public StudentSubjectService (StudentSubjectDAO StudentSubjectDAO, StudentDAO studentDAO,SubjectDAO subjectDAO,InstructorDAO instructorDAO) {
        this.studentSubjectDAO = StudentSubjectDAO;
        this.studentDAO = studentDAO;
        this.subjectDAO = subjectDAO;
        this.instructorDAO = instructorDAO;
    }

    public StudentSubject saveStudentSubject(StudentSubject StudentSubject) throws StudentNotFoundException,SubjectNotFoundException {
        int sid = StudentSubject.getStudent().getId();
        int subid = StudentSubject.getSubject().getSubjectCode();
        Subject subject = this.subjectDAO.findSubjectById(subid);
        Student student = this.studentDAO.findStudentById(sid);
        if(subject == null)
        {
            throw new SubjectNotFoundException();
        }
        if(student==null)
        {
            throw new StudentNotFoundException();
        }
        return this.studentSubjectDAO.saveStudentSubject(StudentSubject);
    }

    public StudentSubject getStudentSubjectById(int id) throws StudentSubjectNotFoundException {
        StudentSubject ss = this.studentSubjectDAO.findStudentSubjectById(id);
        if (ss == null){
            throw new StudentSubjectNotFoundException();
        }
        return this.studentSubjectDAO.findStudentSubjectById(id);
    }

    public List<StudentSubject> getAllStudentSubject()
    {
        return this.studentSubjectDAO.findAllStudentSubjects();
    }

    public void deleteStudentSubjectById(int id) throws StudentSubjectNotFoundException {
        StudentSubject ss = this.studentSubjectDAO.findStudentSubjectById(id);
        if (ss == null){
            throw new StudentSubjectNotFoundException();
        }
        this.studentSubjectDAO.deleteById(id);
    }

    public List<StudentSubject> getAllStudentSubjectbySubjectId(Integer id) throws SubjectNotFoundException
    {
        Subject subject = this.subjectDAO.findSubjectById(id);
        if(subject==null)
        {
            throw new SubjectNotFoundException();
        }
        return this.studentSubjectDAO.getBySubjectId(id);
    }

    public List<StudentSubject> getAllStudentSubjectbyStudentId(Integer id) throws StudentNotFoundException
    {
        Student student = this.studentDAO.findStudentById(id);
        if(student==null)
        {
            throw new StudentNotFoundException();
        }
        return this.studentSubjectDAO.getByStudentId(id);
    }

    public List<StudentSubject> getAllStudentSubjectbyInstructorId(Integer id) throws InstructorNotFoundException
    {
        Instructor instructor = this.instructorDAO.findInstructorById(id);
        if(instructor==null)
        {
            throw new InstructorNotFoundException();
        }
        return this.studentSubjectDAO.getByInstructorId(id);
    }

}

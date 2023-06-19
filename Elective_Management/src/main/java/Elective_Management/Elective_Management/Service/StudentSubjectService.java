package Elective_Management.Elective_Management.Service;

import Elective_Management.Elective_Management.Entity.StudentSubject;
import Elective_Management.Elective_Management.Exception.StudentSubjectNotFoundException;
import Elective_Management.Elective_Management.dao.StudentSubjectDAO;
import Elective_Management.Elective_Management.dao.StudentSubjectDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentSubjectService {

    private StudentSubjectDAO studentSubjectDAO;

    @Autowired
    public StudentSubjectService (StudentSubjectDAO StudentSubjectDAO) {
        this.studentSubjectDAO = StudentSubjectDAO;
    }

    public StudentSubject saveStudentSubject(StudentSubject StudentSubject) {
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

    public List<StudentSubject> getAllStudentSubjectbySubjectId(Integer id)
    {
        return this.studentSubjectDAO.getBySubjectId(id);
    }

    public List<StudentSubject> getAllStudentSubjectbyStudentId(Integer id)
    {
        return this.studentSubjectDAO.getByStudentId(id);
    }

    public List<StudentSubject> getAllStudentSubjectbyInstructorId(Integer id)
    {
        return this.studentSubjectDAO.getByInstructorId(id);
    }

}

package Elective_Management.Elective_Management.Service;

import Elective_Management.Elective_Management.Entity.Instructor;
import Elective_Management.Elective_Management.Entity.Subject;
import Elective_Management.Elective_Management.Exception.InstructorNotFoundException;
import Elective_Management.Elective_Management.Exception.SubjectNotFoundException;
import Elective_Management.Elective_Management.dao.InstructorDAO;
import Elective_Management.Elective_Management.dao.SubjectDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {
    private SubjectDAO subjectDAO;
    private InstructorDAO instructorDAO;

    @Autowired
    public SubjectService(SubjectDAO subjectDAO, InstructorDAO instructorDAO){
        this.subjectDAO = subjectDAO;
        this.instructorDAO = instructorDAO;
    }

    public List<Subject> findAll(){
        return this.subjectDAO.findAllSubjects();
    }

    public Subject saveSubject(Subject subject){
        return this.subjectDAO.saveSubject(subject);
    }

    public void deleteSubjectById(Integer id) throws SubjectNotFoundException{
        Subject sub = this.subjectDAO.findSubjectById(id);
        if (sub == null) {
            throw new SubjectNotFoundException();
        }
        subjectDAO.deleteById(id);
    }

    public Subject findById(Integer id) throws SubjectNotFoundException{
        Subject s = this.subjectDAO.findSubjectById(id);
        if(s==null){
            throw new SubjectNotFoundException();
        }
        return s;
    }

    public Subject updateSubject(Subject subject) throws SubjectNotFoundException{
        Subject s = this.subjectDAO.findSubjectById(subject.getSubjectCode());
        if(s==null){
            throw new SubjectNotFoundException();
        }
        return this.subjectDAO.updateSubject(subject);
    }

    public List<Subject> listByInstructorId(Integer id)throws InstructorNotFoundException{
        Instructor instructor = this.instructorDAO.findInstructorById(id);
        if(instructor==null)
        {
            throw new InstructorNotFoundException();
        }
        return this.subjectDAO.listSubjectByInstructorId(id);
    }

    public Subject assignInstructor(Integer code, Instructor instructor) throws SubjectNotFoundException, InstructorNotFoundException {
        Subject subject = subjectDAO.findSubjectById(code);
        Instructor i = this.instructorDAO.findInstructorById(instructor.getId());
        if (subject == null) {
            throw new SubjectNotFoundException();
        }

        if (i == null){
            throw new InstructorNotFoundException();
        }

        subject.setInstructor(i);
        return this.subjectDAO.saveSubject(subject);
    }

    public Subject removeInstructor(Integer id) throws SubjectNotFoundException {
        Subject subject = subjectDAO.findSubjectById(id);
        if (subject == null){
            throw new SubjectNotFoundException();
        }
        subject.setInstructor(null);
        return this.subjectDAO.updateSubject(subject);
    }
}

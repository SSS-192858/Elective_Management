package Elective_Management.Elective_Management.Service;

import Elective_Management.Elective_Management.Entity.Instructor;
import Elective_Management.Elective_Management.Entity.Subject;
import Elective_Management.Elective_Management.Entity.User;
import Elective_Management.Elective_Management.Exception.InstructorNotFoundException;
import Elective_Management.Elective_Management.Exception.SubjectNotFoundException;
import Elective_Management.Elective_Management.dao.InstructorDAO;
import Elective_Management.Elective_Management.dao.SubjectDAO;
import Elective_Management.Elective_Management.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstructorService {
    private InstructorDAO instructorDAO;
    private SubjectDAO subjectDAO;
    private UserDAO userDAO;

    @Autowired
    public InstructorService(InstructorDAO instructorDAO, SubjectDAO subjectDAO, UserDAO userDAO){
        this.instructorDAO = instructorDAO;
        this.subjectDAO = subjectDAO;
        this.userDAO = userDAO;
    }

    public Instructor saveInstructor(Instructor instructor) {
        return this.instructorDAO.saveInstructor(instructor);
    }

    public Instructor getInstructorById(int id) throws InstructorNotFoundException {
        Instructor instructor = this.instructorDAO.findInstructorById(id);
        if (instructor == null){
            throw new InstructorNotFoundException();
        }
        return instructor;
    }
    
    public List<Instructor> getAllInstructor() {
        return this.instructorDAO.findAllInstructors();
    }

    public void deleteInstructorById(int id) throws InstructorNotFoundException {
        Instructor instructor = this.instructorDAO.findInstructorById(id);
        if (instructor == null){
            throw new InstructorNotFoundException();
        }
        User user = instructor.getUser();
        this.instructorDAO.deleteById(id);
        this.userDAO.delete(user);
    }

    public Instructor updateInstructor(Instructor instructor) throws InstructorNotFoundException {
        Instructor inst = this.instructorDAO.findInstructorById(instructor.getId());
        if (inst == null){
            throw new InstructorNotFoundException();
        }
        return this.instructorDAO.updateInstructor(instructor);
    }

    public Instructor getInstructorBySubjectId(Integer id) throws SubjectNotFoundException {
        Subject subject = this.subjectDAO.findSubjectById(id);
        if (subject == null){
            throw new SubjectNotFoundException();
        }
        return instructorDAO.getInstructorBySubjectId(id);
    }

    public Instructor getByUserId(Integer id) {
        return instructorDAO.getInstructorByUserId(id);
    }
}
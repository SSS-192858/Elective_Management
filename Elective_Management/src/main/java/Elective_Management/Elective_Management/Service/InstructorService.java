package Elective_Management.Elective_Management.Service;

import Elective_Management.Elective_Management.Entity.Instructor;
import Elective_Management.Elective_Management.Exception.InstructorNotFoundException;
import Elective_Management.Elective_Management.dao.InstructorDAOImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import Elective_Management.Elective_Management.dao.InstructorDAO;

import java.util.List;

@Service
public class InstructorService {
    private InstructorDAO instructorDAO;

    @Autowired
    public InstructorService (InstructorDAO instructorDAO)
    {
        this.instructorDAO = instructorDAO;
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
        this.instructorDAO.deleteById(id);
    }

    public Instructor updateInstructor(Instructor instructor) throws InstructorNotFoundException {
        Instructor inst = this.instructorDAO.findInstructorById(instructor.getId());
        if (inst == null){
            throw new InstructorNotFoundException();
        }
        return this.instructorDAO.updateInstructor(instructor);
    }

}

package Elective_Management.Elective_Management.dao;

import Elective_Management.Elective_Management.Entity.Instructor;

import java.util.List;

public interface InstructorDAO {

    public Instructor saveInstructor(Instructor Instructor);

    public Instructor findInstructorById(Integer id);

    public void deleteById(Integer id);

    public Instructor updateInstructor(Instructor Instructor);

    public List<Instructor> findAllInstructors();
}

package Elective_Management.Elective_Management.dao;

import Elective_Management.Elective_Management.Entity.Student;

import java.util.List;

public interface StudentDAO {
    public Student saveStudent(Student student);

    public Student findStudentById(Integer id);

    public void deleteById(Integer id);

    public Student updateStudent(Student student);

    public List<Student> findAllstudents();

    public Student getStudentByUserId(Integer id);
}

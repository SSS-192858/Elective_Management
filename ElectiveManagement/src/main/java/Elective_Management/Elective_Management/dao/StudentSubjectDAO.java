package Elective_Management.Elective_Management.dao;

import Elective_Management.Elective_Management.Entity.StudentSubject;

import java.util.List;

public interface StudentSubjectDAO {
    public StudentSubject saveStudentSubject(StudentSubject StudentSubject);

    public StudentSubject findStudentSubjectById(Integer id);

    public void deleteById(Integer id);

    public List<StudentSubject> findAllStudentSubjects();

    public List<StudentSubject> getByStudentId(Integer id);

    public List<StudentSubject> getBySubjectId(Integer id);

    public List<StudentSubject> getByInstructorId(Integer id);

    public List<StudentSubject> getForStudentAndInstructor(Integer studentId, Integer instructorId);
}

package Elective_Management.Elective_Management.Service;

import Elective_Management.Elective_Management.Entity.User;
import Elective_Management.Elective_Management.Exception.StudentNotFoundException;
import Elective_Management.Elective_Management.dao.StudentDAO;
import Elective_Management.Elective_Management.Entity.Student;
import Elective_Management.Elective_Management.dao.UserDAO;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class StudentService {
    private StudentDAO studentDAO;
    private UserDAO userDAO;

    @Autowired
    public StudentService(StudentDAO studentDAO, UserDAO userDAO){
        this.studentDAO = studentDAO;
        this.userDAO = userDAO;
    }

    public Student saveStudent(Student student){
        return this.studentDAO.saveStudent(student);
    }

    public Student updateStudent(Student student) throws StudentNotFoundException{
        Student student1 = this.studentDAO.findStudentById(student.getId());
        if (student1 == null){
            throw new StudentNotFoundException();
        }
        return this.studentDAO.updateStudent(student);
    }

    public Student getStudentById(Integer id) throws StudentNotFoundException {
        Student student = this.studentDAO.findStudentById(id);
        if (student == null){
            throw new StudentNotFoundException();
        }

        return student;
    }

    public void deleteStudentById(Integer id) throws StudentNotFoundException {
        Student student = this.studentDAO.findStudentById(id);
        if (student == null){
            throw new StudentNotFoundException();
        }
        User user = student.getUser();
        this.studentDAO.deleteById(id);
        this.userDAO.delete(user);
    }

    public List<Student> getAllStudents(){
        return this.studentDAO.findAllstudents();
    }

    public Student getByUserId(Integer id) {
        return studentDAO.getStudentByUserId(id);
    }
}

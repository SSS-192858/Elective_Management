package Elective_Management.Elective_Management.Controller;

import Elective_Management.Elective_Management.Entity.Student;
import Elective_Management.Elective_Management.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {
    private StudentService studentService;

    @Autowired
    public StudentController(StudentService StudentService)
    {
        this.studentService = StudentService;
    }

    @GetMapping("/getAll")
    public List<Student> getAllStudent()
    {
        return this.studentService.getAllStudents();
    }

    @GetMapping("/getbyID/{id}")
    public Student getStudentbyId(@PathVariable int id)
    {
        return this.studentService.getStudentById(id);
    }

    @PostMapping("/save")
    public Student saveStudent(@RequestBody Student Student)
    {
        return this.studentService.saveStudent(Student);
    }

    @PutMapping("/update")
    public void updateStudent(@RequestBody Student Student)
    {
        this.studentService.updateStudent(Student);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable int id)
    {
        this.studentService.deleteStudentById(id);
    }
    
}

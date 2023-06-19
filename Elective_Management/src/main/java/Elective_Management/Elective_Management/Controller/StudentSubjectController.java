package Elective_Management.Elective_Management.Controller;

import Elective_Management.Elective_Management.Entity.Request;
import Elective_Management.Elective_Management.Entity.StudentSubject;
import Elective_Management.Elective_Management.Service.StudentSubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/studentSubject")
public class StudentSubjectController {
    private StudentSubjectService studentSubjectService;

    @Autowired
    public StudentSubjectController(StudentSubjectService StudentSubjectService)
    {
        this.studentSubjectService = StudentSubjectService;
    }

    @GetMapping("/getAll")
    public List<StudentSubject> getAllStudentSubject()
    {
        return this.studentSubjectService.getAllStudentSubject();
    }

    @GetMapping("/getbyID/{id}")
    public StudentSubject getStudentSubjectbyId(@PathVariable int id)
    {
        return this.studentSubjectService.getStudentSubjectById(id);
    }

    @PostMapping("/save")
    public StudentSubject saveStudentSubject(@RequestBody StudentSubject StudentSubject)
    {
        return this.studentSubjectService.saveStudentSubject(StudentSubject);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteStudentSubject(@PathVariable int id)
    {
        this.studentSubjectService.deleteStudentSubjectById(id);
    }

    @GetMapping("/getByInstructor/{id}")
    public List<StudentSubject> getbyInstructorId(@PathVariable int id)
    {
        return this.studentSubjectService.getAllStudentSubjectbyInstructorId(id);
    }

    @GetMapping("/getByStudent/{id}")
    public List<StudentSubject> getbyStudentId(@PathVariable int id)
    {
        return this.studentSubjectService.getAllStudentSubjectbyStudentId(id);
    }

    @GetMapping("/getBySubject/{id}")
    public List<StudentSubject> getbySubjectId(@PathVariable int id)
    {
        return this.studentSubjectService.getAllStudentSubjectbySubjectId(id);
    }



}

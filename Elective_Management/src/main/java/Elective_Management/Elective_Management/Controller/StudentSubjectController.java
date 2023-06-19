package Elective_Management.Elective_Management.Controller;

import Elective_Management.Elective_Management.Entity.Instructor;
import Elective_Management.Elective_Management.Entity.Request;
import Elective_Management.Elective_Management.Entity.StudentSubject;
import Elective_Management.Elective_Management.Entity.User;
import Elective_Management.Elective_Management.Service.InstructorService;
import Elective_Management.Elective_Management.Service.JwtUserDetailsService;
import Elective_Management.Elective_Management.Service.RequestService;
import Elective_Management.Elective_Management.Service.StudentSubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/studentSubject")
public class StudentSubjectController {
    private StudentSubjectService studentSubjectService;
    private InstructorService instructorService;
    private JwtUserDetailsService jwtUserDetailsService;
    private RequestService requestService;

    @Autowired
    public StudentSubjectController(StudentSubjectService StudentSubjectService, InstructorService instructorService, JwtUserDetailsService jwtUserDetailsService, RequestService requestService)
    {
        this.studentSubjectService = StudentSubjectService;
        this.instructorService = instructorService;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.requestService = requestService;
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

    @PostMapping("/accept")
    @Transactional
    public StudentSubject accept(@RequestBody Request request){

            StudentSubject ss = new StudentSubject();
            ss.setEndDate(request.getEndDate());
            ss.setStartDate(request.getStartDate());
            ss.setStudent(request.getStudent());
            ss.setSubject(request.getSubject());
            Instructor instructor = instructorService.getInstructorBySubjectId(request.getSubject().getSubjectCode());
            ss.getSubject().setInstructor(instructor);
//            ss.setSubject(request.getSubject());
            User user = jwtUserDetailsService.getUserByUsername(request.getStudent().getUser().getUsername());
            ss.getStudent().setUser(user);

            StudentSubject ss1 = saveStudentSubject(ss);
            requestService.deleteRequestbyId(request.getSlno());
            return ss1;
    }

    @GetMapping("/getBySubject/{id}")
    public List<StudentSubject> getbySubjectId(@PathVariable int id)
    {
        return this.studentSubjectService.getAllStudentSubjectbySubjectId(id);
    }


}

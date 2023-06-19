package Elective_Management.Elective_Management.Controller;


import Elective_Management.Elective_Management.Entity.Request;
import Elective_Management.Elective_Management.Exception.StudentNotFoundException;
import Elective_Management.Elective_Management.Service.*;
import Elective_Management.Elective_Management.config.JwtTokenUtil;
import Elective_Management.Elective_Management.Entity.User;
import Elective_Management.Elective_Management.Entity.Instructor;
import Elective_Management.Elective_Management.Entity.Student;
import Elective_Management.Elective_Management.Entity.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/request")
public class RequestController {

    private RequestService requestService;
    private JwtTokenUtil jwtTokenUtil;
    private JwtUserDetailsService jwtUserDetailsService;
    private InstructorService instructorService;
    private StudentService studentService;
    private SubjectService subjectService;

    @Autowired
    public RequestController(RequestService requestService, JwtUserDetailsService jwtUserDetailsService, JwtTokenUtil jwtTokenUtil,InstructorService instructorService,StudentService studentService,SubjectService subjectService) {
        this.requestService = requestService;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.instructorService = instructorService;
        this.subjectService = subjectService;
        this.studentService = studentService;
    }

    @GetMapping("/getAll")
    public List<Request> getAllRequest()
    {
        return this.requestService.getAllRequest();
    }

    @GetMapping("/getbyID/{id}")
    public Request getRequestbyId(@PathVariable int id)
    {
        return this.requestService.getRequestbyId(id);
    }

    @PostMapping("/save")
    public Request saveRequest(@RequestBody Request request, @RequestHeader String Authorization) {
        request.setSlno(0);
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        Instructor instructor = instructorService.getInstructorBySubjectId(request.getSubject().getSubjectCode());
        request.getStudent().setUser(user);
        request.getStudent().addRequest(request);
        request.getSubject().setInstructor(instructor);
        return this.requestService.saveRequest(request);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRequest(@PathVariable int id)
    {
        this.requestService.deleteRequestbyId(id);
    }

    @GetMapping("/getbyStudent/{id}")
    public List<Request> getRequestbyStudentId (@PathVariable int id)
    {
        return this.requestService.getRequestByStudentId(id);
    }

    @GetMapping("/getbyInstructorId/{id}")
    public List<Request> getRequestbyInstructorId(@PathVariable int id)
    {
        return this.requestService.getRequestsByInstructorId(id);
    }

    @GetMapping("/getbySubjectId/{id}")
    public List<Request> getSubjectbyInstructorId(@PathVariable int id)
    {
        return this.requestService.getRequestsBySubjectId(id);
    }

}

package Elective_Management.Elective_Management.Controller;

import Elective_Management.Elective_Management.Entity.Instructor;
import Elective_Management.Elective_Management.Entity.User;
import Elective_Management.Elective_Management.Service.InstructorService;
import Elective_Management.Elective_Management.Service.JwtUserDetailsService;
import Elective_Management.Elective_Management.config.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instructor")
public class InstructorController {
    
    private InstructorService instructorService;

    private JwtTokenUtil jwtTokenUtil;
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    public InstructorController(InstructorService InstructorService, JwtTokenUtil jwtTokenUtil, JwtUserDetailsService jwtUserDetailsService)
    {
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.instructorService = InstructorService;
    }

    @GetMapping("/getAll")
    public List<Instructor> getAllInstructor()
    {
        return this.instructorService.getAllInstructor();
    }

    @GetMapping("/getbyID/{id}")
    public Instructor getInstructorbyId(@PathVariable int id)
    {
        return this.instructorService.getInstructorById(id);
    }

    @PostMapping("/save")
    public Instructor saveInstructor(@RequestBody Instructor Instructor, @RequestHeader String Authorization)
    {
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        Instructor.setId(0);
        Instructor.setUser(user);
        return this.instructorService.saveInstructor(Instructor);
    }

    @PutMapping("/update")
    public void updateInstructor(@RequestBody Instructor Instructor, @RequestHeader String Authorization)
    {
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        Instructor.setUser(user);
        this.instructorService.updateInstructor(Instructor);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteInstructor(@PathVariable int id)
    {
        this.instructorService.deleteInstructorById(id);
    }
}

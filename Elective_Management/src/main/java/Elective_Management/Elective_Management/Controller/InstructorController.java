package Elective_Management.Elective_Management.Controller;

import Elective_Management.Elective_Management.Entity.Instructor;
import Elective_Management.Elective_Management.Service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instructor")
public class InstructorController {
    private InstructorService instructorService;

    @Autowired
    public InstructorController(InstructorService InstructorService)
    {
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
    public Instructor saveInstructor(@RequestBody Instructor Instructor)
    {
        return this.instructorService.saveInstructor(Instructor);
    }

    @PutMapping("/update")
    public void updateInstructor(@RequestBody Instructor Instructor)
    {
        this.instructorService.updateInstructor(Instructor);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteInstructor(@PathVariable int id)
    {
        this.instructorService.deleteInstructorById(id);
    }
}

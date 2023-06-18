package Elective_Management.Elective_Management.Controller;

import java.util.List;

import Elective_Management.Elective_Management.Entity.Instructor;
import Elective_Management.Elective_Management.Entity.Subject;
import Elective_Management.Elective_Management.Service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/subject")
public class SubjectController {

    private SubjectService subjectService;

    @Autowired
    public SubjectController (SubjectService subjectService)
    {
        this.subjectService = subjectService;
    }

    @GetMapping("/allSubjects")
    public List<Subject> findAllCabs(){
        return this.subjectService.findAll();
    }

    @GetMapping("/{code}")
    public Subject findSubjectById(@PathVariable Integer code) {
        return this.subjectService.findById(code);
    }

    @DeleteMapping("/delete/{code}")
    public void deleteSubjectById(@PathVariable Integer code){
        this.subjectService.deleteSubjectById(code);
    }

    @PutMapping("/update")
    public Subject updateCab(@RequestBody Subject subject)  {
        this.subjectService.updateSubject(subject);
        return subject;
    }

    @GetMapping("/getByInstructorId/{id}")
    public List<Subject> getByInstructorId(@PathVariable Integer id){
        return this.subjectService.listByInstructorId(id);
    }

    @PostMapping("/save")
    public Subject addSubject(@RequestBody Subject subject){
        return this.subjectService.saveSubject(subject);
    }

    @PutMapping("/updateInstructor/{code}")
    public Subject updateInstructor(@PathVariable Integer code, @RequestBody Instructor instructor){
        return this.subjectService.assignInstructor(code,instructor);
    }
}
package Elective_Management.Elective_Management.Controller;


import Elective_Management.Elective_Management.Entity.Request;
import Elective_Management.Elective_Management.Service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/request")
public class RequestController {

    private RequestService requestService;

    @Autowired
    public RequestController(RequestService requestService)
    {
        this.requestService = requestService;
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
    public Request saveRequest(@RequestBody Request request)
    {
        return this.requestService.saveRequest(request);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRequest(@PathVariable int id)
    {
        this.requestService.deleteRequestbyId(id);
    }

    @GetMapping("/getbyStudent/{id}")
    public List<Request> getRequestbyStudentId(@PathVariable int id)
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

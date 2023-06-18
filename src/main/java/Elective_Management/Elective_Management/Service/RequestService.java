package Elective_Management.Elective_Management.Service;

import Elective_Management.Elective_Management.Entity.Request;
import Elective_Management.Elective_Management.Exception.RequestNotFoundException;
import Elective_Management.Elective_Management.dao.RequestDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RequestService {
    private RequestDAO RequestDAO;

    @Autowired
    public RequestService (RequestDAO RequestDAO) {
        this.RequestDAO = RequestDAO;
    }

    public Request saveRequest(Request Request) {
        return this.RequestDAO.saveRequest(Request);
    }

    public Request getRequestbyId(int id) throws RequestNotFoundException {
        Request request = this.RequestDAO.findRequestById(id);
        if (request == null){
            throw new RequestNotFoundException();
        }
        return request;
    }

    public List<Request> getAllRequest() {
        return this.RequestDAO.findAllRequests();
    }

    public void deleteRequestbyId(int id) {
        Request request = this.RequestDAO.findRequestById(id);
        if (request == null){
            throw new RequestNotFoundException();
        }
        this.RequestDAO.deleteById(id);
    }

    public List<Request> getRequestsByInstructorId(Integer id){
        return this.RequestDAO.getRequestByInstructorId(id);
    }

    public List<Request> getRequestsBySubjectId(Integer id){
        return this.RequestDAO.getRequestBySubjectId(id);
    }

    public List<Request> getRequestByStudentId(Integer id){
        return this.RequestDAO.getRequestsByStudentId(id);
    }

}

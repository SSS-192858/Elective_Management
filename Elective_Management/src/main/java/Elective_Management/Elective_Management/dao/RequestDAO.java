package Elective_Management.Elective_Management.dao;

import Elective_Management.Elective_Management.Entity.Request;

import java.util.List;

public interface RequestDAO {
    public Request saveRequest(Request Request);

    public Request findRequestById(Integer id);

    public void deleteById(Integer id);

    public List<Request> findAllRequests();

    public List<Request> getRequestsByStudentId(Integer id);

    public List<Request> getRequestBySubjectId(Integer id);

    public List<Request> getRequestByInstructorId(Integer id);
}

package Elective_Management.Elective_Management.dao;

import Elective_Management.Elective_Management.Entity.Request;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class RequestDAOImpl implements RequestDAO {
    private EntityManager entityManager;

    @Autowired
    public RequestDAOImpl(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public Request saveRequest(Request Request) {
        return this.entityManager.merge(Request);
    }

    @Override
    public Request findRequestById(Integer id) {
        return this.entityManager.find(Request.class,id);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        Request Request = this.entityManager.find(Request.class, id);
        this.entityManager.remove(Request);
    }


    @Override
    public List<Request> findAllRequests() {
        TypedQuery<Request> tq = this.entityManager.createQuery("From Request",Request.class);
        return tq.getResultList();
    }

    @Override
    public List<Request> getRequestsByStudentId(Integer id){
        TypedQuery<Request> tpq = this.entityManager.createQuery("FROM Request where student.id = :id", Request.class);
        tpq.setParameter("id", id);
        return tpq.getResultList();
    }

    @Override
    public List<Request> getRequestBySubjectId(Integer id){
        TypedQuery<Request> tpq = this.entityManager.createQuery("FROM Request where subject.subjectCode = :id", Request.class);
        tpq.setParameter("id", id);
        return tpq.getResultList();
    }

    @Override
    public List<Request> getRequestByInstructorId(Integer id){
        TypedQuery<Request> tpq = this.entityManager.createQuery("FROM Request where subject.instructor.Id = :id", Request.class);
        tpq.setParameter("id", id);
        return tpq.getResultList();
    }
}

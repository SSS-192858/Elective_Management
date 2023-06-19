package Elective_Management.Elective_Management.dao;

import Elective_Management.Elective_Management.Entity.Student;
import Elective_Management.Elective_Management.Entity.Subject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class SubjectDAOImpl implements SubjectDAO{
    private EntityManager entityManager;

    @Autowired
    public SubjectDAOImpl(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public Subject saveSubject(Subject Subject) {
        return this.entityManager.merge(Subject);
    }

    @Override
    public Subject findSubjectById(Integer id) {
        return this.entityManager.find(Subject.class,id);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        Subject Subject = this.entityManager.find(Subject.class,id);
        this.entityManager.remove(Subject);
    }

    @Override
    @Transactional
    public Subject updateSubject(Subject Subject) {
        return this.entityManager.merge(Subject);
    }

    @Override
    public List<Subject> findAllSubjects() {
        TypedQuery<Subject> tq = this.entityManager.createQuery("From Subject",Subject.class);
        return tq.getResultList();
    }

    @Override
    public List<Subject> listSubjectByInstructorId(Integer id){
        TypedQuery<Subject> query = this.entityManager.createQuery("FROM Subject where instructor.id = :id", Subject.class);
        query.setParameter("id", id);
        return query.getResultList();
    }
}

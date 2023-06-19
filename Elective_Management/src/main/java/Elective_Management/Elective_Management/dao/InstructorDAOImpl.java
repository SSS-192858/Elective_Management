package Elective_Management.Elective_Management.dao;

import Elective_Management.Elective_Management.Entity.Instructor;
import Elective_Management.Elective_Management.Entity.Subject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class InstructorDAOImpl implements InstructorDAO {

    private EntityManager entityManager;

    @Autowired
    public InstructorDAOImpl(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public Instructor saveInstructor(Instructor Instructor) {
        return this.entityManager.merge(Instructor);
    }

    @Override
    public Instructor findInstructorById(Integer id) {
        return this.entityManager.find(Instructor.class,id);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        Instructor Instructor = this.entityManager.find(Instructor.class,id);
        this.entityManager.remove(Instructor);
    }

    @Override
    @Transactional
    public Instructor updateInstructor(Instructor Instructor) {
        return this.entityManager.merge(Instructor);
    }

    @Override
    public List<Instructor> findAllInstructors() {
        TypedQuery<Instructor> tq = this.entityManager.createQuery("From Instructor",Instructor.class);
        return tq.getResultList();
    }

    @Override
    public Instructor getInstructorBySubjectId(Integer id){
        Subject subject = this.entityManager.find(Subject.class, id);
        return subject.getInstructor();
    }
}

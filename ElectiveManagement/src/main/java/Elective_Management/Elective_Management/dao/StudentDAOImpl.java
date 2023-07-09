package Elective_Management.Elective_Management.dao;

import Elective_Management.Elective_Management.Entity.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class StudentDAOImpl implements StudentDAO{

    private EntityManager entityManager;

    @Autowired
    public StudentDAOImpl(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public Student saveStudent(Student student) {
        return this.entityManager.merge(student);
    }

    @Override
    public Student findStudentById(Integer id) {
        return this.entityManager.find(Student.class,id);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        Student student = this.entityManager.find(Student.class,id);
        this.entityManager.remove(student);
    }

    @Override
    @Transactional
    public Student updateStudent(Student student) {
        return this.entityManager.merge(student);
    }

    @Override
    public List<Student> findAllstudents() {
        TypedQuery<Student> tq = this.entityManager.createQuery("From Student",Student.class);
        return tq.getResultList();
    }

    @Override
    public Student getStudentByUserId(Integer id) {
        TypedQuery<Student> query = this.entityManager.createQuery("FROM Student where user.id = :id", Student.class);
        query.setParameter("id", id);
        return query.getSingleResult();
    }
}

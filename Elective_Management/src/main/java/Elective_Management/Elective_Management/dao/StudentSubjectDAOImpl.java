package Elective_Management.Elective_Management.dao;

import Elective_Management.Elective_Management.Entity.StudentSubject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class StudentSubjectDAOImpl implements StudentSubjectDAO{
    private EntityManager entityManager;

    @Autowired
    public StudentSubjectDAOImpl(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public StudentSubject saveStudentSubject(StudentSubject StudentSubject) {
        return this.entityManager.merge(StudentSubject);
    }

    @Override
    public StudentSubject findStudentSubjectById(Integer id) {
        return this.entityManager.find(StudentSubject.class,id);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        StudentSubject StudentSubject = this.entityManager.find(StudentSubject.class, id);
        this.entityManager.remove(StudentSubject);
    }

    @Override
    public List<StudentSubject> findAllStudentSubjects() {
        TypedQuery<StudentSubject> tq = this.entityManager.createQuery("From StudentSubject",StudentSubject.class);
        return tq.getResultList();
    }

    @Override
    public List<StudentSubject> getByStudentId(Integer id){
        TypedQuery<StudentSubject> tpq = this.entityManager.createQuery("FROM StudentSubject where student.id = :id", StudentSubject.class);
        tpq.setParameter("id", id);
        return tpq.getResultList();
    }

    @Override
    public List<StudentSubject> getBySubjectId(Integer id){
        TypedQuery<StudentSubject> tpq = this.entityManager.createQuery("FROM StudentSubject where subject.subjectCode = :id", StudentSubject.class);
        tpq.setParameter("id", id);
        return tpq.getResultList();
    }

    @Override
    public List<StudentSubject> getByInstructorId(Integer id){
        TypedQuery<StudentSubject> tpq = this.entityManager.createQuery("FROM StudentSubject where subject.instructor.Id = :id", StudentSubject.class);
        tpq.setParameter("id", id);
        return tpq.getResultList();
    }
}

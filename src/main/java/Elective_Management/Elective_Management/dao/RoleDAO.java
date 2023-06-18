package Elective_Management.Elective_Management.dao;

import Elective_Management.Elective_Management.Entity.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDAO extends CrudRepository<Role, Long> {
    Role findRoleByName(String name);
}

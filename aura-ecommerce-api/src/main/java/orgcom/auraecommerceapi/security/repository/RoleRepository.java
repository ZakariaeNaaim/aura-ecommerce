package orgcom.auraecommerceapi.security.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import orgcom.auraecommerceapi.security.models.ERole;
import orgcom.auraecommerceapi.security.models.Role;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}

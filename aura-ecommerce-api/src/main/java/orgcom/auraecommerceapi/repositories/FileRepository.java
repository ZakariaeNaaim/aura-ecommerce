package orgcom.auraecommerceapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import orgcom.auraecommerceapi.entities.File;

import java.util.UUID;

public interface FileRepository extends JpaRepository<File, Long> {
}

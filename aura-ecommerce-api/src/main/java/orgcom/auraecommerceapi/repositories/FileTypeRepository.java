package orgcom.auraecommerceapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import orgcom.auraecommerceapi.entities.FileType;

public interface FileTypeRepository extends JpaRepository<FileType, Integer> {
    FileType findByLibelle(String libelle);
}

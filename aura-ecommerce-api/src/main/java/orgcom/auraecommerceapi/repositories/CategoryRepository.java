package orgcom.auraecommerceapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import orgcom.auraecommerceapi.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}

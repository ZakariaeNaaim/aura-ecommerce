package orgcom.auraecommerceapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import orgcom.auraecommerceapi.entities.Category;
@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}

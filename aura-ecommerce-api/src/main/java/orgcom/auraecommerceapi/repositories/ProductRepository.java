package orgcom.auraecommerceapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import orgcom.auraecommerceapi.entities.Product;

import java.util.UUID;
@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
}

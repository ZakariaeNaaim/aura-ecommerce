package orgcom.auraecommerceapi.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import orgcom.auraecommerceapi.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}

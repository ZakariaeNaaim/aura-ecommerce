package orgcom.auraecommerceapi.services.fasad;


import orgcom.auraecommerceapi.entities.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    Product saveProduct(Product product);

    Optional<Product> getProductById(int id);

    List<Product> getAllProducts();

    Product updateProduct(int id, Product product);

    void deleteProduct(int id);
}

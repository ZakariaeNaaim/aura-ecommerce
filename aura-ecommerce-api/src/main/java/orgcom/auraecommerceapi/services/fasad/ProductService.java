package orgcom.auraecommerceapi.services.fasad;

import orgcom.auraecommerceapi.entities.Product;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

public interface ProductService {
    ResponseGenericResult<Boolean> saveProduct(Product product);
}

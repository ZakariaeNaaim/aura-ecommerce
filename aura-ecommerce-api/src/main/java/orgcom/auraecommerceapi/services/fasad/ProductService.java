package orgcom.auraecommerceapi.services.fasad;

import org.springframework.web.multipart.MultipartFile;
import orgcom.auraecommerceapi.dtos.ProductRequestDto;
import orgcom.auraecommerceapi.entities.Product;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;

public interface ProductService {
    ResponseGenericResult<Boolean> saveProduct(ProductRequestDto productRequestDto, MultipartFile image);

    ResponseGenericResult<List<Product>> getAllProducts();
}

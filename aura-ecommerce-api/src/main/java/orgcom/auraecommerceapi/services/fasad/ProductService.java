package orgcom.auraecommerceapi.services.fasad;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import orgcom.auraecommerceapi.dtos.ProductDto;
import orgcom.auraecommerceapi.dtos.ProductRequestDto;
import orgcom.auraecommerceapi.entities.Product;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.ArrayList;
import java.util.List;

public interface ProductService {
    ResponseGenericResult<Boolean> saveProduct(ProductRequestDto productRequestDto, MultipartFile image);

    ResponseEntity<List<ProductDto>> getAllProducts();

    ResponseGenericResult<Boolean> updateProduct(ProductRequestDto productRequestDto, MultipartFile image);

    ResponseGenericResult<Boolean> deleteProduct(ArrayList<Long> ids);
}

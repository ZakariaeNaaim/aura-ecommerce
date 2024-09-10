package orgcom.auraecommerceapi.services.fasad;

import org.springframework.web.multipart.MultipartFile;
import orgcom.auraecommerceapi.dtos.ProductRequestDto;
import orgcom.auraecommerceapi.entities.Product;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

public interface ProductService {
    ResponseGenericResult<Boolean> saveProduct(ProductRequestDto productRequestDto, MultipartFile image);
}

package orgcom.auraecommerceapi.mappers;

import org.springframework.stereotype.Component;
import orgcom.auraecommerceapi.dtos.ProductRequestDto;
import orgcom.auraecommerceapi.entities.Product;

@Component
public class ProductMapper {
    public Product toProduct(ProductRequestDto request) {
        if (request == null) {
            return new Product();
        }
        return Product.builder()
                                .id(request.getId())
                                .name(request.getName())
                                .price(request.getPrice())
                                .quantity(request.getQuantity())
                                .description(request.getDescription())
                                .build();
    }
}

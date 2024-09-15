package orgcom.auraecommerceapi.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import orgcom.auraecommerceapi.dtos.ProductRequestDto;
import orgcom.auraecommerceapi.entities.Order;
import orgcom.auraecommerceapi.entities.Product;
import orgcom.auraecommerceapi.mappers.ProductMapper;
import orgcom.auraecommerceapi.services.fasad.OrderService;
import orgcom.auraecommerceapi.services.fasad.ProductService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/products")
@RestController
public class ProductController {
    private final ProductMapper productMapper;
    private ProductService _productService;
    public ProductController(ProductService productService, ProductMapper productMapper) {

        _productService = productService;
        this.productMapper = productMapper;
    }

    @GetMapping("/getProducts")
    public ResponseGenericResult<List<Product>> getProducts() {
        return  _productService.getAllProducts();
    }
    @PostMapping("/saveProduct")
    public ResponseGenericResult<Boolean> saveProduct(@ModelAttribute ProductRequestDto productRequestDto,
                                                        @RequestParam("image") MultipartFile image) {
        ResponseGenericResult<Boolean> result = _productService.saveProduct(productRequestDto,image);
        return result;
    }
}

package orgcom.auraecommerceapi.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import orgcom.auraecommerceapi.dtos.ProductDto;
import orgcom.auraecommerceapi.dtos.ProductRequestDto;
import orgcom.auraecommerceapi.entities.Product;
import orgcom.auraecommerceapi.services.fasad.ProductService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/products")
@RestController
public class ProductController {


    private final ProductService _productService;

    public ProductController(ProductService productService) {
        _productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getProducts() {
        return  _productService.getAllProducts();
    }

    @PostMapping
    public ResponseGenericResult<Boolean> saveProduct(@ModelAttribute ProductRequestDto productRequestDto, @RequestParam("image") MultipartFile image) {
        return _productService.saveProduct(productRequestDto,image);
    }

    @PutMapping
    public ResponseGenericResult<Boolean> updateProduct(@ModelAttribute ProductRequestDto productRequestDto, @RequestParam("image") MultipartFile image) {
        return _productService.updateProduct(productRequestDto,image);
    }

    @DeleteMapping("/{ids}")
    public ResponseGenericResult<Boolean> deleteProduct(@PathVariable ArrayList<Long> ids) {
        return _productService.deleteProduct(ids);
    }
}

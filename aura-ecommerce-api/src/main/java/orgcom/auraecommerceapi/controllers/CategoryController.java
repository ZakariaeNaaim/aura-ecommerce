package orgcom.auraecommerceapi.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import orgcom.auraecommerceapi.entities.Category;
import orgcom.auraecommerceapi.services.fasad.CategoryService;
import orgcom.auraecommerceapi.services.fasad.ProductService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/categories")
@RestController
public class CategoryController {
    private CategoryService _categoryService;
    public CategoryController(CategoryService categoryService) {

        _categoryService = categoryService;
    }

    @GetMapping("/getProducts")
    public ResponseGenericResult<List<Category>> getAllCategories() {
        return _categoryService.getAllCategories();
    }
}

package orgcom.auraecommerceapi.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import orgcom.auraecommerceapi.entities.Category;
import orgcom.auraecommerceapi.services.fasad.CategoryService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;

@RequestMapping("/categories")
@RestController
public class CategoryController {
    private final CategoryService _categoryService;
    public CategoryController(CategoryService categoryService) {

        _categoryService = categoryService;
    }

    @GetMapping("/getAllCategories")
    public ResponseGenericResult<List<Category>> getAllCategories() {
        return _categoryService.getAllCategories();
    }
}

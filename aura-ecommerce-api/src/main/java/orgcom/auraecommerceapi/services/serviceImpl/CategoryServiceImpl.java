package orgcom.auraecommerceapi.services.serviceImpl;

import org.springframework.stereotype.Service;
import orgcom.auraecommerceapi.entities.Category;
import orgcom.auraecommerceapi.repositories.CategoryRepository;
import orgcom.auraecommerceapi.repositories.OrderRepository;
import orgcom.auraecommerceapi.services.fasad.CategoryService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;
import java.util.logging.Logger;

@Service
public class CategoryServiceImpl implements CategoryService {

    private Logger logger = Logger.getLogger(this.getClass().getName());
    private CategoryRepository _categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {

        this._categoryRepository = categoryRepository;
    }

    @Override
    public ResponseGenericResult<List<Category>> getAllCategories() {
        logger.info("executing methode getAllCategories");
        try {
            List<Category> categories = _categoryRepository.findAll();
            if (categories == null && categories.isEmpty()) {
                throw new RuntimeException();
            }
            return new ResponseGenericResult<List<Category>>(categories);
        }catch (Exception ex){
            throw new RuntimeException();
        }finally {
            logger.info("methode executed getAllCategories");
        }

    }
}

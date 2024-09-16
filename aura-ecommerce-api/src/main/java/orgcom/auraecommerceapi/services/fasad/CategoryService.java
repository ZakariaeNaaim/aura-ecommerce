package orgcom.auraecommerceapi.services.fasad;

import orgcom.auraecommerceapi.entities.Category;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;

public interface CategoryService {
    ResponseGenericResult<List<Category>> getAllCategories();
}

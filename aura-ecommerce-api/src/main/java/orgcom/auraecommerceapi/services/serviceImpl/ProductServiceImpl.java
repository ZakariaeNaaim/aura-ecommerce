package orgcom.auraecommerceapi.services.serviceImpl;

import org.springframework.stereotype.Service;
import orgcom.auraecommerceapi.entities.Order;
import orgcom.auraecommerceapi.entities.Product;
import orgcom.auraecommerceapi.repositories.OrderRepository;
import orgcom.auraecommerceapi.repositories.ProductRepository;
import orgcom.auraecommerceapi.services.fasad.ProductService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.UUID;
import java.util.logging.Logger;

@Service
public class ProductServiceImpl implements ProductService {

    private Logger logger = Logger.getLogger(this.getClass().getName());
    private ProductRepository _productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this._productRepository = productRepository;
    }

    @Override
    public ResponseGenericResult<Boolean> saveProduct(Product product) {
        logger.info("methode executing saveProduct "+ product.getName());
        try {
            product.setId( UUID.randomUUID());
            Product savedProduct = _productRepository.save(product);
            if(savedProduct != null) {
                return new ResponseGenericResult<Boolean>(true, "product saved successfully");
            }
            return new ResponseGenericResult<Boolean>(false, "product is not saved");

        }catch (Exception e){
            throw new RuntimeException();
        }finally {
            logger.info("methode executed saveProduct "+ product.getName());
        }
    }
}

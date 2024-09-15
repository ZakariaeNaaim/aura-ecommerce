package orgcom.auraecommerceapi.services.serviceImpl;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import orgcom.auraecommerceapi.dtos.ProductRequestDto;
import orgcom.auraecommerceapi.entities.*;
import orgcom.auraecommerceapi.mappers.ProductMapper;
import orgcom.auraecommerceapi.repositories.*;
import orgcom.auraecommerceapi.services.fasad.ProductService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;

@Service
public class ProductServiceImpl implements ProductService {

    private Logger logger = Logger.getLogger(this.getClass().getName());
    private ProductRepository _productRepository;
    private CategoryRepository _categoryRepository;
    private FileTypeRepository _fileTypeRepository;
    private FileRepository _fileRepository;

    private ProductMapper _productMapper;

    public ProductServiceImpl(ProductRepository productRepository,ProductMapper productMapper
                ,CategoryRepository categoryRepository,FileTypeRepository fileTypeRepository,FileRepository fileRepository) {
        this._productRepository = productRepository;
        this._categoryRepository = categoryRepository;
        this._productMapper = productMapper;
        this._fileTypeRepository = fileTypeRepository;
        this._fileRepository = fileRepository;
    }

    @Override
    public ResponseGenericResult<Boolean> saveProduct(ProductRequestDto productRequestDto, MultipartFile image) {
        logger.info("methode executing saveProduct "+ productRequestDto.getName());
        try {
            Product product = _productMapper.toProduct(productRequestDto);
            Optional<Category> category = _categoryRepository.findById(productRequestDto.getCategoryId());

            if(category.isPresent()) {
                product.setCategory(category.get());
            }else {
                throw new RuntimeException("Category not found");
            }
            if(!image.isEmpty()){
                try {
                    byte[] imageBytes = image.getBytes();
                    FileType fileType = _fileTypeRepository.findByLibelle(image.getOriginalFilename().substring(
                            image.getOriginalFilename().lastIndexOf(".") + 1
                    ).toLowerCase());
                    File file = File.builder()
                            .fileName(image.getOriginalFilename())
                            .addedBy("mouhcine")
                            .addedOn(new Date())
                            .content(imageBytes)
                            .fileType(fileType).build();
                    File savedFile = _fileRepository.save(file);
                    if(savedFile != null) {
                        product.setProductImage(file);
                    }else {
                        throw new RuntimeException("Failed to save file");
                    }
                } catch (IOException e) {
                    throw new RuntimeException("Failed to read image file");
                }
            }

            Product savedProduct = _productRepository.save(product);
            if(savedProduct != null) {
                return new ResponseGenericResult<Boolean>(true, "product saved successfully");
            }
            return new ResponseGenericResult<Boolean>(false, "product is not saved");

        }catch (Exception e){
            throw new RuntimeException();
        }finally {
            logger.info("methode executed saveProduct "+ productRequestDto.getName());
        }
    }

    @Override
    public ResponseGenericResult<List<Product>> getAllProducts() {
        logger.info("methode executing getAllProducts ");
        try {
            List<Product> products = _productRepository.findAll();
            return new ResponseGenericResult<>(products);
        }catch (Exception ex){
            throw new RuntimeException("Failed to get products");
        }finally {
            logger.info("methode executed getAllProducts ");
        }
    }
}

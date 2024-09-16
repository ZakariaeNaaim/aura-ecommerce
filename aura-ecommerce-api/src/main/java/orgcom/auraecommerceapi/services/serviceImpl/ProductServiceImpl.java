package orgcom.auraecommerceapi.services.serviceImpl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import orgcom.auraecommerceapi.dtos.ProductRequestDto;
import orgcom.auraecommerceapi.entities.*;
import orgcom.auraecommerceapi.mappers.ProductMapper;
import orgcom.auraecommerceapi.repositories.*;
import orgcom.auraecommerceapi.services.fasad.ProductService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.io.IOException;
import java.util.*;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final FileTypeRepository fileTypeRepository;
    private final FileRepository fileRepository;
    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper,
                              CategoryRepository categoryRepository, FileTypeRepository fileTypeRepository,
                              FileRepository fileRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productMapper = productMapper;
        this.fileTypeRepository = fileTypeRepository;
        this.fileRepository = fileRepository;
    }

    @Override
    public ResponseGenericResult<Boolean> saveProduct(ProductRequestDto productRequestDto, MultipartFile image) {
        log.info("Executing saveProduct for: {}", productRequestDto.getName());
        return handleProductSaveOrUpdate(productRequestDto, image, false);
    }

    @Override
    public ResponseGenericResult<List<Product>> getAllProducts() {
        log.info("Executing getAllProducts");
        try {
            List<Product> products = productRepository.findAll();
            return new ResponseGenericResult<>(products);
        } catch (Exception e) {
            log.error("Error retrieving all products", e);
            throw new RuntimeException("Failed to get products", e);
        } finally {
            log.info("Executed getAllProducts");
        }
    }

    @Override
    public ResponseGenericResult<Boolean> updateProduct(ProductRequestDto productRequestDto, MultipartFile image) {
        log.info("Executing updateProduct for: {}", productRequestDto.getName());
        return handleProductSaveOrUpdate(productRequestDto, image, true);
    }

    @Override
    public ResponseGenericResult<Boolean> deleteProduct(ArrayList<Long> ids) {
        try {
            ids.forEach(productRepository::deleteById);

            log.info("Products deleted successfully with IDs: {}", ids);
            return new ResponseGenericResult<>(true, "Products deleted successfully.");
        } catch (Exception e) {
            log.error("Error deleting products with IDs: {}", ids, e);
            return new ResponseGenericResult<>(false, "Failed to delete products.");
        }
    }


    private ResponseGenericResult<Boolean> handleProductSaveOrUpdate(ProductRequestDto productRequestDto, MultipartFile image, boolean isUpdate) {
        try {
            Product product;
            if (isUpdate) {
                if (!productRepository.existsById(productRequestDto.getId())) {
                    throw new RuntimeException("Product not found");
                }
            }
            product = productMapper.toProduct(productRequestDto);

            Category category = categoryRepository.findById(productRequestDto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);

            if (!image.isEmpty()) {
                File savedFile = saveImageFile(image);
                product.setProductImage(savedFile);
            }

            productRepository.save(product);
            return new ResponseGenericResult<>(true, isUpdate ? "Product updated successfully." : "Product saved successfully.");

        } catch (Exception e) {
            log.error("Error {} product: {}", isUpdate ? "updating" : "saving", productRequestDto.getName(), e);
            throw new RuntimeException("Error " + (isUpdate ? "updating" : "saving") + " product", e);
        } finally {
            log.info("Executed {}Product for: {}", isUpdate ? "update " : "", productRequestDto.getName());
        }
    }

    private File saveImageFile(MultipartFile image) throws IOException {
        byte[] imageBytes = image.getBytes();
        String fileExtension = getFileExtension(Objects.requireNonNull(image.getOriginalFilename()));
        FileType fileType = fileTypeRepository.findByLibelle(fileExtension.toLowerCase());

        File file = File.builder()
                .fileName(image.getOriginalFilename())
                .addedOn(new Date())
                .content(imageBytes)
                .fileType(fileType)
                .build();

        return Optional.of(fileRepository.save(file))
                .orElseThrow(() -> new RuntimeException("Failed to save file"));
    }

    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }
}

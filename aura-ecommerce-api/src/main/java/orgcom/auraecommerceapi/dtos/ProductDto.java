package orgcom.auraecommerceapi.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import orgcom.auraecommerceapi.entities.Category;
import orgcom.auraecommerceapi.entities.Product;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class ProductDto implements Serializable {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Double quantity;
    private String inventoryStatus;
    private Category category;
    private byte[] imageBlob;  // To hold the image as a BLOB
    private String imageType;


    public ProductDto(Product product, byte[] imageBlob) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.quantity = product.getQuantity();
        this.inventoryStatus = product.getInventoryStatus();
        this.imageBlob = imageBlob;
        this.imageType = product.getProductImage().getFileType().getLibelle();
        this.category = product.getCategory();
    }
}

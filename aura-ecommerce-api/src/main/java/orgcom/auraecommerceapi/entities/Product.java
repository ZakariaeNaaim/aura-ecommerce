package orgcom.auraecommerceapi.entities;

import jakarta.persistence.*;
import lombok.*;
import orgcom.auraecommerceapi.enums.ProductStatus;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Product implements Serializable {
    @Id
    private UUID id;
    private String name;
    private String description;
    private Double price;
    private Double quantity;
    @Enumerated(EnumType.STRING)
    private ProductStatus productStatus;
    @ManyToOne
    private File productImage;
    @ManyToOne
    private Category category;

}

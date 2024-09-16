package orgcom.auraecommerceapi.dtos;

import lombok.*;

@Getter
@Setter
public class ProductRequestDto {
    private Long id;
    private String name;
    private String description;
    private double price;
    private double quantity;
    private int categoryId;
}

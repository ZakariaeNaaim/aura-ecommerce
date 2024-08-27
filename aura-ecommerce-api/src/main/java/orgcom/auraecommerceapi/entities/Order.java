package orgcom.auraecommerceapi.entities;

import jakarta.persistence.*;
import lombok.*;
import orgcom.auraecommerceapi.enums.OrderEtatEnum;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Getter @Setter @ToString @AllArgsConstructor @NoArgsConstructor
public class Order implements Serializable {
    @Id
    private UUID Id;
    private String reference;
    private double totalCommand;
    @Enumerated(EnumType.STRING)
    private OrderEtatEnum etat;

}

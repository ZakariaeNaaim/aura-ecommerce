package orgcom.auraecommerceapi.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import orgcom.auraecommerceapi.enums.OrderEtatEnum;
import orgcom.auraecommerceapi.security.entities.User;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Getter @Setter @Builder @ToString @AllArgsConstructor @NoArgsConstructor
public class Order implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String reference;
    private double totalCommand;
    @Enumerated(EnumType.STRING)
    private OrderEtatEnum etat;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date orderDate;
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

}

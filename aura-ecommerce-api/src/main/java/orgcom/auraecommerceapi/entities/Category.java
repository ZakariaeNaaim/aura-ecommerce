package orgcom.auraecommerceapi.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.io.Serializable;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Category implements Serializable {
    @Id
    private int id;
    private String libelle;
}

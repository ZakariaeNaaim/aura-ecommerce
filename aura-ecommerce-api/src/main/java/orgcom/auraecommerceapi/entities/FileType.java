package orgcom.auraecommerceapi.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FileType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String libelle;
}

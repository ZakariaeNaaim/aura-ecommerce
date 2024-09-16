package orgcom.auraecommerceapi.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.sql.Blob;
import java.util.Date;
import java.util.UUID;

@Entity
@Getter
@Setter @Builder @ToString @AllArgsConstructor @NoArgsConstructor
public class File implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] content;
    private String fileName;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date addedOn;
    @ManyToOne(fetch = FetchType.LAZY)
    private FileType fileType;
}

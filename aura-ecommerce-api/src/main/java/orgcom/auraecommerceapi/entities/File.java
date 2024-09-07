package orgcom.auraecommerceapi.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.sql.Blob;
import java.util.Date;

@Entity
@Getter
@Setter @ToString @AllArgsConstructor @NoArgsConstructor
public class File implements Serializable {
    @Id
    private int id;
    @Lob
    private byte[] content;
    private String fileName;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date addedOn;
    private String addedBy;
    @ManyToOne(fetch = FetchType.LAZY)
    private FileType fileType;
}

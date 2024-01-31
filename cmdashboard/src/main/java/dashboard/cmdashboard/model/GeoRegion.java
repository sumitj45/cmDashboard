package dashboard.cmdashboard.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;




@Data
@Entity
public class GeoRegion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long geoId;

    private String geoName;


//with contract...
    @OneToMany(mappedBy = "geoRegion")
    private List<Contract> contracts;
}


package dashboard.cmdashboard.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "contractId")
public class Contract {

    @JsonIgnoreProperties("contracts")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contractId;

    // Many to One relation with CustomerManager
    @ManyToOne
    @JoinColumn(name = "contract_manager_id")
    @JsonIdentityReference(alwaysAsId = true)
    private CustomerManager customerManager;

    private Date contractExpiringDate;
    private Double acv;

    // Many to One relation with GeoRegion
    @ManyToOne
    @JoinColumn(name = "contract_region_id")
    private GeoRegion geoRegion;
}

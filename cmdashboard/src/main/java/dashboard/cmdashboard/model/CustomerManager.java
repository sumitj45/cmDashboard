package dashboard.cmdashboard.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
@Data
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "managerId")
public class CustomerManager {

    @JsonIgnoreProperties("customerManager")
    @JsonManagedReference
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "managerId")
    private Long managerId;

    private String managerName;

    @ManyToOne
    @JoinColumn(name = "parent_manager_id")
    private CustomerManager parentManager; // Self-referencing relationship

    @JsonIgnore
    @OneToMany(mappedBy = "customerManager", cascade = CascadeType.ALL)
    @JsonIdentityReference(alwaysAsId = true)
    private List<Contract> contracts; // One-to-Many relationship with contract

    // new field add kra hai yaha
    


}
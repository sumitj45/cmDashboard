package dashboard.cmdashboard.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dashboard.cmdashboard.model.Contract;


@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {

 @Query("SELECT c.contractId, cm.managerName, gr.geoName, c.contractExpiringDate,c.acv " +
           "FROM Contract c JOIN c.customerManager cm JOIN c.geoRegion gr")
    List<Object[]> findContractDetails();
    

}

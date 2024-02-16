package dashboard.cmdashboard.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dashboard.cmdashboard.model.Contract;
import dashboard.cmdashboard.model.ManagerSummary;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {

 @Query("SELECT c.contractId, cm.managerName, gr.geoName, c.contractExpiringDate,c.acv " +
           "FROM Contract c JOIN c.customerManager cm JOIN c.geoRegion gr")
    List<Object[]> findContractDetails();


  //summarymanager
//   @Query("SELECT new dashboard.cmdashboard.model.ManagerSummary(pm1_0.managerName, cm1_0.managerName, COUNT(c1_0.contractId), SUM(c1_0.acv)) " +
//   "FROM Contract c1_0 " +
//   "JOIN c1_0.customerManager cm1_0 " +
//   "JOIN cm1_0.parentManager pm1_0 " +
//   "GROUP BY pm1_0.managerName, cm1_0.managerName")
// List<ManagerSummary> groupByManagerNameAndACV();
}



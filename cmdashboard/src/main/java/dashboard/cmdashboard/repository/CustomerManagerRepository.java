package dashboard.cmdashboard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dashboard.cmdashboard.model.CustomerManager;
import dashboard.cmdashboard.model.ManagerSummary;


@Repository
public interface CustomerManagerRepository extends JpaRepository<CustomerManager, Long> {
    // You can add custom queries if needed
    @Query("SELECT new dashboard.cmdashboard.model.ManagerSummary(cm.managerName, COUNT(cm.managerName), SUM(c.acv)) " +
       "FROM CustomerManager cm JOIN cm.contracts c " +
       "GROUP BY cm.managerName")
    List<ManagerSummary> getManagerSummary();
}

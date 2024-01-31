package dashboard.cmdashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dashboard.cmdashboard.model.CustomerManager;

@Repository
public interface CustomerManagerRepository extends JpaRepository<CustomerManager, Long> {
    // You can add custom queries if needed
  
}

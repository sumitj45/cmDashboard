package dashboard.cmdashboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dashboard.cmdashboard.model.CustomerManager;
import dashboard.cmdashboard.model.ManagerSummary;
import dashboard.cmdashboard.repository.CustomerManagerRepository;

@Service
public class CustomerManagerService {

    @Autowired
    private CustomerManagerRepository customerManagerRepository;

    // Get all managers
    public List<CustomerManager> getAllManagers() {
        return customerManagerRepository.findAll();
    }

    // Create a new manager
    public CustomerManager createManager(CustomerManager customerManager) {
        // Save the new customerManager
        return customerManagerRepository.save(customerManager);
    }

    // //
    public List<ManagerSummary> getManagerSummary() {
        return customerManagerRepository.getManagerSummary();
    }
    
}

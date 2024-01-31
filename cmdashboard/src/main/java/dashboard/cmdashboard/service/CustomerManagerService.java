package dashboard.cmdashboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dashboard.cmdashboard.model.CustomerManager;
import dashboard.cmdashboard.repository.CustomerManagerRepository;



@Service
public class CustomerManagerService {

    @Autowired
    private CustomerManagerRepository customerManagerRepository;

    //for Get Method
    public List<CustomerManager> getAllManagers() {
        return customerManagerRepository.findAll();
    }
//for post Method..
    public CustomerManager createManager(CustomerManager customerManager) {
        // save the new customerManager
        return customerManagerRepository.save(customerManager);
    }
}
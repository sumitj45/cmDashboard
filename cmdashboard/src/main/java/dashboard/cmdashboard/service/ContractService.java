package dashboard.cmdashboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dashboard.cmdashboard.model.Contract;
import dashboard.cmdashboard.model.ManagerSummary;
import dashboard.cmdashboard.repository.ContractRepository;
// import jakarta.persistence.EntityManager;
// import jakarta.persistence.TypedQuery;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }

    public void updateContracts(List<Contract> contracts) {
        contractRepository.saveAll(contracts);
    }

    
    public List<Object[]> getContractDetails() {
        return contractRepository.findContractDetails();
    }

    //summary
    // public List<ManagerSummary> groupByManagerNameAndACV() {
    //     return contractRepository.groupByManagerNameAndACV();
    // }

  
}


package dashboard.cmdashboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dashboard.cmdashboard.model.Contract;
import dashboard.cmdashboard.repository.ContractRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.util.List;

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

  
}


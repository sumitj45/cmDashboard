package dashboard.cmdashboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dashboard.cmdashboard.model.Contract;
import dashboard.cmdashboard.model.CustomerManager;
import dashboard.cmdashboard.model.GeoRegion;
import dashboard.cmdashboard.model.ManagerSummary;
import dashboard.cmdashboard.service.ContractService;
import dashboard.cmdashboard.service.CustomerManagerService;
import dashboard.cmdashboard.service.GeoRegionService;


@RestController
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    private ContractService contractService;

    @Autowired
    private CustomerManagerService customerManagerService;

    @Autowired
    private GeoRegionService geoRegionService;

    // CORS
    @CrossOrigin(origins = "http://localhost:5173")
 //contracts
    @GetMapping("/contracts")
    public List<Contract> getContracts() {
        return contractService.getAllContracts();
    }

    @PostMapping("/contracts")
    public void updateContracts(@RequestBody List<Contract> contracts) {
        contractService.updateContracts(contracts);
    }
//customer-Manager
    @GetMapping("/customer-managers")
    public List<CustomerManager> getCustomerManagers() {
        return customerManagerService.getAllManagers();
    }

    @PostMapping("/customer-managers")
    public ResponseEntity<CustomerManager> createCustomerManager(@RequestBody CustomerManager customerManager) {
        CustomerManager createdManager = customerManagerService.createManager(customerManager);
        return new ResponseEntity<>(createdManager, HttpStatus.CREATED);
    }
//geoRegion
    @GetMapping("/geo-regions")
    public List<GeoRegion> getGeoRegions() {
        return geoRegionService.getAllRegions();
    }

    @PostMapping("/geo-regions")
    public ResponseEntity<GeoRegion> createGeoRegion(@RequestBody GeoRegion geoRegion) {
        GeoRegion createdGeoRegion = geoRegionService.createRegion(geoRegion);
        return new ResponseEntity<>(createdGeoRegion, HttpStatus.CREATED);
    }

    //Contract-Details
    @GetMapping("/contract-details")
    public List<Object[]> getContractDetails() {
        return contractService.getContractDetails();
    }


     // Group Contracts by Manager and ACV
    //  @GetMapping("/group-by-manager")
    //  public List<ManagerSummary> groupByManagerNameAndACV() {
    //      return contractService.groupByManagerNameAndACV();
    //  }

     //
    
    @GetMapping("/summary")
    public List<ManagerSummary> getManagerSummary() {
        return customerManagerService.getManagerSummary();
    }
     

   
}

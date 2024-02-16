package dashboard.cmdashboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dashboard.cmdashboard.model.GeoRegion;
import dashboard.cmdashboard.repository.GeoRegionRepository;

@Service
public class GeoRegionService {

    @Autowired
    private GeoRegionRepository geoRegionRepository;

    public List<GeoRegion> getAllRegions() {
        return geoRegionRepository.findAll();
    }

    public GeoRegion createRegion(GeoRegion geoRegion) {
        return geoRegionRepository.save(geoRegion);
    }


    
}


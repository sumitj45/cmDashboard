package dashboard.cmdashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dashboard.cmdashboard.model.GeoRegion;

@Repository
public interface GeoRegionRepository extends JpaRepository<GeoRegion, Long> {
    // You can add custom queries if needed
}

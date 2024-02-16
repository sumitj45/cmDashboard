package dashboard.cmdashboard.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManagerSummary {
    private String managerName;
    private Long managerNameCount;
    private Double acv;
}

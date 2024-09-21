package orgcom.auraecommerceapi.services.fasad;



import org.springframework.http.ResponseEntity;
import orgcom.auraecommerceapi.entities.Order;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;

public interface DashboardService {
    ResponseEntity<List<Order>> getAllInfos(Long userId);
    ResponseGenericResult<List<Order>> getChartInfos();

}

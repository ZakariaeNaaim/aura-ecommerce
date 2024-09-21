package orgcom.auraecommerceapi.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import orgcom.auraecommerceapi.entities.Order;
import orgcom.auraecommerceapi.services.fasad.DashboardService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

  private final DashboardService dashboardService;

  DashboardController(DashboardService _dashboardService){
    dashboardService = _dashboardService;
  }

  @GetMapping("{userId}")
  public ResponseEntity<List<Order>> getAllInfos(@PathVariable Long userId) {

    return dashboardService.getAllInfos(userId);
  }

  @GetMapping("/chart")
  public  ResponseGenericResult<List<Order>> getChartInfos() {

    return dashboardService.getChartInfos();
  }
}

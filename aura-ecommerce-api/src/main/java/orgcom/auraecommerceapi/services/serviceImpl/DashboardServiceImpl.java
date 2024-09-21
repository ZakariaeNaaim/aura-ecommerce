package orgcom.auraecommerceapi.services.serviceImpl;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.ast.Or;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import orgcom.auraecommerceapi.entities.Order;
import orgcom.auraecommerceapi.enums.OrderEtatEnum;
import orgcom.auraecommerceapi.repositories.OrderRepository;
import orgcom.auraecommerceapi.services.fasad.DashboardService;
import orgcom.auraecommerceapi.services.fasad.OrderService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.logging.Logger;

@Service
@Slf4j
public class DashboardServiceImpl implements DashboardService {
    private OrderRepository orderRepository;

    public DashboardServiceImpl(OrderRepository _orderRepository) {
        orderRepository = _orderRepository;
    }


    @Override
    public ResponseEntity<List<Order>> getAllInfos(Long userId) {

        try {
            log.info("Fetching orders by user Id : "+userId +"from the database.");
            return  ResponseEntity.ok(orderRepository.findOrdersByUserId(userId));
        } catch (Exception e) {
            log.error("An error occurred while fetching all users", e);
            throw new RuntimeException("Error fetching users", e);
        }
    }

    @Override
    public ResponseGenericResult<List<Order>> getChartInfos() {
        return null;
    }
}

package orgcom.auraecommerceapi.services.fasad;



import orgcom.auraecommerceapi.entities.Order;
import orgcom.auraecommerceapi.enums.OrderEtatEnum;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import javax.xml.crypto.Data;
import java.util.List;

public interface OrderService {
    ResponseGenericResult<Boolean> saveOrder(Order order);
    ResponseGenericResult<Order> getOrder(String orderName);
    ResponseGenericResult<List<Order>> getAllOrders(Long userId);
    ResponseGenericResult<List<Order>> getCanceledOrders();
    ResponseGenericResult<List<Order>> getOrdersByDate(String orderDate);

}

package orgcom.auraecommerceapi.services.fasad;



import orgcom.auraecommerceapi.entities.Order;
import orgcom.auraecommerceapi.enums.OrderEtatEnum;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;

public interface OrderService {
    ResponseGenericResult<Boolean> saveOrder(Order order);
    ResponseGenericResult<Order> getOrder(String commandName);
    List<Order> getAllOrders();
    ResponseGenericResult<Order> annullateOrder(OrderEtatEnum orderEtatEnum);
    ResponseGenericResult<List<Order>> getAnnulatedOrders();
}

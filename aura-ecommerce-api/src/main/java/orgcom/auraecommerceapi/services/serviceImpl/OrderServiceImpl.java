package orgcom.auraecommerceapi.services.serviceImpl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import orgcom.auraecommerceapi.entities.Order;
import orgcom.auraecommerceapi.enums.OrderEtatEnum;
import orgcom.auraecommerceapi.repositories.OrderRepository;
import orgcom.auraecommerceapi.services.fasad.OrderService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public ResponseGenericResult<Boolean> saveOrder(Order order) {
        log.info("Saving order with reference: {}", order.getReference());
        try {
            orderRepository.save(order);
            log.info("Order saved successfully: {}", order.getReference());
            return new ResponseGenericResult<>(true, "Order saved successfully");
        } catch (Exception e) {
            log.error("Error saving order: {}", order.getReference(), e);
            return new ResponseGenericResult<>(false, "Failed to save order");
        }
    }

    @Override
    public ResponseGenericResult<Order> getOrder(String orderReference) {
        log.info("Fetching order by reference: {}", orderReference);
        try {
            Order order = orderRepository.findOrderByReference(orderReference);
            if (order != null) {
                log.info("Order found: {}", orderReference);
                return new ResponseGenericResult<>(order);
            }
            log.warn("Order not found: {}", orderReference);
            return new ResponseGenericResult<>(false, "Order not found");
        } catch (Exception e) {
            log.error("Error fetching order by reference: {}", orderReference, e);
            return new ResponseGenericResult<>(false, "Error fetching order");
        }
    }

    @Override
    public ResponseGenericResult<List<Order>> getAllOrders(Long userId) {
        log.info("Fetching all orders for user ID: {}", userId);
        try {
            List<Order> orders = orderRepository.findOrdersByUserId(userId);
            log.info("Orders fetched successfully for user ID: {}", userId);
            return new ResponseGenericResult<>(orders);
        } catch (Exception e) {
            log.error("Error fetching orders for user ID: {}", userId, e);
            return new ResponseGenericResult<>(false, "Error fetching orders");
        }
    }

    @Override
    public ResponseGenericResult<List<Order>> getCanceledOrders() {
        log.info("Fetching all canceled orders");
        try {
            List<Order> canceledOrders = orderRepository.findOrdersByEtat(OrderEtatEnum.CANCELED);
            log.info("Canceled orders fetched successfully");
            return new ResponseGenericResult<>(canceledOrders);
        } catch (Exception e) {
            log.error("Error fetching canceled orders", e);
            return new ResponseGenericResult<>(false, "Error fetching canceled orders");
        }
    }

    @Override
    public ResponseGenericResult<List<Order>> getOrdersByDate(String orderDateString) {
        log.info("Fetching orders by date: {}", orderDateString);
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MMM/yyyy", Locale.ENGLISH);
            Date orderDate = formatter.parse(orderDateString);
            List<Order> orders = orderRepository.findOrdersByOrderDate(orderDate);
            log.info("Orders fetched successfully for date: {}", orderDateString);
            return new ResponseGenericResult<>(orders);
        } catch (ParseException e) {
            log.error("Invalid date format: {}", orderDateString, e);
            return new ResponseGenericResult<>(false, "Invalid date format");
        } catch (Exception e) {
            log.error("Error fetching orders by date: {}", orderDateString, e);
            return new ResponseGenericResult<>(false, "Error fetching orders by date");
        }
    }
}

package orgcom.auraecommerceapi.controllers;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import orgcom.auraecommerceapi.entities.Order;
import orgcom.auraecommerceapi.security.entities.User;
import orgcom.auraecommerceapi.services.fasad.OrderService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;

@RequestMapping("/orders")
@RestController
public class OrderController {

    @Value("${custom.property}")
    private String customProperty;
    private OrderService _orderService;
    public OrderController(OrderService orderService) {

        _orderService = orderService;
    }

    @GetMapping("getOrders")
    public ResponseGenericResult<List<Order>> getOrders() {
        return _orderService.getAllOrders() ;
    }

    @PostMapping("/saveOrder")
    public ResponseGenericResult<Boolean> saveOrder(@RequestBody Order order) {
        return _orderService.saveOrder(order);
    }

    @GetMapping("/getOrder")
    public ResponseGenericResult<Order> getOrder(@PathVariable String orderReference) {
        return _orderService.getOrder(orderReference);
    }

    @GetMapping("/getAnnulatedOrders")
    public ResponseGenericResult<List<Order>> getAnnulatedOrders() {
        return _orderService.getAnnulatedOrders();
    }

    @GetMapping("/getOrderByDate")
    public ResponseGenericResult<List<Order>> getOrderByDate(@RequestHeader String date) {
        return _orderService.getOrdersByDate(date);
    }
}

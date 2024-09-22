package orgcom.auraecommerceapi.controllers;


import org.springframework.web.bind.annotation.*;
import orgcom.auraecommerceapi.entities.Order;
import orgcom.auraecommerceapi.services.fasad.OrderService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;

@RequestMapping("/orders")
@RestController
public class OrderController {

    private final OrderService _orderService;
    public OrderController(OrderService orderService) {
        _orderService = orderService;
    }


    @GetMapping("/{userId}")
    public ResponseGenericResult<List<Order>> getOrders(@PathVariable Long userId) {
        return _orderService.getAllOrders(userId) ;
    }

    @PostMapping
    public ResponseGenericResult<Boolean> saveOrder(@RequestBody Order order) {
        return _orderService.saveOrder(order);
    }

    @GetMapping("/getCanceledOrders")
    public ResponseGenericResult<List<Order>> getCanceledOrders() {
        return _orderService.getCanceledOrders();
    }

    @GetMapping("/getOrderByDate")
    public ResponseGenericResult<List<Order>> getOrderByDate(@RequestHeader String date) {
        return _orderService.getOrdersByDate(date);
    }
}

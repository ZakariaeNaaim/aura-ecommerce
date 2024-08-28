package orgcom.auraecommerceapi.controllers;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import orgcom.auraecommerceapi.services.fasad.OrderService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/orders")
@RestController
public class OrderController {

    @Value("${custom.property}")
    private String customProperty;
    private OrderService _orderService;
    public OrderController(OrderService orderService) {

        _orderService = orderService;
    }

    @GetMapping("/test")
    public String testConfig() {
        return "Custom Property Value: " + customProperty;
    }
}

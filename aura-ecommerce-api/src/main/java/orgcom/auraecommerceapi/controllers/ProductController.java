package orgcom.auraecommerceapi.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import orgcom.auraecommerceapi.entities.Order;
import orgcom.auraecommerceapi.services.fasad.OrderService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/products")
@RestController
public class ProductController {
    private OrderService _orderService;
    public ProductController(OrderService orderService) {

        _orderService = orderService;
    }

    @GetMapping("getProducts")
    public ResponseGenericResult<List<Order>> getOrders() {
        return _orderService.getAllOrders() ;
    }
}

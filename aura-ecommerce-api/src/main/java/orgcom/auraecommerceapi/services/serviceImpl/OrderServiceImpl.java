package orgcom.auraecommerceapi.services.serviceImpl;

import org.springframework.stereotype.Service;
import orgcom.auraecommerceapi.entities.Order;
import orgcom.auraecommerceapi.enums.OrderEtatEnum;
import orgcom.auraecommerceapi.repositories.OrderRepository;
import orgcom.auraecommerceapi.services.fasad.OrderService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import javax.xml.crypto.Data;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.logging.Logger;

@Service
public class OrderServiceImpl implements OrderService {
    private Logger logger = Logger.getLogger(this.getClass().getName());
    private OrderRepository _orderRepository;

    public OrderServiceImpl(OrderRepository _orderRepository) {
        this._orderRepository = _orderRepository;
    }

    @Override
    public ResponseGenericResult<Boolean> saveOrder(Order order) {
        logger.info("save Order "+ order.getReference());
        try {
            Order saved = _orderRepository.save(order);
            if(saved != null) {
                return new ResponseGenericResult<Boolean>(true, "command saved successfully");
            }
            return new ResponseGenericResult<Boolean>(false, "command is not saved");

        }catch (Exception e){
            throw new RuntimeException();
        }finally {
            logger.info("command saved successefully");
        }
    }

    @Override
    public ResponseGenericResult<Order> getOrder(String orderReference) {
        logger.info("Executing methode  getCommand by reference: " + orderReference);
        try {
            Order order = _orderRepository.findOrderByReference(orderReference);
            if(order != null) {
                return new ResponseGenericResult<Order>(order);
            }
            return new ResponseGenericResult<Order>(null);
        }catch (Exception e){
            throw new RuntimeException();
        }finally {
            logger.info("methode executed; getCommand");
        }
    }

    @Override
    public ResponseGenericResult<List<Order>> getAllOrders() {
        logger.info("Executing methode  getAllOrders" );
        try {
            return new ResponseGenericResult<>(_orderRepository.findAll());
        }catch (Exception ex){
            throw new RuntimeException();
        }finally {
            logger.info("methode Executed  getAllOrders" );
        }
    }


    @Override
    public ResponseGenericResult<List<Order>> getAnnulatedOrders() {
        logger.info("Executing methode  getAnnulatedCommands" );
        try {
            List<Order> orders = _orderRepository.findOrdersByEtat(OrderEtatEnum.ANNULE);
            if(orders != null) {
                return new ResponseGenericResult<List<Order>>(orders);
            }
            return new ResponseGenericResult<List<Order>>(null);
        }catch (Exception e){
            throw new RuntimeException();
        }finally {
            logger.info("methode executed; getAnnulatedCommands");
        }
    }

    @Override
    public ResponseGenericResult<List<Order>> getOrdersByDate(String StringOrderDate) {
        logger.info("Executing methode  getOrderByDate" );
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MMM/yyyy", Locale.FRENCH);
            Date orderDate = formatter.parse(StringOrderDate);
            List<Order> ordersByOrderDate = _orderRepository.findOrdersByOrderDate(orderDate);
            return  new ResponseGenericResult<>(ordersByOrderDate);
        }catch (Exception ex){
            throw new RuntimeException();
        }finally {
            logger.info("methode Executed  getOrdersByDate" );
        }
    }
}

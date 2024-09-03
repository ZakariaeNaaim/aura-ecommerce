package orgcom.auraecommerceapi.services.serviceImpl;

import org.springframework.stereotype.Service;
import orgcom.auraecommerceapi.entities.Order;
import orgcom.auraecommerceapi.enums.OrderEtatEnum;
import orgcom.auraecommerceapi.repositories.OrderRepository;
import orgcom.auraecommerceapi.services.fasad.OrderService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;
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
        logger.info("save command");
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
    public ResponseGenericResult<Order> getOrder(String commandReference) {
        logger.info("Executing methode  getCommand by reference: " + commandReference);
        try {
            Order order = _orderRepository.findCommandByReference(commandReference);
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
    public List<Order> getAllOrders() {
        return _orderRepository.findAll();
    }

    @Override
    public ResponseGenericResult<Order> annullateOrder(OrderEtatEnum orderEtatEnum) {
        logger.info("Executing methode  annullateCommand by etat: " + orderEtatEnum);
        try {
            Order order = _orderRepository.findOrderByEtat(OrderEtatEnum.ANNULE);
            if(order != null) {
                return new ResponseGenericResult<Order>(order);
            }
            return new ResponseGenericResult<Order>(null);
        }catch (Exception e){
            throw new RuntimeException();
        }finally {
            logger.info("methode executed; annullateCommand");
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
}

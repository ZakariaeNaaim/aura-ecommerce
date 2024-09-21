package orgcom.auraecommerceapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import orgcom.auraecommerceapi.entities.Order;
import orgcom.auraecommerceapi.enums.OrderEtatEnum;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findOrderByReference(String reference);
    List<Order> findOrdersByEtat(OrderEtatEnum etat);
    List<Order> findOrdersByOrderDate(Date orderDate);

    List<Order> findOrdersByUserId(Long userId);
}

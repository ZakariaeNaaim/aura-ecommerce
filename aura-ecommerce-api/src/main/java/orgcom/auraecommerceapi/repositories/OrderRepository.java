package orgcom.auraecommerceapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import orgcom.auraecommerceapi.entities.Order;
import orgcom.auraecommerceapi.enums.OrderEtatEnum;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findCommandByReference(String reference);
    Order findOrderByEtat(OrderEtatEnum etat);
    List<Order> findOrdersByEtat(OrderEtatEnum etat);
}

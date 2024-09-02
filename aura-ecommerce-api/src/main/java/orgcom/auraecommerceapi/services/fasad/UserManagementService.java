package orgcom.auraecommerceapi.services.fasad;

import orgcom.auraecommerceapi.security.entities.User;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;

public interface UserManagementService {
    List<User> getAllUsers();
    ResponseGenericResult<Boolean> saveUser(User user);
    ResponseGenericResult<Boolean> deleteUser(Long id);
    ResponseGenericResult<Boolean> updateUser(User user);
}

package orgcom.auraecommerceapi.services.serviceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import orgcom.auraecommerceapi.security.entities.User;
import orgcom.auraecommerceapi.security.repository.UserRepository;
import orgcom.auraecommerceapi.services.fasad.UserManagementService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserManagementServiceImpl implements UserManagementService {
    private final UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        try {
            log.info("Fetching all users from the database.");
            return userRepository.findAll();
        } catch (Exception e) {
            log.error("An error occurred while fetching all users", e);
            throw new RuntimeException("Error fetching users", e);
        }
    }

    @Override
    public ResponseGenericResult<Boolean> saveUser(User user) {
        try {
            userRepository.save(user);
            log.info("User saved successfully: {}", user.getUsername());
            return new ResponseGenericResult<>(true, "User saved successfully.");
        } catch (Exception e) {
            log.error("Error saving user: {}", user.getUsername(), e);
            return new ResponseGenericResult<>(false, "Failed to save user.");
        }
    }

    @Override
    public ResponseGenericResult<Boolean> deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
            log.info("User deleted successfully with id: {}", id);
            return new ResponseGenericResult<>(true, "User deleted successfully.");
        } catch (Exception e) {
            log.error("Error deleting user with id: {}", id, e);
            return new ResponseGenericResult<>(false, "Failed to delete user.");
        }
    }

    @Override
    public ResponseGenericResult<Boolean> updateUser(User user) {
        try {
            if (userRepository.existsById(user.getId())) {
                userRepository.save(user);
                log.info("User updated successfully: {}", user.getUsername());
                return new ResponseGenericResult<>(true, "User updated successfully.");
            } else {
                log.warn("User not found: {}", user.getUsername());
                return new ResponseGenericResult<>(false, "User not found.");
            }
        } catch (Exception e) {
            log.error("Error updating user: {}", user.getUsername(), e);
            return new ResponseGenericResult<>(false, "Failed to update user.");
        }
    }

}
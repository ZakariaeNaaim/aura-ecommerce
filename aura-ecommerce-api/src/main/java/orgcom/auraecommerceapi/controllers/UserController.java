package orgcom.auraecommerceapi.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import orgcom.auraecommerceapi.security.entities.User;
import orgcom.auraecommerceapi.services.fasad.UserManagementService;
import orgcom.auraecommerceapi.shared.ResponseGenericResult;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/users")
@RestController
public class UserController {

    private final UserManagementService _userManagementService;
    public UserController(UserManagementService userManagementService) {

        _userManagementService = userManagementService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(_userManagementService.getAllUsers()) ;
    }

    @PostMapping
    public ResponseGenericResult<Boolean> createUser(@RequestBody User user) {
        return _userManagementService.saveUser(user);
    }

    @PutMapping
    public ResponseGenericResult<Boolean> updateUser( @RequestBody User user) {
        return _userManagementService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public ResponseGenericResult<Boolean> deleteUser(@PathVariable Long id) {
        return _userManagementService.deleteUser(id);
    }
}

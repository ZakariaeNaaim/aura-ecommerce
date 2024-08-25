package orgcom.auraecommerceapi.security.controllers;


import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import orgcom.auraecommerceapi.security.payload.request.LoginRequest;
import orgcom.auraecommerceapi.security.payload.request.SignupRequest;
import orgcom.auraecommerceapi.security.services.impl.AuthServiceImpl;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController 
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthServiceImpl authServiceImpl;

  AuthController(AuthServiceImpl authService) {
    this.authServiceImpl = authService;
  }

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    return authServiceImpl.authenticateUser(loginRequest);
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    return authServiceImpl.registerUser(signUpRequest);
  }

}

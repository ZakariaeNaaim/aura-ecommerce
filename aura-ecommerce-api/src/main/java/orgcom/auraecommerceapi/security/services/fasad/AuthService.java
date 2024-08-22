package orgcom.auraecommerceapi.security.services.fasad;

import org.springframework.http.ResponseEntity;
import orgcom.auraecommerceapi.security.payload.request.LoginRequest;
import orgcom.auraecommerceapi.security.payload.request.SignupRequest;

public interface AuthService {
     ResponseEntity<?> authenticateUser(LoginRequest loginRequest);
     ResponseEntity<?> registerUser(SignupRequest signUpRequest);
}

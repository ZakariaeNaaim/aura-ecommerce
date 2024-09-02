package orgcom.auraecommerceapi.security.services.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import orgcom.auraecommerceapi.security.entities.ERole;
import orgcom.auraecommerceapi.security.entities.Role;
import orgcom.auraecommerceapi.security.entities.User;
import orgcom.auraecommerceapi.security.payload.request.LoginRequest;
import orgcom.auraecommerceapi.security.payload.request.SignupRequest;
import orgcom.auraecommerceapi.security.payload.response.JwtResponse;
import orgcom.auraecommerceapi.security.payload.response.MessageResponse;
import orgcom.auraecommerceapi.security.repository.RoleRepository;
import orgcom.auraecommerceapi.security.repository.UserRepository;
import orgcom.auraecommerceapi.security.sec.jwt.JwtUtils;
import orgcom.auraecommerceapi.security.sec.services.UserDetailsImpl;
import orgcom.auraecommerceapi.security.services.fasad.AuthService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

     AuthenticationManager authenticationManager;
     JwtUtils jwtUtils;
     UserRepository userRepository;
     RoleRepository roleRepository;
     PasswordEncoder encoder;


     @Override
     public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
          Authentication authentication = authenticationManager.authenticate(
                  new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

          SecurityContextHolder.getContext().setAuthentication(authentication);
          String jwt = jwtUtils.generateJwtToken(authentication);

          UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
          List<String> roles = userDetails.getAuthorities().stream()
                  .map(item -> item.getAuthority())
                  .collect(Collectors.toList());

          return ResponseEntity.ok(new JwtResponse(jwt,
                  userDetails.getId(),
                  userDetails.getUsername(),
                  userDetails.getEmail(),
                  roles));
     }

     @Override
     public ResponseEntity<?> registerUser(SignupRequest signUpRequest) {
          if (userRepository.existsByUsername(signUpRequest.getUsername())) {
               return ResponseEntity
                       .badRequest()
                       .body(new MessageResponse("Error: Username is already taken!"));
          }

          if (userRepository.existsByEmail(signUpRequest.getEmail())) {
               return ResponseEntity
                       .badRequest()
                       .body(new MessageResponse("Error: Email is already in use!"));
          }

          User user = new User(signUpRequest.getUsername(),
                  signUpRequest.getEmail(),
                  encoder.encode(signUpRequest.getPassword()));

          Set<String> strRoles = signUpRequest.getRole();
          Set<Role> roles = new HashSet<>();

          if (strRoles == null) {
               Role userRole = roleRepository.findByName(ERole.Users)
                       .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
               roles.add(userRole);
          } else {
               strRoles.forEach(role -> {
                    switch (role) {
                         case "Orders":
                              Role adminRole = roleRepository.findByName(ERole.Orders)
                                      .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                              roles.add(adminRole);

                              break;
                         case "Products":
                              Role modRole = roleRepository.findByName(ERole.Products)
                                      .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                              roles.add(modRole);

                              break;
                         case "Users":
                              Role usersRole = roleRepository.findByName(ERole.Users)
                                      .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                              roles.add(usersRole);

                              break;
                         default:
                              Role dashboardRole = roleRepository.findByName(ERole.Dashboard)
                                      .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                              roles.add(dashboardRole);
                    }
               });
          }

          user.setRoles(roles);
          userRepository.save(user);

          return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
     }
}

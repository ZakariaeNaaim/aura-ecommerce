package orgcom.auraecommerceapi.security.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class JwtResponse {
  private String token;
  private String type = "Bearer";


  public JwtResponse(String accessToken) {
    this.token = accessToken;

  }
}

package orgcom.auraecommerceapi.shared;

import lombok.*;

@Getter
@Setter
@ToString
public class ResponseGenericResult<T> {
    private int code;
    private boolean isOk;
    private String message;
    private T data;

    public ResponseGenericResult(boolean isOk) {
        if(isOk){
            this.code = 200;
            this.isOk = true;
        }else {
            this.code = 400;
            this.isOk = false;
        }
    }
    public ResponseGenericResult(boolean isOk, String message) {
        if(isOk){
            this.code = 200;
            this.isOk = true;
        }else {
            this.code = 400;
            this.isOk = false;
        }
        this.message = message;
    }
    public ResponseGenericResult(T data) {
        if(data != null){
            this.code = 200;
            this.isOk = true;
        }else {
            this.code = 400;
            this.isOk = false;
        }
        this.data = data;
    }
}

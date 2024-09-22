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
        this(isOk, isOk ? "Operation successful" : "Operation failed", null);
    }

    public ResponseGenericResult(boolean isOk, String message) {
        this(isOk, message, null);
    }

    public ResponseGenericResult(T data) {
        this(data != null, data != null ? "Operation successful" : "No data found", data);
    }

    public ResponseGenericResult(boolean isOk, String message, T data) {
        this.isOk = isOk;
        this.code = isOk ? 200 : 400;
        this.message = message;
        this.data = data;
    }
}

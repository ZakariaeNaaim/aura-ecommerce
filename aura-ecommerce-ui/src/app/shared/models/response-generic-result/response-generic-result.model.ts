export interface ResponseGenericResult<T> {
    code: number;
    isOk: boolean;
    message: string;
    data: T;
  }
  
interface errorResponse{
  message:string,
  statusCode : number,
  timestamp:string
}

export class MyErrorResponse implements errorResponse {
  message: string;
  statusCode: number;
  timestamp:string

  constructor(message: string, statusCode: number,timestamp:string) {
    this.message = message;
    this.statusCode = statusCode;
    this.timestamp=timestamp
  }
}

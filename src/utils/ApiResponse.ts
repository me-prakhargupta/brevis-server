class ApiResponse {
    stausCode: number;
    data: object;
    success: boolean;
    message: string;

    constructor(statusCode: number, data: object, message: string = "Success") {
        this.stausCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
};

export { ApiResponse };
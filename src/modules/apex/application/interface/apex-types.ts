export interface ApexLoginRequest {
    request: {
        id: string;
        password: string;
    }
}

export interface ApexLoginResponse {
    message: string;
    token?: string;
    status: number;
}

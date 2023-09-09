export interface GRPCCall {
    request: {
        token?: string;
    };
}



export type CallbackFunction = (error: null | Error, response: CallbackResponse) => void;

interface CallbackResponse {
    message: string;
    status: number;
    id?:string;
}


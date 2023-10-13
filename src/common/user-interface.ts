import { Double, Int32 } from "react-native/Libraries/Types/CodegenTypes";

export interface IUserResponse {
    name: string;
    email: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface ICategory {
    id: Int32;
    name: string;
}

export interface IProduct {
    category: ICategory;
    _id: string;
    name: string;
    price: Double;
    unit: string;
    imageUrl: string;
    description: string;
}

export interface ICustomer {
    id: string;
    name: string;
}

export interface IItensOrder {
    id: string;
    quantity: Int32;
    total: Double;
    imageUrl: string;
    name: string;
    price: Double;
    unit: string;
}

export interface IOrder {
    customer: ICustomer;
    items: IItensOrder[];
}
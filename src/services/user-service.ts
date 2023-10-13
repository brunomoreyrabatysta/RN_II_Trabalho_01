import api from "./api";
import { IUserResponse, ILoginUser, IUser, IProduct, IOrder, IItensOrder, ICustomer } from "../common/user-interface"


export const fetchUsers = async(): Promise<IUserResponse> => {
    const response = await api.get<IUserResponse>('/read-user');
    return response.data;
}

export const login = async (user: ILoginUser) : Promise<Number> => {    
    const response = await api.post('/login-user', user);    
    return response.status;
}

export const created = async (user: IUser) : Promise<Number> => {    
    const response = await api.post('/create-user', user);    
    return response.status;
}

export const createdOrders = async (order: IOrder) : Promise<Number> => {    
    const response = await api.post('/create-order', order);    
    return response.status;
}

export const fetchProducts = async(): Promise<IProduct[]> => {
    const response = await api.get<IProduct[]>('/read-products');
    return response.data;
}

export const fecthOrders = () => {
    const cust1 : ICustomer = {id: "1", name: "Bruno"};
    const itemOrder1: IItensOrder = {
        id: "64da7728fb8b9b284f6e9c91", 
        name: "Laranja",
        unit: "KG",
        price: 1.99,
        total: 3.98,
        quantity: 2,
        imageUrl: "https://villalvafrutas.com.br/wp-content/uploads/2017/08/155.6.546.444994.jpg"
    };

    const listOrders: IOrder[] = [
        {customer: cust1, items: [itemOrder1]},
        {customer: {id: "2", name: "teste"}, items: [
            {
                id: "64da7728fb8b9b284f6e9c91", 
                name: "Laranja",
                unit: "KG",
                price: 1.99,
                total: 3.98,
                quantity: 2,
                imageUrl: "https://villalvafrutas.com.br/wp-content/uploads/2017/08/155.6.546.444994.jpg"
            },
            {
                id: "64da7772fb8b9b284f6e9c93", 
                name: "Morango",
                unit: "KG",
                price: 4,
                total: 12,
                quantity: 3,
                imageUrl: "https://kinghorse.com.br/wp-content/uploads/2018/11/plantacao-de-morango.jpg"
            },
    ]}];  
            
  return listOrders;
}
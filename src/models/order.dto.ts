import { AddressDTO } from "./address.dto";
import { ClientDTO } from "./client.dto";
import { PaymentDTO } from "./payment.dto";

export interface OrderDTO {
    id: string;
    instant: string;
    client: ClientDTO;
    deliveryAddress: AddressDTO;
    payment: PaymentDTO;
    total: number;
}
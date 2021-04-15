import { OrderItemDTO } from "./order-item.dto";
import { PaymentDTO } from "./payment.dto";

export interface OrderInsertDTO {
    clientId: string;
    deliveryAddressId: string;
    payment: PaymentDTO;
    items: OrderItemDTO[];
}
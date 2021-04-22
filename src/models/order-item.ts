import { ProductDTO } from "./product.dto";

export interface OrderItem {
    quantity: number;
    discount: number;
    product: ProductDTO;
}
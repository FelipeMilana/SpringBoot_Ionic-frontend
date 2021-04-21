import { CategoryDTO } from "./category.dto";

export interface ProductInsertDTO {
    id: string;
    name: string;
    price: number;
    categoryName: CategoryDTO[];
}
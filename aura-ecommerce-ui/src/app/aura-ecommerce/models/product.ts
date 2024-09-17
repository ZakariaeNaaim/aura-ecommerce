interface InventoryStatus {
    id: string;
    libelle: string;
}
export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: InventoryStatus |string;
    categoryId?: number;
    category:InventoryStatus;
    image?: string | File;
    imageBlob?:any;
    rating?: number;
}
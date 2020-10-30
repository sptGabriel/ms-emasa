export interface supplyingProducts {
  id: string;
  quantity: number;
}
export interface CreateProductSupplyingDTO {
  supplier_id: string;
  arrived: boolean;
  orderedAt: Date;
  arrivesAt: Date;
  products: supplyingProducts[];
}

export interface supplyingProducts {
  id: string;
  quantity: string;
}
export interface CreateProductSupplyingDTO {
  supplier_id: string;
  arrived: boolean;
  orderedAt: Date;
  suppliedProducts: supplyingProducts[];
}

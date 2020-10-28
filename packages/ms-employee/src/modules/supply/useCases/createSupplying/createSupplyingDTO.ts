export interface supplyingProducts {
  id: string;
  quantity: string;
}
export interface CreateSupplyingDTO {
  supplier_id: string;
  contract_id: string;
  arrived: boolean;
  orderedAt: Date;
  products: supplyingProducts[];
}

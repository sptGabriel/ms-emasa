export interface suppliedProducts {
  id: string;
  quantity: number;
}
export interface ProvideProductsDTOS {
  supply_id: string;
  suppliedProducts: suppliedProducts[];
}

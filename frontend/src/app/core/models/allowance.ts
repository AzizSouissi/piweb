export class Allowance {
  id!: string;
  userId!: string;
  description!: string;
  category!: AllowanceCategory;
  amount!: number;
  date!: string;
}

export enum AllowanceCategory {
  FOOD = "FOOD",
  TRANSPORTATION = "TRANSPORTATION",
  LODGING = "LODGING",
  ENTERTAINMENT = "ENTERTAINMENT",
  MISCELLANEOUS = "MISCELLANEOUS"
}

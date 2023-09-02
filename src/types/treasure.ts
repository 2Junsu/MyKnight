export interface TreasureType {
  id: number;
  type: string;
  value: number;
  column?: number;
  row?: number;
}

export interface TreasureSortType {
  treasureList: TreasureType[];
  openModal: (type: string, value: number, id: number) => void;
}

export interface TreasureItemType {
  type: string;
  value: number;
  border: string;
  idx?: number;
  onClick?: () => void;
}


export type BackendServer = {
  name: string;
  ipAddress: string;
  protocolPort: number;
  monitorAddress: string;
  monitorPort: number;
  weight: number;
};

export type TableColumn<T> = {
  header: string;
  accessor?: keyof T | string; 
  isVisible: boolean;
  cell?: (row: T, rowIndex: number) => React.ReactNode;
};

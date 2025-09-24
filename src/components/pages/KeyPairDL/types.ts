export type KeyPairType = {
  id: string;
  name: string;
  type: string;
  fingerprint: string;
  createdAt: string;
  publicKey: string;
};

export type KeyPairColumn = {
  header: string | React.ReactNode;
  accessor?: keyof KeyPairType | "select";
  cell?: (row: KeyPairType) => React.ReactNode;
  className: string;
  isVisible: boolean;
  toggleVisibility: boolean;
};

export type KeyPairDetailsProps = {
  keyPairId: string;
};

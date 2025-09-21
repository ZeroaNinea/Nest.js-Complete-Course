export const connection: Connection = {
  CONNECTION_STRING: 'mysql://1234/sad',
  DB: 'MYSQL',
  DB_NAME: 'TEST',
};

export type Connection = {
  CONNECTION_STRING: string;
  DB: string;
  DB_NAME: string;
};

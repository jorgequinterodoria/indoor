// src/dbConfig.d.ts

declare module '../dbConfig' {
    import { Connection } from 'mysql2';
    const connection: Connection;
    export default connection;
  }
// ~/database/index.ts
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { schema } from "./schema";
import Message from "./Message";

const adapter = new SQLiteAdapter({
  schema,
  dbName: "watermelon", // Optional
  onSetUpError: (error) => {
    console.error("DB setup error:", error);
  },
});

const db = new Database({
  adapter,
  modelClasses: [Message],
});

export { adapter }; // 👈 export adapter to use reset
export default db;

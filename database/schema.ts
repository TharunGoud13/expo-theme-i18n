//Watermelon Schema for message table
import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "message",
      columns: [
        { name: "content", type: "string" },
        { name: "user_id", type: "number" },
        { name: "room_id", type: "number" },
        { name: "created_at", type: "number" },
        { name: "is_synced", type: "boolean" },
      ],
    }),
  ],
});

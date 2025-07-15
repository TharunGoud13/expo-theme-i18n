import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Message extends Model {
  static table = "message";

  @field("content") content!: string;
  @field("user_id") userId!: number;
  @field("room_id") roomId!: number;
  @field("created_at") createdAt!: number;
  @field("is_synced") isSynced!: boolean;
}

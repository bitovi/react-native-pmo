export interface Favorite {
  userId: string;
  restaurantId: string;
  favorite: boolean;
  datetimeUpdated: Date;
  _id?: string;
}
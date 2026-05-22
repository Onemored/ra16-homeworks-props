export type EtsyItemImage = {
  url_570xN: string;
};

export type EtsyItem = {
  listing_id: number;
  title: string;
  price: string;
  currency_code: string;
  quantity: number;
  url: string;
  MainImage?: EtsyItemImage | null;
};

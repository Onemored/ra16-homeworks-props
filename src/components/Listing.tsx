import type { EtsyItem } from '../types';

type ListingProps = {
  items: EtsyItem[];
};

type StockBadge = {
  text: string;
  className: 'stock-low' | 'stock-medium' | 'stock-high';
};

type EtsyItemWithImage = EtsyItem & {
  MainImage: NonNullable<EtsyItem['MainImage']>;
};

function hasMainImage(item: EtsyItem): item is EtsyItemWithImage {
  return Boolean(item.MainImage);
}

function formatTitle(title = ''): string {
  return title.length > 50 ? `${title.slice(0, 50)}…` : title;
}

function formatPrice(price: string, currencyCode: string): string {
  switch (currencyCode) {
    case 'USD':
      return `$${price}`;
    case 'EUR':
      return `€${price}`;
    case 'GBP':
      return `£${price}`;
    default:
      return `${currencyCode} ${price}`;
  }
}

function getStockBadge(quantity: number): StockBadge {
  if (quantity <= 10) {
    return { text: `${quantity} left`, className: 'stock-low' };
  }

  if (quantity <= 20) {
    return { text: `${quantity} left`, className: 'stock-medium' };
  }

  return { text: `${quantity} left`, className: 'stock-high' };
}

export default function Listing({ items = [] }: ListingProps) {
  const validItems = items.filter(hasMainImage);

  return (
    <section className="item-list">
      {validItems.map((item) => {
        const stockBadge = getStockBadge(item.quantity);

        return (
          <div className="product-card" key={item.listing_id}>
            <img
              className="product-image"
              src={item.MainImage.url_570xN}
              alt={item.title}
            />
            <div className="product-info">
              <h3 className="product-title">{formatTitle(item.title)}</h3>
              <div className="price-container">
                <div className="product-price">
                  {formatPrice(item.price, item.currency_code)}
                </div>
                <span className={`stock-badge ${stockBadge.className}`}>
                  {stockBadge.text}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

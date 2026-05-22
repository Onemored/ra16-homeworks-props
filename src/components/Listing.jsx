function formatTitle(title = '') {
  return title.length > 50 ? `${title.slice(0, 50)}…` : title;
}

function formatPrice(price, currencyCode) {
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

function getStockBadge(quantity) {
  if (quantity <= 10) {
    return { text: `${quantity} left`, className: 'stock-low' };
  }

  if (quantity <= 20) {
    return { text: `${quantity} left`, className: 'stock-medium' };
  }

  return { text: `${quantity} left`, className: 'stock-high' };
}

export default function Listing({ items = [] }) {
  const validItems = items.filter((item) => item.MainImage);

  return (
    <section className="item-list">
      {validItems.map((item) => {
        const stockBadge = getStockBadge(item.quantity);

        return (
          <article className="product-card" key={item.listing_id}>
            <a
              className="product-link"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="product-image"
                src={item.MainImage.url_570xN}
                alt={item.title}
              />
            </a>
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
          </article>
        );
      })}
    </section>
  );
}

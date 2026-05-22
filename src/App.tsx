import Listing from './components/Listing';
import items from '../data/etsy.json';
import type { EtsyItem } from './types';

export default function App() {
  return (
    <main className="page">
      <Listing items={items as EtsyItem[]} />
    </main>
  );
}

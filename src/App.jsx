import Listing from './components/Listing';
import items from '../data/etsy.json';

export default function App() {
  return (
    <main className="page">
      <Listing items={items} />
    </main>
  );
}

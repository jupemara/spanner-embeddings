import { SearchForm } from '@/components/search-form/search-form';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import { item } from './api/schema';
import { Items } from '@/components/items';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [items, setItems] = useState<item[]>([]);
  return (
    <main
      className={`flex justify-center min-h-screen md:p-12 p-8  ${inter.className}`}
    >
      <div>
        <h1>Spanner に保存された Embeddings を使って検索できるやつ</h1>
        <div className={`w-full md:mt-8 mt-4`}>
          <SearchForm setItems={setItems} />
        </div>
        <Items items={items} />
      </div>
    </main>
  );
}

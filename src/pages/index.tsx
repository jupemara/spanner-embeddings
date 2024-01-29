import { SearchForm } from '@/components/search-form/search-form';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex justify-center min-h-screen md:p-12 p-8  ${inter.className}`}
    >
      <div>
        <h1>Spanner に保存された Embeddings を使って検索できるやつ</h1>
        <div className={`w-full md:my-8 my-4`}>
          <SearchForm />
        </div>
      </div>
    </main>
  );
}

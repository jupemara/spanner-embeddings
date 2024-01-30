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
      className={`flex justify-center min-h-40 md:p-12 p-8  ${inter.className}`}
    >
      <div>
        <h1 className={`flex justify-center items-center`}>
          Spanner に保存された Embeddings を使って検索できるやつ
        </h1>
        <div className={`w-full md:mt-8 mt-4`}>
          <SearchForm setItems={setItems} />
        </div>
        <div>
          <h2 className={`mt-2 flex justify-center items-center`}>
            参考リンクs
          </h2>
          <ul className={`list-disc mt-2 ml-4`}>
            <li>
              <div>
                <GithubIcon />
                <a
                  href="https://github.com/jupemara/spanner-embeddings"
                  className={`underline vertical-bottom ml-1`}
                >
                  jupemara/spanner-embeddings
                </a>
              </div>
            </li>
            <li>
              <a
                className={`underline`}
                href="https://cloud.google.com/spanner/docs/find-k-nearest-neighbors"
              >
                Spanner 上でベクトル近傍検索
              </a>
            </li>
            <li>
              <a
                className={`underline`}
                href="https://cloud.google.com/spanner/docs/schema-design"
              >
                Spanner のスキーマ設計ベストプラクティス
              </a>
            </li>
            <li>
              <a
                className={`underline`}
                href="https://cloud.google.com/vertex-ai/docs/generative-ai/embeddings/get-text-embeddings#generative-ai-get-text-embedding-nodejs"
              >
                テキストエンべディングの取得のサンプルコード
              </a>
            </li>
            <li>
              <a
                className={`underline`}
                href="https://cloud.google.com/vertex-ai/docs/vector-search/overview"
              >
                ベクトル近傍検索
              </a>
            </li>
          </ul>
        </div>
        <Items items={items} />
      </div>
    </main>
  );
}

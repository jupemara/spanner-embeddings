import { item } from '@/pages/api/schema';

type P = {
  items: item[];
};

export function Items({ items }: P): JSX.Element {
  return (
    <>
      {items.map((v, i) => {
        return <div key={i}>{v.id}</div>;
      })}
    </>
  );
}

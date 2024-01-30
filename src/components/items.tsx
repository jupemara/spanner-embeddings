import { item } from '@/pages/api/schema';
import { Card, CardContent, CardHeader } from './ui/card';

type P = {
  items: item[];
};

export function Items({ items }: P): JSX.Element {
  return (
    <>
      {items.map((v, i) => {
        return (
          <Card key={i} className={`mb-4`}>
            <CardHeader>{v.name}</CardHeader>
            <CardContent>
              <ul className={`list-disc pl-3`}>
                <li>{v.description}</li>
                <li>類似度: {v.distance}</li>
              </ul>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}

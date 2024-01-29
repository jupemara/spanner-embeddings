import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { SearchInput, SearchInputSchema } from './schema';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Button } from '../ui/button';
import { useState } from 'react';
import { item } from '@/pages/api/schema';

export function SearchForm(): JSX.Element {
  const [items, setItems] = useState<item[]>([]),
    [errs, setErrors] = useState<string[]>([]),
    form = useForm<SearchInput>({
      resolver: valibotResolver(SearchInputSchema),
      defaultValues: {
        text: '',
      },
    }),
    onSubmit: SubmitHandler<SearchInput> = async (v) => {
      try {
        setErrors([]);
        const res = await fetch('/api/search', {
          mode: 'cors',
        });
        if (res.status >= 400) {
          throw new Error(`backend APIs returns ${res.status}`);
        }
        const body = await res.json();
        if (!!body.errors.length) {
          setErrors(body.errors);
          return;
        }
        setItems(body.items);
      } catch (e) {
        if (e instanceof Error) {
          setErrors([e.message]);
        } else {
          setErrors(['エラーが起こりました']);
        }
      }
    };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    className={``}
                    placeholder="彼女のプレゼント, 赤いマグカップ"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        ></FormField>
        <div className={`flex flex-row-reverse`}>
          <Button className={`my-4`}>検索</Button>
        </div>
      </form>
      <ul>
        {errs.map((v, i) => {
          return (
            <li key={i} className={`text-red-400`}>
              {v}
            </li>
          );
        })}
      </ul>
    </Form>
  );
}

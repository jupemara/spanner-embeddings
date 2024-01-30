import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { SearchInput, SearchInputSchema } from './schema';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Button } from '../ui/button';
import { Dispatch, SetStateAction, useState } from 'react';
import { item } from '@/pages/api/schema';

type P = {
  setItems: Dispatch<SetStateAction<item[]>>;
};

export function SearchForm({ setItems }: P): JSX.Element {
  const [errs, setErrors] = useState<string[]>([]),
    [loading, setLoading] = useState(false),
    form = useForm<SearchInput>({
      resolver: valibotResolver(SearchInputSchema),
      defaultValues: {
        text: '',
      },
    }),
    onSubmit: SubmitHandler<SearchInput> = async (v) => {
      try {
        setErrors([]);
        setLoading(true);
        const res = await fetch(`/api/search?q=${v.text}`, {
          mode: 'cors',
        });
        if (res.status >= 400) {
          throw new Error(`backend APIs returns ${res.status}`);
        }
        const body = await res.json();
        if (!!body.errors.length) {
          setErrors(body.errors);
          setLoading(false);
          return;
        }
        setItems(body.items);
        setLoading(false);
      } catch (e) {
        setLoading(false);
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
                    placeholder="ガジェット, おもちゃ, お菓子, 果物"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        ></FormField>
        <div className={`flex justify-start`}>
          <div className={`ml-auto`}>
            <Button disabled={loading} className={`my-4`}>
              検索
            </Button>
          </div>
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

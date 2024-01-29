import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { SearchInput, SearchInputSchema } from './schema';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Button } from '../ui/button';

export function SearchForm(): JSX.Element {
  const form = useForm<SearchInput>({
      resolver: valibotResolver(SearchInputSchema),
    }),
    onSubmit: SubmitHandler<SearchInput> = (v) => {
      console.log(v);
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
    </Form>
  );
}

import {
  Output,
  StringSchema,
  maxLength,
  minLength,
  object,
  string,
} from 'valibot';

export const searchText: StringSchema<string> = string([
  minLength(1, 'なんか文字入れてください'),
  maxLength(255, '256文字以下でおねがいします'),
]);

export const SearchInputSchema = object({
  text: searchText,
});

export type SearchInput = Output<typeof SearchInputSchema>;

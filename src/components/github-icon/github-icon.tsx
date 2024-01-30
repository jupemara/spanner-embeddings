import Image from 'next/image';
import Github from './github-mark.svg';

export function GithubIcon(): JSX.Element {
  return (
    <Image
      width={24}
      height={24}
      className={`inline-block`}
      src={Github}
      alt="https://github.com/jupemara/spanner-embeddings"
    />
  );
}

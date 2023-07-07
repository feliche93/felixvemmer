import Image from 'next/image';
import { db } from './lib/db';

export default async function Home() {
  const post = await db.query.posts.findFirst({
    with: {
      content: true,
    },
  });

  if (!post) throw new Error('No post!');

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {post.title}
    </main>
  );
}

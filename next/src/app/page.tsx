import Image from 'next/image';
import { db } from '../lib/db';
import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        Hello
      </main>
    </>
  );
}

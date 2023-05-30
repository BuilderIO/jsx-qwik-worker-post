import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <main class="mt-24 flex justify-center gap-8">
      <Link href="/demo" class="border-2 border-violet-500 p-4">
        Demo
      </Link>
      <Link href="/server-stream" class="border-2 border-violet-500 p-4">
        Server Stream
      </Link>
      <Link href="/worker" class="border-2 border-violet-500 p-4">
        Worker
      </Link>
    </main>
  );
});

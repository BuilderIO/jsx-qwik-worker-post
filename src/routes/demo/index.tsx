import { component$ } from '@builder.io/qwik';
import { worker$ } from '@builder.io/qwik-worker';

export default component$(() => {
  return (
    <button
      onClick$={worker$(() => {
        console.log('runs on the worker thread');
      })}
    >
      WEB WORKER
    </button>
  );
});

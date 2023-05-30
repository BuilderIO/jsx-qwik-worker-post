import { component$, useSignal } from '@builder.io/qwik';
import { server$ } from '@builder.io/qwik-city';

const stream = server$(async function* () {
  for (let i = 0; i < 10; i++) {
    yield i;
    // will be logged in server
    console.log(i);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
});

export default component$(() => {
  const messageFromServer = useSignal<string>('');
  return (
    <div>
      <button
        class="border-2 p-2 border-black"
        onClick$={async () => {
          const response = await stream();
          for await (const i of response) {
            messageFromServer.value += ` ${i}`;
          }
        }}
      >
        Stream from server to client
      </button>
      <div>{messageFromServer.value}</div>
    </div>
  );
});

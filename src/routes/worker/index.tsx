import { component$, useSignal } from '@builder.io/qwik';
import { medianFilter } from './processor';
import { UPNG } from './png';
import { worker$ } from '@builder.io/qwik-worker';

const IMG = 'http://localhost:5173/noisyimg.png';
export default component$(() => {
  const imageSrc = useSignal<string>();
  return (
    <>
      <button
        class="border-2 p-2 border-black"
        onClick$={async () => {
          imageSrc.value = await filterImage(IMG);
        }}
      >
        Filter
      </button>
      <button
        class="border-2 p-2 border-black"
        onClick$={async () => {
          imageSrc.value = undefined;
        }}
      >
        Reset
      </button>
      <div class="walkabout-old-school"></div>
      <div class="flex">
        <img src={IMG} width="350" height="350" />
        <img src={imageSrc.value} width="350" height="350" />
      </div>
    </>
  );
});

export const filterImage = worker$(async (src: string) => {
  const res = await fetch(src);
  const data = await res.arrayBuffer();
  console.time('decode');
  const png = UPNG.decode(data) as any;
  const output = medianFilter(png.data, png.width);
  const newPNG = (UPNG as any).encodeLL(
    [output],
    png.width,
    png.height,
    1,
    0,
    8
  );
  const blob = new Blob([newPNG], { type: 'image/png' });
  console.timeEnd('decode');
  return URL.createObjectURL(blob);
});

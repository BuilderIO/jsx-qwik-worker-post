
export const medianFilter = (
  input: Uint8Array,
  width: number,
) => {
  const output = new Uint8Array(input.length);
  const radius = 5;
  const posKernel = build2DPosKernel(radius, width);

  const kernelSize = posKernel.length;
  const dataSize = input.length;
  const entries = new Uint8Array(kernelSize);
  const middle = Math.floor(entries.length / 2);
  let i = 0;
  let ik = 0;
  let pixel = 0;
  for (i = 0; i < dataSize; i++) {
    for (ik = 0; ik < kernelSize; ik++) {
      pixel = i + posKernel[ik];
      entries[ik] = pixel > 0 && pixel < dataSize ? input[pixel] : -1000;
    }
    output[i] = entries.sort()[middle];
  }

  return output;
};


const build2DPosKernel = (radius: number, width: number) => {
  const size = radius * 2 + 1;
  const data = new Int32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      data[x + size * y] = x - radius + (y - radius) * width;
    }
  }
  return data;
};

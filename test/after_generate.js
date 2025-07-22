import hexoIs from '../dist/index.js';

export default function afterGenerate() {
  console.log(hexoIs(this));
}

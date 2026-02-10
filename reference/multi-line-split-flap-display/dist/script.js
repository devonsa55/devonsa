import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4';
import gsap from 'https://cdn.skypack.dev/gsap@3.12.0';

gsap.defaults({
  duration: 1 });


const config = {
  theme: 'dark',
  alignment: 'right',
  audio: false };


const ctrl = new Pane({
  title: 'Config',
  expanded: false });


const update = () => {
  document.documentElement.dataset.theme = config.theme;
};

const sync = event => {
  if (
  !document.startViewTransition ||
  event.target.controller.view.labelElement.innerText !== 'Theme')

  return update();
  document.startViewTransition(() => update());
};

ctrl.addBinding(config, 'theme', {
  label: 'Theme',
  options: {
    System: 'system',
    Light: 'light',
    Dark: 'dark' } });



ctrl.addBinding(config, 'alignment', {
  label: 'Alignment',
  options: {
    Right: 'right',
    Left: 'left' } });



ctrl.addBinding(config, 'audio', {
  label: 'Audio' });


const flippers = {};
const flipSound = new Audio('https://assets.codepen.io/605876/flip.mp3');
const CHARACTERS = ' abcdefghijklmnopqrstuvwxyz '.split('');
const board = document.querySelector('.board');

class Line {
  constructor({ color, element, pad }) {
    this.element = element;
    this.timelines = [];
    this.pad = pad;
    this.color = color;
    this.flips = Array.from(element.querySelectorAll('.flip'));
    this.setup();
  }
  setup() {
    const flips = this.flips;
    const timelines = this.timelines;
    for (const flip of flips) {
      // we only animate two pieces from each set
      // the top of the first character and the bottom of the next
      // this is so we can fold and unfold
      const [foldTop, foldBottom, unfoldTop, unfoldBottom] = Array.from(
      flip.querySelectorAll('.flip div'));


      // before you start set the first and second character.
      foldTop.innerText = foldBottom.innerText = CHARACTERS[0];
      unfoldTop.innerText = unfoldBottom.innerText = CHARACTERS[1];

      const tl = gsap.timeline({
        paused: true,
        repeat: CHARACTERS.length - 2,
        onRepeat: () => {
          const index = Math.floor(tl.totalTime() / tl.duration());
          flipSound.currentTime = 0;
          if (config.audio) flipSound.play();
          foldTop.innerText = foldBottom.innerText = CHARACTERS[index];
          unfoldTop.innerText = unfoldBottom.innerText =
          CHARACTERS[(index + 1) % CHARACTERS.length];
        } });

      tl.set(unfoldTop, { rotateX: 1 });
      tl.set(unfoldBottom, { rotateX: 180 });

      tl.to(unfoldTop, { rotateX: 0 }, 0);
      tl.to(unfoldBottom, { rotateX: 0 }, 0);
      tl.to(foldTop, { rotateX: -180 }, 0);
      tl.to(foldBottom, { rotateX: 0 }, 0);

      const duration = tl.totalDuration();

      const scrub = gsap.to(tl, {
        totalTime: duration,
        repeat: -1,
        paused: true,
        duration: duration,
        ease: 'none' });

      scrub.time(tl.totalDuration());
      timelines.push(scrub);
    }
  }
  run(update) {
    this.element.style.setProperty('--color', this.color);
    const timelines = this.timelines;
    if (this.pilot) return;
    const text = update[config.alignment === 'right' ? 'padStart' : 'padEnd'](
    10,
    ' ').
    toLowerCase();
    const chars = text.split('');

    this.pilot = gsap.timeline({
      onComplete: () => {
        this.pilot.kill();
        this.pilot = undefined;
      } });

    for (let i = 0; i < chars.length; i++) {
      const desired = chars[i];
      const currentIndex = CHARACTERS.indexOf(CHARACTERS[timelines[i].time()]);
      const desiredIndex = CHARACTERS.indexOf(desired);
      const shift =
      currentIndex > desiredIndex ?
      CHARACTERS.length - 1 - currentIndex + desiredIndex :
      desiredIndex - currentIndex;

      const pad =
      currentIndex === desiredIndex ? 0 : this.pad * (CHARACTERS.length - 1);
      this.pilot.to(
      timelines[i],
      {
        time: `+=${shift + pad}`,
        duration: (shift + pad) * gsap.utils.random(0.02, 0.06) },

      0);

    }
  }}


ctrl.addButton({ title: 'Run' }).on('click', () => {
  for (const [_, value] of Object.entries(flippers)) {
    value.flipper.run(value.config.text);
  }
});
ctrl.addButton({ title: 'Blank' }).on('click', () => {
  for (const [_, value] of Object.entries(flippers)) {
    value.flipper.run('');
  }
});

const addLine = ({ text = '', pad = 1, color = 'hsl(0,0%,90%)' }) => {
  const lineConfig = {
    text,
    length: 10,
    pad,
    color,
    id: crypto.randomUUID() };


  const line = Object.assign(document.createElement('div'), {
    id: `line-${lineConfig.id}`,
    innerHTML: `${new Array(10).
    fill().
    map(
    () => `
      <div class="flip">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>`).

    join('')}
    ` });

  board.appendChild(line);
  const flipper = new Line({
    element: line,
    pad: lineConfig.pad,
    color: lineConfig.color });

  flipper.run(text);

  flippers[lineConfig.id] = {
    config: lineConfig,
    flipper };


  const lineFolder = ctrl.addFolder({
    title: 'Line',
    expanded: false });


  lineFolder.addBinding(lineConfig, 'text', {
    label: 'text' });

  lineFolder.
  addBinding(lineConfig, 'pad', {
    label: 'pad',
    min: 0,
    max: 4,
    step: 1 }).

  on('change', () => {
    flipper.pad = lineConfig.pad;
  });
  lineFolder.
  addBinding(lineConfig, 'color', {
    view: 'color',
    color: { alpha: true } }).

  on('change', () => {
    flipper.color = lineConfig.color;
  });
  // create a flipper
  lineFolder.addButton({ title: 'Run' }).on('click', () => {
    flipper.run(lineConfig.text);
  });
  lineFolder.addButton({ title: 'Remove' }).on('click', () => {
    // must delete the item from flippers
    delete flippers[lineConfig.id];
    ctrl.remove(lineFolder);
    line.remove();
  });
};

ctrl.addButton({ title: 'Add Line' }).on('click', addLine);

ctrl.on('change', sync);
update();

addLine({
  text: 'You can',
  pad: 1 });

addLine({
  text: 'just ship',
  pad: 2 });

addLine({
  text: 'things',
  pad: 3 });

addLine({
  text: 'on time',
  pad: 4,
  color: 'hsl(44,82%,49%)' });
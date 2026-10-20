// One shared rule for "a person is here": the first scroll, click, key press,
// mouse move or touch. Browsers that report themselves as automated never pass.
const EVENTS: string[] = ["pointerdown", "keydown", "touchstart", "scroll", "mousemove"];

let seen = false;
let listening = false;
const waiting = new Set<() => void>();

function isAutomated(): boolean {
  if (typeof navigator === "undefined") return true;
  return navigator.webdriver === true || /HeadlessChrome/i.test(navigator.userAgent);
}

function fire() {
  seen = true;
  listening = false;
  EVENTS.forEach((e) => window.removeEventListener(e, fire));
  waiting.forEach((cb) => cb());
  waiting.clear();
}

// Runs cb once a person has interacted. Returns a cleanup function.
export function onHuman(cb: () => void): () => void {
  if (typeof window === "undefined" || isAutomated()) return () => {};
  if (seen) {
    cb();
    return () => {};
  }
  waiting.add(cb);
  if (!listening) {
    listening = true;
    EVENTS.forEach((e) => window.addEventListener(e, fire, { passive: true }));
  }
  return () => {
    waiting.delete(cb);
  };
}
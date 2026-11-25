import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// Run the actual effect with browser boundaries supplied by the harness.
// This tests accessibility policy without requiring a browser emulation package.
const source = ts.transpileModule(
  readFileSync(resolve("src/components/motion-enhancements.tsx"), "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  },
).outputText;

function harness(reduced: boolean) {
  let preferenceChanged: (() => void) | undefined;
  let cleanup: (() => void) | undefined;
  let intersect:
    | ((entries: { isIntersecting: boolean; target: unknown }[]) => void)
    | undefined;
  let starts = 0;
  let cancels = 0;
  let disconnects = 0;
  const preference = {
    matches: reduced,
    addEventListener: (_: string, callback: () => void) => {
      preferenceChanged = callback;
    },
    removeEventListener: () => {
      preferenceChanged = undefined;
    },
  };
  const target = {
    getBoundingClientRect: () => ({ top: 1200 }),
    animate: () => {
      starts++;
      return {
        cancel: () => {
          cancels++;
        },
        onfinish: null,
      };
    },
  };
  class Observer {
    constructor(callback: typeof intersect) {
      intersect = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {
      disconnects++;
    }
  }
  const loadedModule = { exports: {} as { MotionEnhancements: () => null } };
  runInNewContext(source, {
    module: loadedModule,
    exports: loadedModule.exports,
    require: (name: string) => {
      assert.equal(name, "react");
      return {
        useEffect: (effect: () => () => void) => {
          cleanup = effect();
        },
      };
    },
    window: {
      IntersectionObserver: Observer,
      innerHeight: 844,
      matchMedia: () => preference,
    },
    Element: { prototype: { animate() {} } },
    document: { querySelectorAll: () => [target] },
    IntersectionObserver: Observer,
  });
  loadedModule.exports.MotionEnhancements();
  return {
    reveal: () => intersect?.([{ isIntersecting: true, target }]),
    reduce: () => {
      preference.matches = true;
      preferenceChanged?.();
    },
    cleanup: () => cleanup?.(),
    counts: () => ({ starts, cancels, disconnects }),
  };
}

test("reduced-motion visitors receive content without a reveal animation", () => {
  const browser = harness(true);
  browser.reveal();
  assert.equal(browser.counts().starts, 0);
});
test("enabling reduced motion cancels an in-progress reveal", () => {
  const browser = harness(false);
  browser.reveal();
  assert.equal(browser.counts().starts, 1);
  browser.reduce();
  assert.equal(browser.counts().cancels, 1);
});
test("leaving the page disconnects observation and cancels active motion", () => {
  const browser = harness(false);
  browser.reveal();
  browser.cleanup();
  assert.deepEqual(browser.counts(), { starts: 1, cancels: 1, disconnects: 1 });
});

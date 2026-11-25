import { spawn } from "node:child_process";
import { mkdtemp, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = await mkdtemp(join(tmpdir(), "limbuzz-showcase-"));
const output = "docs/showcase";
await mkdir(output, { recursive: true });
const chrome = spawn(
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--remote-debugging-port=0",
    `--user-data-dir=${root}`,
    "about:blank",
  ],
  { windowsHide: true, stdio: "ignore" },
);
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let socket;
try {
  let port;
  for (let i = 0; i < 40; i++) {
    try {
      port = (await readFile(join(root, "DevToolsActivePort"), "utf8")).split(
        "\n",
      )[0];
      break;
    } catch {
      await pause(200);
    }
  }
  if (!port) throw new Error("Chrome failed to start");
  const target = await (
    await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {
      method: "PUT",
    })
  ).json();
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = reject;
  });
  const pending = new Map();
  let id = 0;
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    const task = pending.get(message.id);
    if (task) {
      pending.delete(message.id);
      if (message.error) task.reject(message.error);
      else task.resolve(message.result);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const key = ++id;
      pending.set(key, { resolve, reject });
      socket.send(JSON.stringify({ id: key, method, params }));
    });
  const evaluate = async (expression) => {
    const result = await send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (result.exceptionDetails)
      throw new Error(
        result.exceptionDetails.exception?.description ??
          result.exceptionDetails.text,
      );
    return result.result.value;
  };
  await send("Page.enable");
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await send("Page.navigate", { url: "http://127.0.0.1:3000/#inside-limbuzz" });
  for (let i = 0; i < 40; i++) {
    if (
      await evaluate(
        "!!document.querySelector('.inside-track') && !!document.querySelector('.inside-track img')",
      )
    )
      break;
    await pause(200);
  }
  await evaluate("document.fonts.ready.then(()=>true)");
  const results = [];
  for (const width of [1440, 768, 390, 320]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await evaluate(
      "[...document.querySelectorAll('.inside-track img')].forEach(i=>i.loading='eager')",
    );
    await evaluate(
      "Promise.all([...document.querySelectorAll('.inside-track img')].map(i=>i.decode())).then(()=>true)",
    );
    await evaluate(
      "window.scrollTo({top:document.querySelector('#inside-limbuzz').getBoundingClientRect().top+scrollY-90,behavior:'instant'})",
    );
    await pause(100);
    const before = await evaluate(
      "({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,active:[...document.querySelectorAll('.inside-selector')].findIndex(x=>x.getAttribute('aria-current')==='true'),imageLoaded:[...document.querySelectorAll('.inside-track img')].every(i=>i.complete&&i.naturalWidth>0),downloadDisabled:document.querySelector('.release-panel button').disabled,apkLinks:document.querySelectorAll('a[href$=\".apk\"]').length,sectionHeight:Math.round(document.querySelector('#inside-limbuzz').getBoundingClientRect().height)})",
    );
    const clip = await evaluate(
      "({x:0,y:scrollY,width:innerWidth,height:Math.ceil(document.querySelector('#inside-limbuzz').getBoundingClientRect().height+90),scale:1})",
    );
    const photo = await send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 88,
      clip,
      captureBeyondViewport: true,
    });
    await writeFile(
      `${output}/inside-${width}.jpg`,
      Buffer.from(photo.data, "base64"),
    );
    if (width <= 900) {
      await evaluate(
        "document.querySelector('.inside-track').scrollTo({left:document.querySelector('.inside-track').clientWidth+16,behavior:'instant'})",
      );
      await pause(130);
    } else {
      await evaluate(
        "document.querySelectorAll('.inside-selector')[1].click()",
      );
      await pause(50);
    }
    const after = await evaluate(
      "({active:[...document.querySelectorAll('.inside-selector')].findIndex(x=>x.getAttribute('aria-current')==='true'),pageOverflow:document.documentElement.scrollWidth>innerWidth})",
    );
    await evaluate("document.querySelectorAll('.inside-selector')[2].click()");
    await pause(70);
    const smsFit = await evaluate(
      "(()=>{const stage=document.querySelector('.inside-stage-sms').getBoundingClientRect();const image=document.querySelector('.inside-stage-sms img').getBoundingClientRect();return image.top>=stage.top&&image.bottom<=stage.bottom})()",
    );
    results.push({ width, before, after, smsFit });
    await evaluate("document.querySelectorAll('.inside-selector')[0].click()");
  }
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await evaluate(
    "window.scrollTo({top:document.querySelector('#inside-limbuzz').getBoundingClientRect().top+scrollY-90,behavior:'instant'})",
  );
  await pause(100);
  for (const [index, name] of [
    [2, "sms"],
    [3, "contacts"],
  ]) {
    await evaluate(
      `document.querySelectorAll('.inside-selector')[${index}].click()`,
    );
    await pause(100);
    const desktopClip = await evaluate(
      "({x:0,y:scrollY,width:innerWidth,height:Math.ceil(document.querySelector('#inside-limbuzz').getBoundingClientRect().height+90),scale:1})",
    );
    const capture = await send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 88,
      clip: desktopClip,
      captureBeyondViewport: true,
    });
    await writeFile(
      `${output}/${name}-1440.jpg`,
      Buffer.from(capture.data, "base64"),
    );
  }
  await evaluate("document.querySelectorAll('.inside-selector')[0].click()");
  await evaluate(
    "(()=>{const track=document.querySelector('.inside-track');track.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,clientX:300}));track.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,clientX:100}))})()",
  );
  await pause(50);
  const drag = await evaluate(
    "[...document.querySelectorAll('.inside-selector')].findIndex(x=>x.getAttribute('aria-current')==='true')",
  );
  await evaluate("document.querySelectorAll('.inside-selector')[0].click()");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await evaluate("document.querySelector('.inside-track').focus()");
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "ArrowRight",
    code: "ArrowRight",
    windowsVirtualKeyCode: 39,
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "ArrowRight",
    code: "ArrowRight",
    windowsVirtualKeyCode: 39,
  });
  await pause(160);
  const keyboard = await evaluate(
    "[...document.querySelectorAll('.inside-selector')].findIndex(x=>x.getAttribute('aria-current')==='true')",
  );
  await evaluate("document.querySelectorAll('.inside-selector')[2].click()");
  await pause(160);
  await evaluate("document.activeElement.blur()");
  const sms = await evaluate(
    "({active:[...document.querySelectorAll('.inside-selector')].findIndex(x=>x.getAttribute('aria-current')==='true'),image:document.querySelector('.inside-stage-sms img').getAttribute('src'),loaded:document.querySelector('.inside-stage-sms img').naturalWidth>0,caveat:document.querySelector('.inside-stage-sms').parentElement.querySelector('.inside-slide-copy small').textContent.trim(),overflow:document.documentElement.scrollWidth>innerWidth})",
  );
  await evaluate(
    "window.scrollTo({top:document.querySelector('#inside-limbuzz').getBoundingClientRect().top+scrollY-90,behavior:'instant'})",
  );
  const smsClip = await evaluate(
    "({x:0,y:scrollY,width:innerWidth,height:Math.ceil(document.querySelector('#inside-limbuzz').getBoundingClientRect().height+90),scale:1})",
  );
  const smsPhoto = await send("Page.captureScreenshot", {
    format: "jpeg",
    quality: 88,
    clip: smsClip,
    captureBeyondViewport: true,
  });
  await writeFile(
    `${output}/sms-390.jpg`,
    Buffer.from(smsPhoto.data, "base64"),
  );
  await evaluate("document.querySelectorAll('.inside-selector')[3].click()");
  await pause(160);
  const contacts = await evaluate(
    "({active:[...document.querySelectorAll('.inside-selector')].findIndex(x=>x.getAttribute('aria-current')==='true'),image:document.querySelector('.inside-stage-contacts img').getAttribute('src'),loaded:document.querySelector('.inside-stage-contacts img').naturalWidth>0,caption:document.querySelector('.inside-stage-contacts').parentElement.querySelector('.inside-slide-copy p').textContent,overflow:document.documentElement.scrollWidth>innerWidth})",
  );
  const contactsPhoto = await send("Page.captureScreenshot", {
    format: "jpeg",
    quality: 88,
    clip: smsClip,
    captureBeyondViewport: true,
  });
  await writeFile(
    `${output}/contacts-390.jpg`,
    Buffer.from(contactsPhoto.data, "base64"),
  );
  await evaluate(
    "document.querySelector('.inside-stage-contacts .inside-expand').click()",
  );
  await evaluate(
    "new Promise((resolve,reject)=>{const timer=setInterval(()=>{const image=document.querySelector('.inside-preview-dialog img');if(image?.getAttribute('src')?.includes('limbuzz-multiple-sms-concept-user.png')){clearInterval(timer);image.decode().then(()=>resolve(true)).catch(reject)}},50);setTimeout(()=>{clearInterval(timer);reject(new Error('Expanded image did not load'))},5000)})",
  );
  await pause(100);
  const zoom = await evaluate(
    "({open:document.querySelector('.inside-preview-dialog').open,image:document.querySelector('.inside-preview-dialog img').getAttribute('src'),loaded:document.querySelector('.inside-preview-dialog img').naturalWidth>0,close:!!document.querySelector('.inside-preview-head button')})",
  );
  const zoomPhoto = await send("Page.captureScreenshot", {
    format: "jpeg",
    quality: 88,
  });
  await writeFile(
    `${output}/contacts-expanded-390.jpg`,
    Buffer.from(zoomPhoto.data, "base64"),
  );
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await pause(100);
  const zoomClosed = await evaluate(
    "!document.querySelector('.inside-preview-dialog').open",
  );
  results.push({ keyboard, drag, sms, contacts, zoom, zoomClosed });

  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "no-preference" }],
  });
  await send("Page.navigate", {
    url: "http://127.0.0.1:3000/?autocheck=1#inside-limbuzz",
  });
  for (let i = 0; i < 40; i++) {
    if (
      await evaluate(
        "location.search.includes('autocheck') && !!document.querySelector('.inside-gallery')",
      )
    )
      break;
    await pause(100);
  }
  await evaluate(
    "window.scrollTo({top:document.querySelector('#inside-limbuzz').getBoundingClientRect().top+scrollY-90,behavior:'instant'})",
  );
  for (let i = 0; i < 30; i++) {
    if (
      await evaluate(
        "document.querySelector('.inside-gallery').classList.contains('is-advancing')",
      )
    )
      break;
    await pause(100);
  }
  const autoStart = await evaluate(
    "({advancing:document.querySelector('.inside-gallery').classList.contains('is-advancing'),active:[...document.querySelectorAll('.inside-selector')].findIndex(x=>x.getAttribute('aria-current')==='true')})",
  );
  const autoAdvance = await evaluate(
    "new Promise(resolve=>{const start=performance.now();const timer=setInterval(()=>{const active=[...document.querySelectorAll('.inside-selector')].findIndex(x=>x.getAttribute('aria-current')==='true');if(active!==0){clearInterval(timer);resolve({active,elapsed:Math.round(performance.now()-start)})}},40);setTimeout(()=>{clearInterval(timer);resolve({active:-1,elapsed:3000})},3000)})",
  );
  await evaluate("document.querySelectorAll('.inside-selector')[1].click()");
  await pause(2350);
  const pausedAt = await evaluate(
    "({active:[...document.querySelectorAll('.inside-selector')].findIndex(x=>x.getAttribute('aria-current')==='true'),advancing:document.querySelector('.inside-gallery').classList.contains('is-advancing')})",
  );
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await send("Page.navigate", {
    url: "http://127.0.0.1:3000/?reducedcheck=1#inside-limbuzz",
  });
  for (let i = 0; i < 40; i++) {
    if (
      await evaluate(
        "location.search.includes('reducedcheck') && !!document.querySelector('.inside-gallery')",
      )
    )
      break;
    await pause(100);
  }
  await pause(2350);
  const reducedAt = await evaluate(
    "({active:[...document.querySelectorAll('.inside-selector')].findIndex(x=>x.getAttribute('aria-current')==='true'),advancing:document.querySelector('.inside-gallery').classList.contains('is-advancing')})",
  );
  results.push({ autoStart, autoAdvance, pausedAt, reducedAt });
  await writeFile(
    `${output}/checks.json`,
    JSON.stringify(results, null, 2) + "\n",
  );
  console.log(JSON.stringify(results));
  if (
    results.some(
      (item) =>
        item.before &&
        (item.before.overflow ||
          !item.before.imageLoaded ||
          !item.before.downloadDisabled ||
          item.before.apkLinks ||
          item.after.active !== 1 ||
          item.after.pageOverflow ||
          !item.smsFit),
    ) ||
    keyboard !== 1 ||
    drag !== 1 ||
    sms.active !== 2 ||
    !sms.loaded ||
    !sms.image.includes("limbuzz-sms-concept-user.png") ||
    !sms.caveat.includes("not verified") ||
    sms.overflow ||
    contacts.active !== 3 ||
    !contacts.loaded ||
    !contacts.image.includes("limbuzz-multiple-sms-concept-user.png") ||
    !contacts.caption.includes("attempts") ||
    contacts.overflow ||
    !zoom.open ||
    !zoom.loaded ||
    !zoom.image.includes("limbuzz-multiple-sms-concept-user.png") ||
    !zoom.close ||
    !zoomClosed ||
    !autoStart.advancing ||
    autoStart.active !== 0 ||
    autoAdvance.active !== 1 ||
    pausedAt.active !== 1 ||
    pausedAt.advancing ||
    reducedAt.active !== 0 ||
    reducedAt.advancing
  )
    throw new Error("Showcase browser verification failed");
} finally {
  socket?.close();
  chrome.kill();
  await pause(300);
  await rm(root, { recursive: true, force: true }).catch(() => {});
}

import { copyFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const origin = process.env.HAVEN_CAPTURE_ORIGIN ?? 'http://localhost:5081';
const outputRoot = path.join(process.cwd(), 'public', 'products', 'haven', 'demo');
const videoScratchRoot = path.join(process.cwd(), '.artifacts', 'haven-capture-videos');
const capturedVideos = [];

const viewports = {
  desktop: { width: 1760, height: 1100 },
  mobile: { width: 390, height: 844 },
};

const screenshots = [
  { key: 'overview', route: '/' },
  { key: 'devices', route: '/devices' },
  { key: 'network', route: '/network' },
  { key: 'accounts', route: '/accounts' },
  { key: 'system', route: '/settings' },
];

const journeys = [
  {
    key: 'overview-and-devices',
    route: '/',
    actions: [
      { kind: 'link', name: 'Devices', heading: 'Devices' },
      { kind: 'device' },
      { kind: 'link', name: 'Browsers', heading: 'Browser security' },
    ],
  },
  {
    key: 'network-and-recovery',
    route: '/network',
    actions: [
      { kind: 'link', name: 'Appliances', heading: 'Appliances' },
      { kind: 'link', name: 'Accounts', heading: 'Accounts' },
      { kind: 'link', name: 'Activity', heading: 'Activity' },
      { kind: 'link', name: 'System', heading: 'System & Recovery' },
    ],
  },
];

const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForSyntheticDemo(page) {
  await page.waitForLoadState('networkidle');
  await page.getByText('Synthetic demo mode.', { exact: false }).first().waitFor();
  await page.locator('.local-pill.demo-pill').waitFor();
  await page.evaluate(() => document.fonts.ready);
}

async function visit(page, route) {
  await page.goto(new URL(route, origin).toString(), { waitUntil: 'domcontentloaded' });
  await waitForSyntheticDemo(page);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
}

async function followAction(page, action) {
  if (action.kind === 'device') {
    await page.locator('.device-button').first().click();
    await page.locator('.device-page-heading').waitFor();
  } else {
    await page.getByRole('link', { name: action.name, exact: true }).click();
    await page.getByRole('heading', { name: action.heading, exact: true }).waitFor();
  }

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await pause(1_150);
}

async function captureScreenshots(browser, viewportName, viewport) {
  const screenshotDirectory = path.join(outputRoot, 'screenshots');
  await mkdir(screenshotDirectory, { recursive: true });

  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, colorScheme: 'dark' });
  const page = await context.newPage();

  for (const screenshot of screenshots) {
    await visit(page, screenshot.route);
    await page.screenshot({
      path: path.join(screenshotDirectory, `haven-${screenshot.key}-${viewportName}.png`),
      animations: 'disabled',
    });
  }

  await context.close();
}

async function captureJourney(browser, viewportName, viewport, journey) {
  const videoDirectory = path.join(outputRoot, 'videos');
  const scratchDirectory = path.join(videoScratchRoot, `${journey.key}-${viewportName}`);
  await mkdir(videoDirectory, { recursive: true });
  await mkdir(scratchDirectory, { recursive: true });

  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    colorScheme: 'dark',
    recordVideo: { dir: scratchDirectory, size: viewport },
  });
  const page = await context.newPage();
  const video = page.video();

  await visit(page, journey.route);
  await pause(1_450);

  for (const action of journey.actions) {
    await followAction(page, action);
  }

  await pause(850);
  await context.close();
  capturedVideos.push({
    source: await video.path(),
    destination: path.join(videoDirectory, `haven-${journey.key}-${viewportName}.webm`),
  });
}

await rm(videoScratchRoot, { recursive: true, force: true });

const browser = await chromium.launch({ headless: true });

try {
  for (const [viewportName, viewport] of Object.entries(viewports)) {
    await captureScreenshots(browser, viewportName, viewport);

    for (const journey of journeys) {
      await captureJourney(browser, viewportName, viewport, journey);
    }
  }
} finally {
  await browser.close();
}

for (const video of capturedVideos) {
  await copyFile(video.source, video.destination);
}

try {
  await rm(videoScratchRoot, { recursive: true, force: true, maxRetries: 4, retryDelay: 250 });
} catch (error) {
  console.warn(`Captured media, but the temporary browser video directory is still locked: ${error.message}`);
}

console.log(`Captured HAVEN media from ${origin} into ${path.relative(process.cwd(), outputRoot)}.`);

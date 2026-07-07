import { expect, test, type Page } from '@playwright/test';

type DemoFixture = {
  tabName: string;
  heading: string;
  productName: string;
  hasThemeToggle?: boolean;
};

const demoFixtures: DemoFixture[] = [
  {
    tabName: 'Pokemon Go Nexus',
    heading: 'App walkthrough',
    productName: 'PokeGo Nexus',
    hasThemeToggle: true,
  },
  {
    tabName: 'WinRift',
    heading: 'Matchup analytics dashboard',
    productName: 'WinRift',
  },
  {
    tabName: 'Track Extract',
    heading: 'Stem separation workflow',
    productName: 'TrackExtract',
    hasThemeToggle: true,
  },
  {
    tabName: 'Pokemon Autochess',
    heading: 'Runtime combat sandbox',
    productName: 'Pokemon Autochess',
  },
  {
    tabName: 'Jarvin',
    heading: 'Host-run assistant loop',
    productName: 'Jarvin',
  },
  {
    tabName: 'Cipher Snagem Editor',
    heading: 'Desktop editor workflow',
    productName: 'Cipher Snagem Editor',
  },
];

test.describe('product showcase media', () => {
  test('cycles project demos, themes, carousel, and lightbox controls', async ({ page }) => {
    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];
    const badLocalResponses: string[] = [];

    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });
    page.on('response', (response) => {
      const request = response.request();
      const url = response.url();
      const resourceType = request.resourceType();

      if (
        response.status() >= 400 &&
        url.startsWith(page.url().split('/').slice(0, 3).join('/')) &&
        !url.endsWith('/favicon.ico') &&
        ['document', 'image', 'media', 'script', 'stylesheet'].includes(resourceType)
      ) {
        badLocalResponses.push(`${response.status()} ${resourceType} ${url}`);
      }
    });

    await page.goto('/?demo=nexus');
    await expect(page.getByRole('heading', { name: 'The products need to be seen in motion.' })).toBeVisible();

    for (const demo of demoFixtures) {
      await exerciseDemo(page, demo);
    }

    expect(pageErrors, 'No browser page errors should occur while exercising showcase demos.').toEqual([]);
    expect(consoleErrors, 'No browser console errors should occur while exercising showcase demos.').toEqual([]);
    expect(badLocalResponses, 'All local showcase media and app assets should resolve successfully.').toEqual([]);
  });
});

async function exerciseDemo(page: Page, demo: DemoFixture) {
  await page.getByRole('button', { name: new RegExp(escapeRegExp(demo.tabName), 'i') }).click();

  const stage = page.locator('.showcase-stage');
  const visual = stage.locator('.demo-visual');

  await expect(stage.locator('.stage-copy h3')).toContainText(demo.heading);
  await expect(visual).toBeVisible();
  await expect(visual.locator('.nexus-media-frame')).toBeVisible();
  await expect(visual.locator('.nexus-image-carousel')).toBeVisible();

  const activeVideo = visual.locator('.nexus-media-frame video:visible').first();
  await expect(activeVideo).toBeVisible();
  await expect(visual.locator('.nexus-carousel-slide-active img:visible').first()).toBeVisible();

  await clickSecondButtonIfAvailable(visual.locator('.nexus-moment-tabs button'));
  await expect(activeVideo).toBeVisible();

  if (demo.hasThemeToggle) {
    const themeGroup = visual.getByRole('group', { name: `${demo.productName} media theme` });

    await expect(themeGroup).toBeVisible();
    await themeGroup.getByRole('button').last().click();
    await expect(themeGroup.getByRole('button').last()).toHaveAttribute('aria-pressed', 'true');
  }

  await visual.getByRole('button', { name: `Next ${demo.productName} screenshot` }).click();
  await expect(visual.locator('.nexus-carousel-slide-active img:visible').first()).toBeVisible();

  await visual.locator('.nexus-media-frame').click();
  await exerciseLightbox(page, demo, 'video');

  await visual.locator('.nexus-carousel-slide-active').click();
  await exerciseLightbox(page, demo, 'screenshot');
}

async function exerciseLightbox(page: Page, demo: DemoFixture, expectedKind: 'video' | 'screenshot') {
  const dialog = page.getByRole('dialog', { name: new RegExp(`${escapeRegExp(demo.productName)} enlarged`, 'i') });

  await expect(dialog).toBeVisible();

  const kindLabel = expectedKind === 'video' ? 'Videos' : 'Screens';
  await expect(dialog.getByRole('button', { name: kindLabel, exact: true })).toHaveAttribute('aria-pressed', 'true');

  const nextLabel = `Next ${demo.productName} ${expectedKind === 'video' ? 'video' : 'screenshot'}`;
  await dialog.getByRole('button', { name: nextLabel }).click();

  if (expectedKind === 'video') {
    await expect(dialog.locator('video:visible').first()).toBeVisible();
    await dialog.getByRole('button', { name: 'Screens', exact: true }).click();
    await expect(dialog.getByRole('button', { name: 'Screens', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(dialog.locator('img:visible').first()).toBeVisible();
  } else {
    await expect(dialog.locator('img:visible').first()).toBeVisible();
    await dialog.getByRole('button', { name: 'Videos', exact: true }).click();
    await expect(dialog.getByRole('button', { name: 'Videos', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(dialog.locator('video:visible').first()).toBeVisible();
  }

  await dialog.getByRole('button', { name: 'Close enlarged media' }).click();
  await expect(dialog).toHaveCount(0);
}

async function clickSecondButtonIfAvailable(locator: ReturnType<Page['locator']>) {
  if ((await locator.count()) > 1) {
    await locator.nth(1).click();
  }
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

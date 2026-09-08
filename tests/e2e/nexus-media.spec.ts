import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { expect, test } from '@playwright/test';
import { nexusMediaConfig as config } from '../../src/components/productShowcaseMedia';

const mediaRoot = '/products/pokemon-go-nexus/demo/migration-preview';

test('Nexus media declarations match the verified capture package', async () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', mediaRoot, 'manifest.json'), 'utf8'));
  expect(manifest.renderer).toBe('responsive-web');
  expect(manifest.flows).toHaveLength(56);
  const assets = new Map<string, { sha256: string }>(
    manifest.assets.map((asset: { file: string; sha256: string }) => [asset.file, asset]),
  );
  const referenced: string[] = [];
  for (const theme of config.themes)
    for (const viewport of ['desktop', 'mobile'] as const) {
      for (const moment of config.moments) {
        referenced.push(config.videoPath(theme.id, moment.mediaKey, viewport));
        referenced.push(config.posterPath!(theme.id, moment, viewport));
      }
      for (const shot of config.screenshots) referenced.push(config.screenshotPath(theme.id, shot.imageKey, viewport));
    }
  for (const file of referenced) {
    const pathname = new URL(file, 'http://localhost').pathname;
    const entry = assets.get(pathname.slice(mediaRoot.length + 1));
    expect(entry, `${file} is listed in the capture manifest`).toBeDefined();
    const data = fs.readFileSync(path.join(process.cwd(), 'public', pathname));
    expect(createHash('sha256').update(data).digest('hex'), file).toBe(entry!.sha256);
  }
});

test('every Nexus feature clip plays and the complete gallery is navigable', async ({ page }) => {
  test.setTimeout(240000);
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('response', (response) => {
    if (response.status() >= 400 && response.url().includes(mediaRoot))
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto('/?demo=nexus');
  const stage = page.locator('.showcase-stage');
  await expect(stage.locator('.stage-copy')).toContainText('native app remains in preview');
  for (const theme of config.themes) {
    await stage
      .getByRole('group', { name: 'PokeGo Nexus media theme' })
      .getByRole('button', { name: theme.label })
      .click();
    for (const moment of config.moments) {
      await stage
        .getByRole('group', { name: 'PokeGo Nexus demo moment' })
        .getByRole('button', { name: moment.label, exact: true })
        .click();
      const video = stage.locator('.nexus-video-layer-active video:visible');
      await expect(video).toHaveCount(1);
      await expect
        .poll(() =>
          video.evaluate(
            (element: HTMLVideoElement) =>
              element.readyState >= 2 && !element.paused && element.currentTime > 0 && element.duration > 3,
          ),
        )
        .toBe(true);
      await expect(video.locator('source')).toHaveAttribute('src', new RegExp(`${theme.id}-${moment.mediaKey}-`));
    }
    for (const screenshot of config.screenshots) {
      await stage
        .getByRole('combobox', { name: 'PokeGo Nexus screenshot selector', exact: true })
        .selectOption(screenshot.id);
      const img = stage.locator('.nexus-carousel-slide-active img:visible');
      await expect(img).toHaveAttribute('alt', new RegExp(`^${screenshot.label} `));
      await expect
        .poll(() => img.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0))
        .toBe(true);
    }
  }
  await stage.locator('.nexus-carousel-slide-active').click();
  const dialog = page.getByRole('dialog');
  await dialog
    .getByRole('combobox', { name: 'PokeGo Nexus enlarged screenshot selector' })
    .selectOption('pvp-team-builder');
  await expect(dialog.locator('img:visible')).toHaveAttribute('alt', /PvP team builder/);
  await dialog.getByRole('button', { name: 'Close enlarged media' }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

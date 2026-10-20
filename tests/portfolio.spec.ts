import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.emulateMedia({ reducedMotion: 'reduce' })
})

test('loads the portfolio without runtime errors or horizontal overflow', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Thoughtfully')
  await expect(page.locator('.project-card')).toHaveCount(3)
  await expect(page.locator('canvas')).toBeVisible()
  await page.getByRole('img', { name: /interactive wire sculpture/ }).focus()
  await page.keyboard.press('ArrowRight')
  await page.getByRole('button', { name: /Change sculpture shape/ }).click()
  await expect(page.getByRole('img', { name: /In orbit/ })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  expect(errors).toEqual([])
})

test('filters projects and opens complete, keyboard-dismissable case studies', async ({ page }) => {
  await page.getByRole('button', { name: 'AI & Cloud', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(1)
  const trigger = page.getByRole('button', { name: 'Explore Lazarus case study' })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Lazarus case study' })
  await expect(dialog.getByRole('heading', { name: 'The approach' })).toBeVisible()
  await expect(dialog.getByRole('link', { name: /Explore repository/ })).toHaveAttribute(
    'href',
    'https://github.com/ArunN2005/LAZARUS-V2',
  )
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await page.getByRole('button', { name: 'Full-stack', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(2)
  await expect(page.locator('.project-rezo .project-year')).toHaveText('2025')
  await page.getByRole('button', { name: /All work/ }).click()
  await expect(page.locator('.project-card')).toHaveCount(3)
})

test('supports searchable keyboard commands and persisted appearance preferences', async ({
  page,
}) => {
  await page.keyboard.press('Control+k')
  const search = page.getByRole('combobox', { name: 'Search commands' })
  await expect(search).toBeFocused()
  await search.fill('dark')
  await page.keyboard.press('Enter')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: 'Switch to light mode' }).click()
  await page.getByRole('button', { name: 'Open command menu' }).click()
  await search.fill('Rezo')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog', { name: 'Rezo case study' })).toBeVisible()
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Open command menu' }).click()
  await search.fill('nonexistent command')
  await expect(page.getByText('No matching commands.', { exact: false })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced')
})

test('runs the migration walkthrough and resets it', async ({ page }) => {
  await page.getByRole('button', { name: 'Run sequence' }).click()
  await expect(page.getByRole('button', { name: 'Run again' })).toBeEnabled({ timeout: 8000 })
  await expect(page.getByText('Close the loop', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Explore Validate stage' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await page.getByRole('button', { name: 'Reset migration' }).click()
  await expect(page.getByText('Every good migration starts with understanding.')).toBeVisible()
})

test('solar and civic controls produce different meaningful results', async ({ page }) => {
  await page.getByRole('tab', { name: /Solar verifier/ }).click()
  await expect(page.getByText('Verified · eligible to record')).toBeVisible()
  await page.getByRole('slider', { name: 'Solar output' }).fill('14')
  await expect(page.getByText('Flagged · needs review')).toBeVisible()
  await page.getByRole('slider', { name: 'Solar output' }).fill('6')
  await page.getByRole('slider', { name: 'Time of day' }).fill('2')
  await expect(page.getByText('Flagged · needs review')).toBeVisible()
  await page.getByRole('slider', { name: 'Time of day' }).fill('12')
  await expect(page.getByText('Verified · eligible to record')).toBeVisible()
  await page.getByRole('tab', { name: /Civic triage/ }).click()
  await page.getByRole('slider', { name: 'Detection confidence' }).fill('100')
  await page.getByRole('slider', { name: 'Distance from issue' }).fill('0')
  await expect(page.locator('.triage-result>strong')).toHaveText('100/100')
  await page.getByRole('slider', { name: 'Distance from issue' }).fill('20')
  await expect(page.locator('.triage-result>strong')).toHaveText('20/100')
})

test('reveals experience and skill details and downloads the actual resume', async ({ page }) => {
  await page.getByRole('button', { name: /Hivetz Nutri/ }).click()
  await expect(
    page.getByText(
      'Added role-based access control and real-time low-stock alerts for different user roles.',
    ),
  ).toBeVisible()
  await page.getByRole('button', { name: /Make it reliable/ }).click()
  await expect(page.locator('.skill-detail')).toContainText('AWS CDK')
  const download = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Get my résumé' }).click()
  expect((await download).suggestedFilename()).toBe('Arun-N-Resume.pdf')
  const response = await page.request.get('/Arun-N-Resume.pdf')
  expect(response.ok()).toBe(true)
  expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF')
})

test('contact form is explicit about email delivery and validates required fields', async ({
  page,
}) => {
  await page.getByRole('button', { name: 'Let’s build something' }).click()
  const dialog = page.getByRole('dialog', { name: 'Draft a message to Arun' })
  await expect(dialog).toContainText('opens a draft in your email app')
  await dialog.getByRole('button', { name: 'Open email draft' }).click()
  expect(
    await page
      .locator('#contact-name')
      .evaluate((input: HTMLInputElement) => input.validity.valueMissing),
  ).toBe(true)
  await page.getByLabel('Your name', { exact: true }).fill('Portfolio reviewer')
  await page.getByLabel('Your email', { exact: true }).fill('reviewer@example.com')
  await page.getByLabel('What are you thinking?').fill('Let’s talk about your projects.')
  await dialog.getByRole('button', { name: 'Open email draft' }).click()
  await expect(dialog.getByRole('status')).toContainText('Nothing has been sent from this website.')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Let’s build something' })).toBeFocused()
})

test('navigation works at its viewport and all sections stay inside the screen', async ({
  page,
  isMobile,
}) => {
  if (isMobile) await page.getByRole('button', { name: 'Open navigation' }).click()
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'About', exact: true })
    .click()
  await expect(page).toHaveURL(/#about$/)
  if (isMobile)
    await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  for (const id of ['work', 'about', 'toolkit', 'lab', 'contact']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), id).toBe(
      true,
    )
  }
})

test('has no detected WCAG AA violations in light, dark, and dialog states', async ({ page }) => {
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Switch to dark mode' }).click()
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(results.violations, `${theme} mode`).toEqual([])
  }
  await page.getByRole('button', { name: 'Explore Rezo case study' }).click()
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(results.violations, 'case study modal').toEqual([])
})

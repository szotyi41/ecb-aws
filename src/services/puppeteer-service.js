import puppeteer from 'puppeteer';

export const getTitleFromURL = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const title = await page.title();
  await browser.close();
  return title;
};

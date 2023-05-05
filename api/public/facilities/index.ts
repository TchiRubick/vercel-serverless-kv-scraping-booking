import { VercelRequest, VercelResponse } from '@vercel/node';
import puppeteer, { type Browser } from 'puppeteer';
import kv from '@vercel/kv';

const url = 'https://www.booking.com/hotel/fr/refuges-des-hauts.fr.html';

export default async (req: VercelRequest, res: VercelResponse) => {
  const browser: Browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();

  await page.goto(url);

  const data = await page.evaluate(() => {
    const facilitiesEl = Array.from(
      document.querySelectorAll(
        '#hp_facilities_box > div > div > .a6541fb018 > div > div > .e5e0727360 > .a815ec762e'
      )
    );

    return facilitiesEl.map((facilityDom: any) => {
      const facility =
        facilityDom.querySelector('div > span > div > span')?.innerText || 'Not found';

      return facility;
    });
  });

  await kv.set('facilities', JSON.stringify(data));

  res.json({ facilities: data });

  await browser.close();
};

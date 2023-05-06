import { VercelRequest, VercelResponse } from '@vercel/node';
import edgeChromium from 'chrome-aws-lambda';
import kv from '@vercel/kv';
import puppeteer, { type Browser } from 'puppeteer-core';

const url = 'https://www.booking.com/hotel/fr/refuges-des-hauts.fr.html';

const LOCAL_CHROME_EXECUTABLE = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

export default async (req: VercelRequest, res: VercelResponse) => {
  const executablePath =
    process.env.VERCEL_ENV === 'production'
      ? await edgeChromium.executablePath
      : LOCAL_CHROME_EXECUTABLE;

  const browser: Browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
  });

  try {
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
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  } finally {
    await browser.close();
  }
};

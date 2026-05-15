import puppeteer from "puppeteer";

export const dynamic = "force-dynamic";

const VIEWPORT_WIDTH = 1082;

export async function GET(request) {
  const { origin } = new URL(request.url);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.setViewport({
      width: VIEWPORT_WIDTH,
      height: 900,
      deviceScaleFactor: 1,
    });

    await page.goto(`${origin}/barChart?print=true`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    await page.waitForSelector("canvas", {
      timeout: 10000,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const pdf = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="report-java-abstraction-001.pdf"',
      },
    });
  } finally {
    await browser.close();
  }
}
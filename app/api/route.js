import https from "https";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
const getSimilarColor = require("get-similar-color").default;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("color");
  if (!id) return Response.json({ error: "NO Color provided!" });

  const page = await fetch("https://sinauniforms.com/all-color-list/");
  const page_text = await page.text();
  const defaultColorArray = HTML2Object(page_text);
  const findColor = getSimilarColor({
    targetColor: id,
    colorArray: defaultColorArray,
    // min :0.01 max: 1 not required default 0.8
    similarityThreshold: 0.5,
  });
  if (!findColor) {
    return Response.json({ error: "NO COLOR FIND!" });
  }
  const result = defaultColorArray.filter(
    (tempColor) => tempColor.hex == findColor.hex
  );
  if (!result) {
    return Response.json({ error: "NO COLOR FIND!" });
  }
  return Response.json({ data: result });
}

function HTML2Object(page) {
  const dom = new JSDOM(page);
  const tbody = dom.window.document.getElementsByTagName("tbody");
  const trs = tbody[1].getElementsByTagName("tr");

  let colors = [];
  // trs = trs.filter((tr) => tr.children.length === 5);
  for (let tr of trs) {
    if (tr.children.length === 5) {
      const tds = tr.getElementsByTagName("td");
      let tempHex = p2e(
        `#${tds[3].textContent}${tds[2].textContent}${tds[1].textContent}`
      );
      colors.push({
        persian_name: tds[0].textContent,
        hex: tempHex,
        name: tds[4]
          .getAttribute("style")
          .replace("background: ", "")
          .replace(";", ""),
      });
    }
  }
  return colors;
}

function p2e(s) {
  return s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}

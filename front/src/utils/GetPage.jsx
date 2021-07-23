const request = require("request");
const cheerio = require("cheerio");


const Scraper = async () => {
  request.get("http://www.ce.hongik.ac.kr/dept/index.html", function(err, res, body) {
  const $ = cheerio.load(body);
  const $preview = $(".in ul li");

  let json = [];
  $preview.each(function(idx,ele){
    json[idx] = {
      title: $(this).text(),
      url: $(this).find('a').attr('href')
    }
  })
  return {json};
});
}
const note = ['a'];
console.log(note);
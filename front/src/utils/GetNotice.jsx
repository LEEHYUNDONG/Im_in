const axios = require('axios');
const cheerio = require('react-native-cheerio');
const url = `http://www.ce.hongik.ac.kr/dept/index.html`;

let href = [];
let title = [];
/*
function GetNotice() {
        fetch(url).then(function(response) {
                console.log(response.text());
            }).then(function(string) {
                elem.innerHTML = string;
            });

        
        fetch.get(`http://www.ce.hongik.ac.kr/dept/index.html`,)
            .then(function(response){
                const $ = cheerio.load(response.data);
                $('div.in>ul>li>a').each((index, item)=>{href.push(item.attribs.href)});
                $('div.in>ul>li').each((index, item)=>{title.push($(item).text().trim())});
                console.log(href,title);
                console.log("1");
        })   
        console.log("2");
        console.log(href, title);
        return title
}

GetNotice();
*/
fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue'
  })
});

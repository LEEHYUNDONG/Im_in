const cheerio = require("cheerio-without-node-native");
// const request = require("requestretry");

export default async function getPage() {
	let pageNum = 1;
	let result = [];
	let ulList = [];
	// 전체 페이지 리스트 구하기
	let url = `https://www.nubija.com/board/getList.do?bdno=2&currPage=${pageNum}`;
	const options = {
		method: "GET",
		encoding: null,
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
			Accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"Content-Type": "application/x-www-form-urlencoded",
			Cookie:
				"WMONID=m2zajRZqm5f; _ga=GA1.2.1860211416.1622781690; _gid=GA1.2.882171542.1623936429; JSESSIONID=DFFB23E27EFF9769B473D12C31A83487; _gat=1",
		},
	};

	let html = await fetch(url, options);
	let responseOK = html && html.ok;
	if (responseOK) {
		let data = await html.text();
		const $ = cheerio.load(data);
		const $list = $("#notice_border tbody tr td:nth-of-type(2) a").toArray();
		const $maxPageNum = $("#list_number span:nth-of-type(2)")
			.text()
			.split("/")[1];
		$list.map((el, idx) => {
			ulList[idx] = parseInt($(el).attr("onclick").split("'")[1]);
		});
		// console.log(ulList, $maxPageNum);
	}

	// 페이지별 데이터 구하기

	await Promise.all(
		ulList.map((el, idx) => {
			let liUrl = `https://www.nubija.com/board/getView.do?bdno=2&blno=${el}`;
			return fetch(liUrl, options)
				.then((res) => res.text())
				.then((data) => {
					const $ = cheerio.load(data);
					//trim으로 공백 제거
					result.push({
						id: idx,
						title: $(".view_title").text().trim(),
						content: $("#board_contents").text().trim(),
						date: $("#border_view tbody tr:nth-of-type(2) td:nth-of-type(1)")
							.text()
							.trim(),
					});
				});
		})
	);
	// console.log(result);
	return result;
}
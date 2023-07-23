const cheerio = require('cheerio');
const epid = 752432;
    async function cidd() {
	const hyuan = await fetch(`https://www.bilibili.com/bangumi/play/ep${epid}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
      },
    });
    const htm = await hyuan.text();
    const $$ = cheerio.load(htm);
    const yuan =$$('script#__NEXT_DATA__').html();
	const jsonData = JSON.parse(yuan);
	const jcid = jsonData.props.pageProps.dehydratedState.queries[0].state.data.epMap[epid].cid;
	const cid=JSON.stringify(jcid);  
	processResult(cid);
  return cid;
	}

function processResult(cid,result) {
const url = require('url');
const { exec } = require('child_process');
const urla = `https://api.bilibili.com/x/v1/dm/list.so?oid=${cid}`;

exec(`curl "${urla}" --compressed`, (error, stdout, stderr) => {
    if (error) {
        console.error('执行命令时出错:', error);
        return;
    }

    const result = stdout;
    processResult(result); // 调用定义的处理函数，并传递 result 到外部
});

// 定义一个函数来处理 result 并将其传递到外部

function processResult(result) {
    console.log(result); 
    // 使用 cheerio 解析 XML 数据
    const $ = cheerio.load(result.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, ''), {
        xmlMode: true
    });

    // 将解析后的弹幕数据转换为数组格式
    const data = $('d').map((i, el) => {
        const item = $(el);
        const p = item.attr('p').split(',');
        let type = 0;
        if (p[1] === '4') {
            type = 2; 
        } else if (p[1] === '5') {
            type = 1;
        }

        // 返回弹幕信息的数组
        return [[parseFloat(p[0]), type, parseInt(p[3]), p[6], item.text()]];
    }).get();

    // 设置响应头，表示从 Bilibili API 中获取数据
   //ctx.response.set('X-Koa-Origin', 'true');
    
    // 将结果返回给客户端，以 JSON 格式表示
}
}
cidd().then((cid) => {
console.log(cid);
});
processResult().then((data) => {
console.log(JSON.stringify({
                code: 0,
                data: data,
            }));
});

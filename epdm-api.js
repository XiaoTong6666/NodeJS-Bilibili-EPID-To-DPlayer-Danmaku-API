const cheerio = require('cheerio');
const http = require('http');
const url = require('url');
const { exec } = require('child_process');
const port = 8080;
//懂得都懂，http路由
http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/v3/?id=')) {
    const epid = url.parse(req.url, true).query.id;
    const epid1 = epid*1 //变一下变量类型，不然下面的find()用不了（*1之后实测能用，众所周知a*1=a，所以就想到这个）
    // 想办法用epid把对应的cid搞到手
    async function cidd() {
      const hyuan = await fetch(`https://www.bilibili.com/bangumi/play/ep${epid}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
        },
      });
      const htm = await hyuan.text();
      const $$ = cheerio.load(htm);
      const yuan = $$('script#__NEXT_DATA__').html();
      const jsonData = JSON.parse(yuan);
      const jcid = jsonData.props.pageProps.dehydratedState.queries[0].state.data.result.play_view_business_info.episode_info.cid;
      const cid = JSON.stringify(jcid);
      return cid;
    }
//回调获取的cid再次请求获取原屎xml，这个地方用fetch-API和https模块都解不开，替代方案就是curl了，curl YYDS
    cidd()
      .then((cid) => {
        const urla = `https://api.bilibili.com/x/v1/dm/list.so?oid=${cid}`;
        exec(`curl "${urla}" --compressed`, (error, stdout, stderr) => {
          if (error) {
            return;
          }

          const result = stdout;
          // 处理原屎xml鼠据
          async function ctx() {
            const $ = cheerio.load(result.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, ''), {
              xmlMode: true
            });
            const data = $('d').map((i, el) => {
              const item = $(el);
              const p = item.attr('p').split(',');
              let type = 0;

              if (p[1] === '4') {
                type = 2;
              } else if (p[1] === '5') {
                type = 1;
              }

              return [[parseFloat(p[0]), type, parseInt(p[3]), p[6], item.text()]];
            }).get();
            return data;
          }
//回调data，然后输出json
          ctx()
            .then((data) => {
              const out = JSON.stringify({
                code: 0,
                data: data,
              });
              const outt = out !== null ? out : '{}';
              res.writeHead(200, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              });
              res.write(outt);
              res.end();
            })
            .catch((error) => {
             return;
            });
        });
      })
      .catch((error) => {
		  return;
      });
  }
}).listen(port, () => {
	console.log('监听端口：'+port);
	console.log(`使用例子：curl "http://[::1]:${port}/v3/?id=341209"`)
	});
/*
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
弄点注释补一下空位吧，不然这一个后端都成前端了
*/
const cheerio = require('cheerio');
const http = require('http');
const url = require('url');
const { exec } = require('child_process');
const port = 8080;
//懂得都懂，http路由
http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/v3/?id=')) {
    const epidstr = url.parse(req.url, true).query.id;
    const epidnum = Number(epidstr); //变一下变量类型，不然下面的find()用不了
    // 想办法用epid把对应的cid搞到手
    async function huoqucid() {
      const yuanshi = await fetch(`https://api.bilibili.com/pgc/view/web/ep/list?ep_id=${epidstr}`, {
        "headers": {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:143.0) Gecko/20100101 Firefox/143.0",
        },
      });
      const jsondata = await yuanshi.json();
      const jsoncid = jsondata.result.episodes.find(ep => ep.ep_id === epidnum).cid;
      const cid = JSON.stringify(jsoncid);
      return cid;
    }
//回调获取的cid再次请求获取原屎xml，这个地方用fetch-API和https模块都解不开，替代方案就是curl了，curl YYDS
    huoqucid()
      .then((cid) => {
        const danmuurl = `https://api.bilibili.com/x/v1/dm/list.so?oid=${cid}`;
        exec(`curl "${danmuurl}" --compressed`, (error, stdout, stderr) => {
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

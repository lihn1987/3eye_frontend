import  http from 'http'
import querystring from 'querystring'
import url from 'url'
import { handle_get } from './handle.mjs';
import { handle_post } from './handle.mjs'
http.createServer(function (req, res) {
    //暂存请求体信息
    var body = "";
 
    //请求链接
    console.log(req.url);
 
    //每当接收到请求体数据，累加到post中
    req.on('data', function (chunk) {
        body += chunk; 
    });
 
    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function () {
        // 解析参数
        try {
            console.log("body:",body);
            console.log("method", req.method)
            if (req.method == "GET"){
                var url_obj = url.parse(req.url)
                var method = url_obj.pathname
                var query_obj = querystring.parse(url_obj.query)
                console.log("method:", method)
                console.log("query_obj", JSON.stringify(query_obj))
                handle_get(method, query_obj, (data) => {
                    res.write(JSON.stringify(data))
                    res.end();
                })
            }else if (req.method == "POST"){
                var param = JSON.parse(body); 
                handle_post(req.url, param, (data) => {
                    res.write(JSON.stringify(data))
                    res.end();
                })
            }
        } catch (e) {
            console.log("error:", e)
            res.end();
        }
        
    });
}).listen(3000);
console.log("lession:3000")
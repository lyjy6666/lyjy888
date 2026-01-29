import { http, HttpResponse } from 'msw';

export const handlers = [
  // 拦截天气API请求
  // 注释掉模拟处理，允许真实API请求通过
  /*http.get('http://v1.yiketianqi.com/free/day', () => {
    // 返回模拟数据
    return HttpResponse.json({ temp: 25 });
  }),*/
  
  // 添加一个随机返回错误的处理程序，用于测试错误处理
  http.get('http://101.35.2.25/api/tianqi/tqyb.php?error=true', () => {
    return HttpResponse.json(
      { code: 400, msg: "模拟错误：通讯秘钥错误" },
      { status: 400 }
    );
  })
];
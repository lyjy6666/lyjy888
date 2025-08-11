import { http, HttpResponse } from 'msw';

// 模拟天气API响应数据
const mockWeatherData = {
  "precipitation": 0,
  "temperature": 26.5,
  "pressure": 943,
  "humidity": 87,
  "windDirection": "西北风",
  "windDirectionDegree": 338,
  "windSpeed": 2.4,
  "windScale": "微风",
  "feelst": 30.1,
  "code": 200,
"place": "深圳",
  "weather1": "晴",
  "weather2": "多云",
  "weather1img": "https://rescdn.apihz.cn/resimg/tianqi/qing.png",
  "weather2img": "https://rescdn.apihz.cn/resimg/tianqi/duoyun.png",
  "uptime": "2025/08/04 18:55",
  "jieqi": ""
};

export const handlers = [
  // 拦截天气API请求
  // 注释掉模拟处理，允许真实API请求通过
  /*http.get('http://v1.yiketianqi.com/free/day', () => {
    // 返回模拟数据
    return HttpResponse.json(mockWeatherData);
  }),*/
  
  // 添加一个随机返回错误的处理程序，用于测试错误处理
  http.get('http://101.35.2.25/api/tianqi/tqyb.php?error=true', () => {
    return HttpResponse.json(
      { code: 400, msg: "模拟错误：通讯秘钥错误" },
      { status: 400 }
    );
  })
];
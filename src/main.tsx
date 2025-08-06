import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'sonner';
import App from "./App.tsx";
import "./index.css";
 import { worker } from './mocks/browser';
 
 // 在开发环境中启动Mock Service Worker
  // 暂时禁用Mock Service Worker以测试真实API
  /*if (import.meta.env.DEV) {
    worker.start({
      onUnhandledRequest: 'bypass' // 绕过未处理的请求
    }).catch(console.error);
  }*/
 
 createRoot(document.getElementById("root")!).render(
   <StrictMode>
     <BrowserRouter>
       <App />
       <Toaster />
     </BrowserRouter>
   </StrictMode>
 );

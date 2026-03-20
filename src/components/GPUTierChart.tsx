import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==================== 硬件类型定义 ====================
type HardwareType = 'gpu' | 'cpu' | 'monitor' | 'mobilecpu' | 'headphone' | 'router';

// 硬件类型信息
const hardwareTypeInfo: Record<HardwareType, { name: string; icon: string; benchmark: string }> = {
  gpu: { name: '显卡', icon: 'fa-solid fa-microchip', benchmark: 'RTX 5090 Ti' },
  cpu: { name: '处理器', icon: 'fa-solid fa-cpu', benchmark: 'R9 9950X3D' },
  monitor: { name: '显示器', icon: 'fa-solid fa-display', benchmark: 'PG32UCDM' },
  mobilecpu: { name: '手机CPU', icon: 'fa-solid fa-mobile-screen', benchmark: 'A18 Pro' },
  headphone: { name: '耳机', icon: 'fa-solid fa-headphones', benchmark: 'HD 800S' },
  router: { name: '路由器', icon: 'fa-solid fa-wifi', benchmark: 'GT-BE98 Pro' },
};

// ==================== 显卡数据类型 ====================
interface GPUData {
  id: number;
  name: string;
  performance: number; // 性能百分比
  brand: 'NVIDIA' | 'AMD' | 'Intel';
  tier: '旗舰' | '高端' | '中端' | '主流' | '入门' | '低端';
  specs: {
    vram: string;
    vramType: string;
    cores: string;
    bandwidth: string;
    tdp: string;
    process: string;
  };
  gaming: {
    p1080: string;
    p2k: string;
    p4k: string;
  };
  price?: string;
  releaseDate: string;
}

// 显卡天梯数据 - 100款显卡
const gpuData: GPUData[] = [
  // ==================== 旗舰级 ====================
  { id: 1, name: 'RTX 5090 Ti', performance: 100, brand: 'NVIDIA', tier: '旗舰',
    specs: { vram: '32GB', vramType: 'GDDR7', cores: '24064', bandwidth: '2016GB/s', tdp: '600W', process: '3nm' },
    gaming: { p1080: '顶级', p2k: '顶级', p4k: '140FPS+' }, price: '￥19999+', releaseDate: '2026年1月' },
  { id: 2, name: 'RTX 5090', performance: 92.59, brand: 'NVIDIA', tier: '旗舰',
    specs: { vram: '32GB', vramType: 'GDDR7', cores: '21760', bandwidth: '1792GB/s', tdp: '575W', process: '5nm' },
    gaming: { p1080: '顶级', p2k: '顶级', p4k: '120FPS+' }, price: '￥16499+', releaseDate: '2025年1月' },
  { id: 3, name: 'RTX 5090D', performance: 85.19, brand: 'NVIDIA', tier: '旗舰',
    specs: { vram: '32GB', vramType: 'GDDR7', cores: '21760', bandwidth: '1792GB/s', tdp: '575W', process: '5nm' },
    gaming: { p1080: '顶级', p2k: '顶级', p4k: '110FPS+' }, price: '￥16499+', releaseDate: '2025年1月' },
  { id: 4, name: 'RTX 5080', performance: 84.62, brand: 'NVIDIA', tier: '高端',
    specs: { vram: '16GB', vramType: 'GDDR7', cores: '10752', bandwidth: '960GB/s', tdp: '360W', process: '5nm' },
    gaming: { p1080: '顶级', p2k: '顶级', p4k: '90FPS+' }, price: '￥8299+', releaseDate: '2025年1月' },
  { id: 5, name: 'RTX 4090', performance: 76.92, brand: 'NVIDIA', tier: '高端',
    specs: { vram: '24GB', vramType: 'GDDR6X', cores: '16384', bandwidth: '1008GB/s', tdp: '450W', process: '4nm' },
    gaming: { p1080: '顶级', p2k: '顶级', p4k: '80FPS+' }, price: '￥12999+', releaseDate: '2022年10月' },
  { id: 5, name: 'RTX 4090 D', performance: 72.31, brand: 'NVIDIA', tier: '高端',
    specs: { vram: '24GB', vramType: 'GDDR6X', cores: '14592', bandwidth: '1008GB/s', tdp: '425W', process: '4nm' },
    gaming: { p1080: '顶级', p2k: '顶级', p4k: '75FPS+' }, price: '￥10999+', releaseDate: '2024年1月' },
  { id: 6, name: 'RTX 3090 Ti', performance: 70.77, brand: 'NVIDIA', tier: '高端',
    specs: { vram: '24GB', vramType: 'GDDR6X', cores: '10752', bandwidth: '1008GB/s', tdp: '450W', process: '8nm' },
    gaming: { p1080: '顶级', p2k: '顶级', p4k: '70FPS+' }, price: '￥7999+', releaseDate: '2022年3月' },
  
  // ==================== 高端级 ====================
  { id: 7, name: 'RTX 5070 Ti', performance: 69.23, brand: 'NVIDIA', tier: '中端',
    specs: { vram: '16GB', vramType: 'GDDR7', cores: '8960', bandwidth: '672GB/s', tdp: '300W', process: '5nm' },
    gaming: { p1080: '顶级', p2k: '高', p4k: '60FPS+' }, price: '￥5499+', releaseDate: '2025年2月' },
  { id: 8, name: 'RTX 4080 SUPER', performance: 68.46, brand: 'NVIDIA', tier: '中端',
    specs: { vram: '16GB', vramType: 'GDDR6X', cores: '10240', bandwidth: '736GB/s', tdp: '320W', process: '4nm' },
    gaming: { p1080: '顶级', p2k: '高', p4k: '60FPS+' }, price: '￥7499+', releaseDate: '2024年1月' },
  { id: 9, name: 'RTX 3090', performance: 65.38, brand: 'NVIDIA', tier: '中端',
    specs: { vram: '24GB', vramType: 'GDDR6X', cores: '10496', bandwidth: '936GB/s', tdp: '350W', process: '8nm' },
    gaming: { p1080: '顶级', p2k: '高', p4k: '55FPS+' }, price: '￥6999+', releaseDate: '2020年9月' },
  { id: 10, name: 'RX 9070 XT', performance: 65.38, brand: 'AMD', tier: '中端',
    specs: { vram: '16GB', vramType: 'GDDR6', cores: '3584', bandwidth: '512GB/s', tdp: '260W', process: '4nm' },
    gaming: { p1080: '顶级', p2k: '高', p4k: '55FPS+' }, price: '￥4299+', releaseDate: '2026年3月' },
  { id: 11, name: 'RTX 4080', performance: 63.85, brand: 'NVIDIA', tier: '中端',
    specs: { vram: '16GB', vramType: 'GDDR6X', cores: '9728', bandwidth: '717GB/s', tdp: '320W', process: '4nm' },
    gaming: { p1080: '顶级', p2k: '高', p4k: '55FPS+' }, price: '￥6999+', releaseDate: '2022年11月' },
  { id: 12, name: 'RX 9070 GRE', performance: 61.54, brand: 'AMD', tier: '中端',
    specs: { vram: '12GB', vramType: 'GDDR6', cores: '3072', bandwidth: '432GB/s', tdp: '220W', process: '4nm' },
    gaming: { p1080: '顶级', p2k: '高', p4k: '50FPS+' }, price: '￥3699+', releaseDate: '2026年4月' },
  { id: 13, name: 'RX 7900 XTX', performance: 61.54, brand: 'AMD', tier: '中端',
    specs: { vram: '24GB', vramType: 'GDDR6', cores: '6144', bandwidth: '960GB/s', tdp: '355W', process: '5nm' },
    gaming: { p1080: '顶级', p2k: '高', p4k: '50FPS+' }, price: '￥6499+', releaseDate: '2022年12月' },
  { id: 14, name: 'RTX 5070', performance: 61.54, brand: 'NVIDIA', tier: '中端',
    specs: { vram: '12GB', vramType: 'GDDR7', cores: '6144', bandwidth: '448GB/s', tdp: '250W', process: '5nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '50FPS+' }, price: '￥4299+', releaseDate: '2025年2月' },
  { id: 15, name: 'RTX 3080 Ti', performance: 61.54, brand: 'NVIDIA', tier: '中端',
    specs: { vram: '12GB', vramType: 'GDDR6X', cores: '10240', bandwidth: '912GB/s', tdp: '350W', process: '8nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '50FPS+' }, price: '￥4999+', releaseDate: '2021年6月' },
  { id: 16, name: 'RX 6950 XT', performance: 60, brand: 'AMD', tier: '中端',
    specs: { vram: '16GB', vramType: 'GDDR6', cores: '5120', bandwidth: '576GB/s', tdp: '335W', process: '7nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '48FPS+' }, price: '￥4999+', releaseDate: '2022年5月' },
  
  // ==================== 中端级 ====================
  { id: 17, name: 'RTX 3080 12GB', performance: 58.46, brand: 'NVIDIA', tier: '中端',
    specs: { vram: '12GB', vramType: 'GDDR6X', cores: '8960', bandwidth: '912GB/s', tdp: '350W', process: '8nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '45FPS+' }, price: '￥4499+', releaseDate: '2021年12月' },
  { id: 18, name: 'RX 7900 XT', performance: 57.69, brand: 'AMD', tier: '中端',
    specs: { vram: '20GB', vramType: 'GDDR6', cores: '5376', bandwidth: '800GB/s', tdp: '315W', process: '5nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '45FPS+' }, price: '￥5499+', releaseDate: '2022年12月' },
  { id: 19, name: 'RX 6900 XT', performance: 57.69, brand: 'AMD', tier: '中端',
    specs: { vram: '16GB', vramType: 'GDDR6', cores: '5120', bandwidth: '512GB/s', tdp: '300W', process: '7nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '45FPS+' }, price: '￥4499+', releaseDate: '2020年12月' },
  { id: 20, name: 'RTX 4070 Ti SUPER', performance: 57.69, brand: 'NVIDIA', tier: '主流',
    specs: { vram: '16GB', vramType: 'GDDR6X', cores: '8448', bandwidth: '512GB/s', tdp: '285W', process: '4nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '45FPS+' }, price: '￥5499+', releaseDate: '2024年1月' },
  { id: 21, name: 'RTX 3080 10GB', performance: 56.92, brand: 'NVIDIA', tier: '主流',
    specs: { vram: '10GB', vramType: 'GDDR6X', cores: '8704', bandwidth: '760GB/s', tdp: '320W', process: '8nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '42FPS+' }, price: '￥3999+', releaseDate: '2020年9月' },
  { id: 22, name: 'RX 7900 GRE', performance: 55.38, brand: 'AMD', tier: '主流',
    specs: { vram: '16GB', vramType: 'GDDR6', cores: '5120', bandwidth: '576GB/s', tdp: '260W', process: '5nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '40FPS+' }, price: '￥3999+', releaseDate: '2023年7月' },
  { id: 23, name: 'RX 6800 XT', performance: 55.38, brand: 'AMD', tier: '主流',
    specs: { vram: '16GB', vramType: 'GDDR6', cores: '4608', bandwidth: '512GB/s', tdp: '300W', process: '7nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '40FPS+' }, price: '￥3999+', releaseDate: '2020年11月' },
  { id: 24, name: 'RTX 4070 Ti', performance: 53.85, brand: 'NVIDIA', tier: '主流',
    specs: { vram: '12GB', vramType: 'GDDR6X', cores: '7680', bandwidth: '504GB/s', tdp: '285W', process: '4nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '40FPS+' }, price: '￥4799+', releaseDate: '2023年1月' },
  { id: 25, name: 'RX 7800 XT', performance: 53.85, brand: 'AMD', tier: '主流',
    specs: { vram: '16GB', vramType: 'GDDR6', cores: '3840', bandwidth: '624GB/s', tdp: '263W', process: '5nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '40FPS+' }, price: '￥3299+', releaseDate: '2023年9月' },
  { id: 26, name: 'RX 9060 XT 16GB', performance: 53.85, brand: 'AMD', tier: '主流',
    specs: { vram: '16GB', vramType: 'GDDR6', cores: '2048', bandwidth: '288GB/s', tdp: '160W', process: '4nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '40FPS+' }, price: '￥2899+', releaseDate: '2025年6月' },
  { id: 27, name: 'RTX 4070 SUPER', performance: 52.31, brand: 'NVIDIA', tier: '主流',
    specs: { vram: '12GB', vramType: 'GDDR6X', cores: '7168', bandwidth: '504GB/s', tdp: '220W', process: '4nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '38FPS+' }, price: '￥4199+', releaseDate: '2024年1月' },
  { id: 28, name: 'RX 6800', performance: 52.31, brand: 'AMD', tier: '主流',
    specs: { vram: '16GB', vramType: 'GDDR6', cores: '3840', bandwidth: '512GB/s', tdp: '250W', process: '7nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '38FPS+' }, price: '￥3299+', releaseDate: '2020年11月' },
  { id: 29, name: 'RX 9060 XT 8GB', performance: 52.31, brand: 'AMD', tier: '主流',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '2048', bandwidth: '288GB/s', tdp: '160W', process: '4nm' },
    gaming: { p1080: '高', p2k: '高', p4k: '38FPS+' }, price: '￥2499+', releaseDate: '2025年6月' },
  { id: 30, name: 'RTX 2080 Ti', performance: 50.77, brand: 'NVIDIA', tier: '主流',
    specs: { vram: '11GB', vramType: 'GDDR6', cores: '4352', bandwidth: '616GB/s', tdp: '250W', process: '12nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '35FPS+' }, price: '￥3999+', releaseDate: '2018年9月' },
  { id: 31, name: 'RTX 5060 Ti 16GB', performance: 50.77, brand: 'NVIDIA', tier: '主流',
    specs: { vram: '16GB', vramType: 'GDDR6', cores: '4608', bandwidth: '288GB/s', tdp: '180W', process: '5nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '35FPS+' }, price: '￥3599+', releaseDate: '2025年3月' },
  
  // ==================== 主流级 ====================
  { id: 32, name: 'RTX 5060 Ti 8GB', performance: 50, brand: 'NVIDIA', tier: '主流',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '4608', bandwidth: '288GB/s', tdp: '180W', process: '5nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '32FPS+' }, price: '￥3199+', releaseDate: '2025年3月' },
  { id: 33, name: 'RX 6750 GRE 12GB', performance: 48.46, brand: 'AMD', tier: '主流',
    specs: { vram: '12GB', vramType: 'GDDR6', cores: '2560', bandwidth: '432GB/s', tdp: '250W', process: '7nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '30FPS+' }, price: '￥1999+', releaseDate: '2023年10月' },
  { id: 34, name: 'RTX 3070 Ti', performance: 47.69, brand: 'NVIDIA', tier: '主流',
    specs: { vram: '8GB', vramType: 'GDDR6X', cores: '6144', bandwidth: '608GB/s', tdp: '290W', process: '8nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '30FPS+' }, price: '￥2999+', releaseDate: '2021年6月' },
  { id: 35, name: 'RX 7700 XT', performance: 47.69, brand: 'AMD', tier: '主流',
    specs: { vram: '12GB', vramType: 'GDDR6', cores: '3456', bandwidth: '432GB/s', tdp: '245W', process: '5nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '30FPS+' }, price: '￥2799+', releaseDate: '2023年9月' },
  { id: 36, name: 'RX 6750 GRE 10GB', performance: 46.92, brand: 'AMD', tier: '主流',
    specs: { vram: '10GB', vramType: 'GDDR6', cores: '2304', bandwidth: '360GB/s', tdp: '220W', process: '7nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '28FPS+' }, price: '￥1799+', releaseDate: '2023年10月' },
  { id: 37, name: 'RTX 5060 Ti', performance: 48.46, brand: 'NVIDIA', tier: '主流',
    specs: { vram: '16GB', vramType: 'GDDR7', cores: '4608', bandwidth: '320GB/s', tdp: '180W', process: '5nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '32FPS+' }, price: '￥2899+', releaseDate: '2026年2月' },
  { id: 38, name: 'RTX 5060', performance: 46.15, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '3840', bandwidth: '256GB/s', tdp: '150W', process: '5nm' },
    gaming: { p1080: '中', p2k: '中', p4k: '25FPS+' }, price: '￥2199+', releaseDate: '2026年3月' },
  { id: 39, name: 'RX 9060 XT 8GB', performance: 45.38, brand: 'AMD', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '1792', bandwidth: '256GB/s', tdp: '130W', process: '4nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '25FPS+' }, price: '￥1999+', releaseDate: '2026年5月' },
  { id: 40, name: 'RX 6700 XT', performance: 45.38, brand: 'AMD', tier: '入门',
    specs: { vram: '12GB', vramType: 'GDDR6', cores: '2560', bandwidth: '384GB/s', tdp: '230W', process: '7nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '25FPS+' }, price: '￥2299+', releaseDate: '2021年3月' },
  { id: 41, name: 'RTX 4070', performance: 44.62, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '12GB', vramType: 'GDDR6X', cores: '5888', bandwidth: '504GB/s', tdp: '200W', process: '4nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '25FPS+' }, price: '￥3499+', releaseDate: '2023年4月' },
  { id: 42, name: 'RX 7600 XT', performance: 44.62, brand: 'AMD', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '2048', bandwidth: '256GB/s', tdp: '190W', process: '6nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '25FPS+' }, price: '￥2099+', releaseDate: '2024年1月' },
  { id: 43, name: 'RTX 3070', performance: 43.85, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '5888', bandwidth: '448GB/s', tdp: '220W', process: '8nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '22FPS+' }, price: '￥2699+', releaseDate: '2020年10月' },
  { id: 44, name: 'RX 6700', performance: 43.08, brand: 'AMD', tier: '入门',
    specs: { vram: '10GB', vramType: 'GDDR6', cores: '2304', bandwidth: '320GB/s', tdp: '175W', process: '7nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '20FPS+' }, price: '￥1999+', releaseDate: '2021年6月' },
  { id: 45, name: 'RTX 2080 SUPER', performance: 42.31, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '3072', bandwidth: '496GB/s', tdp: '250W', process: '12nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '20FPS+' }, price: '￥2999+', releaseDate: '2019年7月' },
  { id: 46, name: 'RX 7600', performance: 42.31, brand: 'AMD', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '2048', bandwidth: '224GB/s', tdp: '165W', process: '6nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '20FPS+' }, price: '￥1799+', releaseDate: '2023年5月' },
  { id: 45, name: 'RTX 2080', performance: 41.54, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '2944', bandwidth: '448GB/s', tdp: '215W', process: '12nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '18FPS+' }, price: '￥2799+', releaseDate: '2018年9月' },
  { id: 46, name: 'RX 6650 XT', performance: 40.77, brand: 'AMD', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '2048', bandwidth: '256GB/s', tdp: '180W', process: '7nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '18FPS+' }, price: '￥1699+', releaseDate: '2022年5月' },
  { id: 47, name: 'RTX 4060 Ti 16GB', performance: 40, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '16GB', vramType: 'GDDR6', cores: '4352', bandwidth: '288GB/s', tdp: '165W', process: '4nm' },
    gaming: { p1080: '中', p2k: '中', p4k: '15FPS+' }, price: '￥2899+', releaseDate: '2023年7月' },
  { id: 48, name: 'Arc B580', performance: 40, brand: 'Intel', tier: '入门',
    specs: { vram: '12GB', vramType: 'GDDR6', cores: '2560', bandwidth: '384GB/s', tdp: '190W', process: '5nm' },
    gaming: { p1080: '中', p2k: '中', p4k: '15FPS+' }, price: '￥1699+', releaseDate: '2025年1月' },
  { id: 49, name: 'RTX 4060 Ti 8GB', performance: 39.23, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '4352', bandwidth: '288GB/s', tdp: '160W', process: '4nm' },
    gaming: { p1080: '中', p2k: '中', p4k: '15FPS+' }, price: '￥2499+', releaseDate: '2023年5月' },
  { id: 50, name: 'RX 6600 XT', performance: 39.23, brand: 'AMD', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '2048', bandwidth: '256GB/s', tdp: '160W', process: '7nm' },
    gaming: { p1080: '中', p2k: '中', p4k: '15FPS+' }, price: '￥1599+', releaseDate: '2021年8月' },
  { id: 51, name: 'RTX 2070 SUPER', performance: 38.46, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '2560', bandwidth: '448GB/s', tdp: '215W', process: '12nm' },
    gaming: { p1080: '中', p2k: '中', p4k: '12FPS+' }, price: '￥2499+', releaseDate: '2019年7月' },
  { id: 52, name: 'RTX 3060 Ti', performance: 38.46, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '4864', bandwidth: '448GB/s', tdp: '200W', process: '8nm' },
    gaming: { p1080: '中', p2k: '中', p4k: '12FPS+' }, price: '￥1999+', releaseDate: '2020年12月' },
  
  // ==================== 入门级 ====================
  { id: 53, name: 'Arc B570', performance: 37.69, brand: 'Intel', tier: '入门',
    specs: { vram: '10GB', vramType: 'GDDR6', cores: '2304', bandwidth: '320GB/s', tdp: '150W', process: '5nm' },
    gaming: { p1080: '中', p2k: '中', p4k: '10FPS+' }, price: '￥1399+', releaseDate: '2025年1月' },
  { id: 54, name: 'RTX 2070', performance: 36.92, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '2304', bandwidth: '448GB/s', tdp: '175W', process: '12nm' },
    gaming: { p1080: '中', p2k: '中', p4k: '10FPS+' }, price: '￥2299+', releaseDate: '2018年10月' },
  { id: 55, name: 'RX 6600', performance: 36.92, brand: 'AMD', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '1792', bandwidth: '224GB/s', tdp: '132W', process: '7nm' },
    gaming: { p1080: '中', p2k: '中', p4k: '10FPS+' }, price: '￥1399+', releaseDate: '2021年10月' },
  { id: 56, name: 'Arc A770 16GB', performance: 36.15, brand: 'Intel', tier: '入门',
    specs: { vram: '16GB', vramType: 'GDDR6', cores: '4096', bandwidth: '512GB/s', tdp: '225W', process: '6nm' },
    gaming: { p1080: '中', p2k: '低', p4k: '不推荐' }, price: '￥2199+', releaseDate: '2022年10月' },
  { id: 57, name: 'RTX 5050', performance: 34.62, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '2560', bandwidth: '192GB/s', tdp: '130W', process: '5nm' },
    gaming: { p1080: '中', p2k: '低', p4k: '不推荐' }, price: '￥1699+', releaseDate: '2025年4月' },
  { id: 58, name: 'RTX 4060', performance: 34, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '3072', bandwidth: '272GB/s', tdp: '115W', process: '4nm' },
    gaming: { p1080: '中', p2k: '低', p4k: '不推荐' }, price: '￥2099+', releaseDate: '2023年6月' },
  { id: 59, name: 'RTX 2060 SUPER', performance: 33.85, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '2176', bandwidth: '448GB/s', tdp: '175W', process: '12nm' },
    gaming: { p1080: '中', p2k: '低', p4k: '不推荐' }, price: '￥1999+', releaseDate: '2019年7月' },
  { id: 60, name: 'Arc A770 8GB', performance: 33.85, brand: 'Intel', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '4096', bandwidth: '512GB/s', tdp: '225W', process: '6nm' },
    gaming: { p1080: '中', p2k: '低', p4k: '不推荐' }, price: '￥1799+', releaseDate: '2022年10月' },
  { id: 61, name: 'Arc A750', performance: 32.31, brand: 'Intel', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '3584', bandwidth: '512GB/s', tdp: '225W', process: '6nm' },
    gaming: { p1080: '中', p2k: '低', p4k: '不推荐' }, price: '￥1499+', releaseDate: '2022年10月' },
  { id: 62, name: 'RTX 3060 12GB', performance: 31.54, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '12GB', vramType: 'GDDR6', cores: '3584', bandwidth: '360GB/s', tdp: '170W', process: '8nm' },
    gaming: { p1080: '中', p2k: '低', p4k: '不推荐' }, price: '￥1799+', releaseDate: '2021年2月' },
  { id: 63, name: 'RTX 2060', performance: 30.77, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '6GB', vramType: 'GDDR6', cores: '1920', bandwidth: '336GB/s', tdp: '160W', process: '12nm' },
    gaming: { p1080: '中', p2k: '低', p4k: '不推荐' }, price: '￥1799+', releaseDate: '2019年1月' },
  { id: 64, name: 'GTX 1080 Ti', performance: 30, brand: 'NVIDIA', tier: '入门',
    specs: { vram: '11GB', vramType: 'GDDR5X', cores: '3584', bandwidth: '484GB/s', tdp: '250W', process: '16nm' },
    gaming: { p1080: '中', p2k: '低', p4k: '不推荐' }, price: '￥2999+', releaseDate: '2017年3月' },
  { id: 65, name: 'Arc A580', performance: 29.23, brand: 'Intel', tier: '入门',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '3072', bandwidth: '512GB/s', tdp: '175W', process: '6nm' },
    gaming: { p1080: '中', p2k: '低', p4k: '不推荐' }, price: '￥1299+', releaseDate: '2023年10月' },
  { id: 66, name: 'RX 6500 XT 8GB', performance: 29.23, brand: 'AMD', tier: '低端',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '1024', bandwidth: '128GB/s', tdp: '107W', process: '6nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥1099+', releaseDate: '2022年1月' },
  { id: 67, name: 'GTX 1080', performance: 28.46, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '8GB', vramType: 'GDDR5X', cores: '2560', bandwidth: '320GB/s', tdp: '180W', process: '16nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥1999+', releaseDate: '2016年5月' },
  { id: 68, name: 'GTX 1070 Ti', performance: 27.69, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '8GB', vramType: 'GDDR5', cores: '2432', bandwidth: '256GB/s', tdp: '180W', process: '16nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥1799+', releaseDate: '2017年11月' },
  { id: 69, name: 'RTX 3050 8GB', performance: 23.85, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '2560', bandwidth: '224GB/s', tdp: '130W', process: '8nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥1299+', releaseDate: '2022年1月' },
  { id: 70, name: 'RX 6500 XT 4GB', performance: 23.08, brand: 'AMD', tier: '低端',
    specs: { vram: '4GB', vramType: 'GDDR6', cores: '1024', bandwidth: '128GB/s', tdp: '107W', process: '6nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥899+', releaseDate: '2022年1月' },
  { id: 71, name: 'RX 6400', performance: 23.08, brand: 'AMD', tier: '低端',
    specs: { vram: '4GB', vramType: 'GDDR6', cores: '768', bandwidth: '128GB/s', tdp: '53W', process: '6nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥899+', releaseDate: '2022年5月' },
  { id: 72, name: 'RTX 3050 6GB', performance: 23.08, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '6GB', vramType: 'GDDR6', cores: '2304', bandwidth: '168GB/s', tdp: '70W', process: '8nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥1099+', releaseDate: '2024年2月' },
  { id: 73, name: 'GTX 1070', performance: 23.08, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '8GB', vramType: 'GDDR5', cores: '1920', bandwidth: '256GB/s', tdp: '150W', process: '16nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥1599+', releaseDate: '2016年6月' },
  { id: 74, name: 'GTX 1660 Ti', performance: 22.31, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '6GB', vramType: 'GDDR6', cores: '1536', bandwidth: '288GB/s', tdp: '120W', process: '12nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥1299+', releaseDate: '2019年2月' },
  { id: 75, name: 'Arc A380', performance: 21.54, brand: 'Intel', tier: '低端',
    specs: { vram: '6GB', vramType: 'GDDR6', cores: '1024', bandwidth: '186GB/s', tdp: '75W', process: '6nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥799+', releaseDate: '2022年6月' },
  { id: 76, name: 'GTX 1660 SUPER', performance: 20.77, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '6GB', vramType: 'GDDR6', cores: '1408', bandwidth: '336GB/s', tdp: '125W', process: '12nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥1199+', releaseDate: '2019年10月' },
  { id: 77, name: 'GTX 1660', performance: 20, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '6GB', vramType: 'GDDR5', cores: '1408', bandwidth: '192GB/s', tdp: '120W', process: '12nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥999+', releaseDate: '2019年3月' },
  { id: 78, name: 'GTX 1060 6GB', performance: 19.23, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '6GB', vramType: 'GDDR5', cores: '1280', bandwidth: '192GB/s', tdp: '120W', process: '16nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥899+', releaseDate: '2016年7月' },
  { id: 79, name: 'GTX 1650 SUPER', performance: 18.46, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '4GB', vramType: 'GDDR6', cores: '1280', bandwidth: '192GB/s', tdp: '100W', process: '12nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥899+', releaseDate: '2019年11月' },
  { id: 80, name: 'GTX 1060 3GB', performance: 17.69, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '3GB', vramType: 'GDDR5', cores: '1152', bandwidth: '192GB/s', tdp: '120W', process: '16nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥799+', releaseDate: '2016年8月' },
  { id: 81, name: 'RX 5700 XT', performance: 36.92, brand: 'AMD', tier: '主流',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '2560', bandwidth: '448GB/s', tdp: '225W', process: '7nm' },
    gaming: { p1080: '高', p2k: '中', p4k: '12FPS+' }, price: '￥2499+', releaseDate: '2019年7月' },
  { id: 82, name: 'RX 5700', performance: 34.62, brand: 'AMD', tier: '主流',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '2304', bandwidth: '448GB/s', tdp: '180W', process: '7nm' },
    gaming: { p1080: '中', p2k: '中', p4k: '不推荐' }, price: '￥2199+', releaseDate: '2019年7月' },
  { id: 83, name: 'RX 5600 XT', performance: 30.77, brand: 'AMD', tier: '入门',
    specs: { vram: '6GB', vramType: 'GDDR6', cores: '2304', bandwidth: '288GB/s', tdp: '150W', process: '7nm' },
    gaming: { p1080: '中', p2k: '低', p4k: '不推荐' }, price: '￥1799+', releaseDate: '2020年1月' },
  { id: 84, name: 'RX 5500 XT 8GB', performance: 26.15, brand: 'AMD', tier: '低端',
    specs: { vram: '8GB', vramType: 'GDDR6', cores: '1408', bandwidth: '224GB/s', tdp: '130W', process: '7nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥1299+', releaseDate: '2019年12月' },
  { id: 85, name: 'RX 5500 XT 4GB', performance: 25.38, brand: 'AMD', tier: '低端',
    specs: { vram: '4GB', vramType: 'GDDR6', cores: '1408', bandwidth: '224GB/s', tdp: '110W', process: '7nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥999+', releaseDate: '2019年12月' },
  { id: 86, name: 'RX Vega 64', performance: 28.46, brand: 'AMD', tier: '低端',
    specs: { vram: '8GB', vramType: 'HBM2', cores: '4096', bandwidth: '484GB/s', tdp: '295W', process: '14nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥2499+', releaseDate: '2017年8月' },
  { id: 87, name: 'RX Vega 56', performance: 26.15, brand: 'AMD', tier: '低端',
    specs: { vram: '8GB', vramType: 'HBM2', cores: '3584', bandwidth: '410GB/s', tdp: '210W', process: '14nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥2199+', releaseDate: '2017年8月' },
  { id: 88, name: 'Radeon VII', performance: 32.31, brand: 'AMD', tier: '主流',
    specs: { vram: '16GB', vramType: 'HBM2', cores: '3840', bandwidth: '1024GB/s', tdp: '300W', process: '7nm' },
    gaming: { p1080: '中', p2k: '低', p4k: '不推荐' }, price: '￥4299+', releaseDate: '2019年2月' },
  { id: 89, name: 'RX 580 8GB', performance: 20, brand: 'AMD', tier: '低端',
    specs: { vram: '8GB', vramType: 'GDDR5', cores: '2304', bandwidth: '256GB/s', tdp: '185W', process: '14nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥799+', releaseDate: '2017年4月' },
  { id: 90, name: 'RX 580 4GB', performance: 18.46, brand: 'AMD', tier: '低端',
    specs: { vram: '4GB', vramType: 'GDDR5', cores: '2304', bandwidth: '256GB/s', tdp: '185W', process: '14nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥699+', releaseDate: '2017年4月' },
  { id: 91, name: 'RX 570 8GB', performance: 16.92, brand: 'AMD', tier: '低端',
    specs: { vram: '8GB', vramType: 'GDDR5', cores: '2048', bandwidth: '224GB/s', tdp: '150W', process: '14nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥599+', releaseDate: '2017年4月' },
  { id: 92, name: 'GTX 1650', performance: 16.15, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '4GB', vramType: 'GDDR5', cores: '896', bandwidth: '128GB/s', tdp: '75W', process: '12nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥799+', releaseDate: '2019年4月' },
  { id: 93, name: 'GTX 1050 Ti', performance: 13.85, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '4GB', vramType: 'GDDR5', cores: '768', bandwidth: '112GB/s', tdp: '75W', process: '14nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥599+', releaseDate: '2016年10月' },
  { id: 94, name: 'GTX 1050', performance: 11.54, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '2GB', vramType: 'GDDR5', cores: '640', bandwidth: '112GB/s', tdp: '75W', process: '14nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥499+', releaseDate: '2016年10月' },
  { id: 95, name: 'RX 560 4GB', performance: 10.77, brand: 'AMD', tier: '低端',
    specs: { vram: '4GB', vramType: 'GDDR5', cores: '1024', bandwidth: '112GB/s', tdp: '80W', process: '14nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥399+', releaseDate: '2017年4月' },
  { id: 96, name: 'GTX 1030', performance: 8.46, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '2GB', vramType: 'GDDR4', cores: '384', bandwidth: '48GB/s', tdp: '30W', process: '14nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥399+', releaseDate: '2017年5月' },
  { id: 97, name: 'RX 550 4GB', performance: 7.69, brand: 'AMD', tier: '低端',
    specs: { vram: '4GB', vramType: 'GDDR5', cores: '512', bandwidth: '112GB/s', tdp: '50W', process: '14nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥349+', releaseDate: '2017年4月' },
  { id: 98, name: 'GTX 750 Ti', performance: 6.92, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '2GB', vramType: 'GDDR5', cores: '640', bandwidth: '80GB/s', tdp: '60W', process: '28nm' },
    gaming: { p1080: '低', p2k: '低', p4k: '不推荐' }, price: '￥299+', releaseDate: '2014年2月' },
  { id: 99, name: 'R5 230', performance: 3.08, brand: 'AMD', tier: '低端',
    specs: { vram: '1GB', vramType: 'DDR3', cores: '160', bandwidth: '10GB/s', tdp: '19W', process: '40nm' },
    gaming: { p1080: '极低', p2k: '不推荐', p4k: '不推荐' }, price: '￥199+', releaseDate: '2014年4月' },
  { id: 100, name: 'GT 710', performance: 2.31, brand: 'NVIDIA', tier: '低端',
    specs: { vram: '2GB', vramType: 'DDR3', cores: '192', bandwidth: '14GB/s', tdp: '19W', process: '28nm' },
    gaming: { p1080: '极低', p2k: '不推荐', p4k: '不推荐' }, price: '￥199+', releaseDate: '2014年3月' },
];

// ==================== 处理器数据类型 ====================
interface CPUData {
  id: number;
  name: string;
  performance: number;
  brand: 'Intel' | 'AMD' | 'Apple';
  tier: '旗舰' | '高端' | '中端' | '主流' | '入门' | '低端';
  cores: number;
  threads: number;
  baseClock: string;
  boostClock: string;
  cache: string;
  tdp: string;
  process: string;
  price?: string;
  releaseDate: string;
}

// 处理器天梯数据 - 60款处理器
const cpuData: CPUData[] = [
  // ==================== 旗舰级 ====================
  { id: 1, name: 'Ryzen 9 9950X3D', performance: 100, brand: 'AMD', tier: '旗舰',
    cores: 16, threads: 32, baseClock: '4.0GHz', boostClock: '5.7GHz', cache: '144MB', tdp: '170W', process: '4nm',
    price: '￥6999+', releaseDate: '2026年1月' },
  { id: 2, name: 'Core i9-14900KS', performance: 95.2, brand: 'Intel', tier: '旗舰',
    cores: 24, threads: 32, baseClock: '3.2GHz', boostClock: '6.2GHz', cache: '36MB', tdp: '150W', process: 'Intel 7',
    price: '￥5999+', releaseDate: '2024年3月' },
  { id: 3, name: 'Ryzen 9 9950X', performance: 93.5, brand: 'AMD', tier: '旗舰',
    cores: 16, threads: 32, baseClock: '4.3GHz', boostClock: '5.7GHz', cache: '80MB', tdp: '170W', process: '4nm',
    price: '￥5499+', releaseDate: '2024年8月' },
  { id: 4, name: 'Core i9-14900K', performance: 91.8, brand: 'Intel', tier: '旗舰',
    cores: 24, threads: 32, baseClock: '3.2GHz', boostClock: '6.0GHz', cache: '36MB', tdp: '125W', process: 'Intel 7',
    price: '￥4599+', releaseDate: '2023年10月' },
  { id: 5, name: 'Ryzen 9 7950X3D', performance: 89.6, brand: 'AMD', tier: '旗舰',
    cores: 16, threads: 32, baseClock: '4.2GHz', boostClock: '5.7GHz', cache: '144MB', tdp: '120W', process: '5nm',
    price: '￥4999+', releaseDate: '2023年2月' },
  
  // ==================== 高端级 ====================
  { id: 6, name: 'Core i7-14700K', performance: 82.3, brand: 'Intel', tier: '高端',
    cores: 20, threads: 28, baseClock: '3.4GHz', boostClock: '5.6GHz', cache: '33MB', tdp: '125W', process: 'Intel 7',
    price: '￥3299+', releaseDate: '2023年10月' },
  { id: 7, name: 'Ryzen 9 7900X3D', performance: 80.5, brand: 'AMD', tier: '高端',
    cores: 12, threads: 24, baseClock: '4.4GHz', boostClock: '5.6GHz', cache: '140MB', tdp: '120W', process: '5nm',
    price: '￥3599+', releaseDate: '2023年2月' },
  { id: 8, name: 'Ryzen 9 9900X', performance: 78.2, brand: 'AMD', tier: '高端',
    cores: 12, threads: 24, baseClock: '4.4GHz', boostClock: '5.6GHz', cache: '72MB', tdp: '120W', process: '4nm',
    price: '￥3499+', releaseDate: '2024年8月' },
  { id: 9, name: 'Core i7-13700K', performance: 75.8, brand: 'Intel', tier: '高端',
    cores: 16, threads: 24, baseClock: '3.4GHz', boostClock: '5.4GHz', cache: '30MB', tdp: '125W', process: 'Intel 7',
    price: '￥2799+', releaseDate: '2022年10月' },
  { id: 10, name: 'Ryzen 7 9800X3D', performance: 74.5, brand: 'AMD', tier: '高端',
    cores: 8, threads: 16, baseClock: '4.7GHz', boostClock: '5.2GHz', cache: '104MB', tdp: '120W', process: '4nm',
    price: '￥3299+', releaseDate: '2024年11月' },
  { id: 11, name: 'Ryzen 9 7950X', performance: 72.3, brand: 'AMD', tier: '高端',
    cores: 16, threads: 32, baseClock: '4.5GHz', boostClock: '5.7GHz', cache: '64MB', tdp: '170W', process: '5nm',
    price: '￥3599+', releaseDate: '2022年9月' },
  
  // ==================== 中端级 ====================
  { id: 12, name: 'Core i5-14600K', performance: 68.4, brand: 'Intel', tier: '中端',
    cores: 14, threads: 20, baseClock: '3.5GHz', boostClock: '5.3GHz', cache: '24MB', tdp: '125W', process: 'Intel 7',
    price: '￥2499+', releaseDate: '2023年10月' },
  { id: 13, name: 'Ryzen 7 9700X', performance: 65.2, brand: 'AMD', tier: '中端',
    cores: 8, threads: 16, baseClock: '3.8GHz', boostClock: '5.5GHz', cache: '40MB', tdp: '65W', process: '4nm',
    price: '￥2299+', releaseDate: '2024年8月' },
  { id: 14, name: 'Core i5-13600K', performance: 63.8, brand: 'Intel', tier: '中端',
    cores: 14, threads: 20, baseClock: '3.5GHz', boostClock: '5.1GHz', cache: '24MB', tdp: '125W', process: 'Intel 7',
    price: '￥2199+', releaseDate: '2022年10月' },
  { id: 15, name: 'Ryzen 7 7800X3D', performance: 62.5, brand: 'AMD', tier: '中端',
    cores: 8, threads: 16, baseClock: '4.2GHz', boostClock: '5.0GHz', cache: '104MB', tdp: '120W', process: '5nm',
    price: '￥2799+', releaseDate: '2023年4月' },
  { id: 16, name: 'Ryzen 7 7700X', performance: 58.6, brand: 'AMD', tier: '中端',
    cores: 8, threads: 16, baseClock: '4.5GHz', boostClock: '5.4GHz', cache: '40MB', tdp: '105W', process: '5nm',
    price: '￥1899+', releaseDate: '2022年9月' },
  { id: 17, name: 'Core i5-14500', performance: 56.3, brand: 'Intel', tier: '中端',
    cores: 14, threads: 20, baseClock: '2.6GHz', boostClock: '5.0GHz', cache: '24MB', tdp: '65W', process: 'Intel 7',
    price: '￥1799+', releaseDate: '2024年1月' },
  
  // ==================== 主流级 ====================
  { id: 18, name: 'Ryzen 5 9600X', performance: 52.4, brand: 'AMD', tier: '主流',
    cores: 6, threads: 12, baseClock: '3.9GHz', boostClock: '5.4GHz', cache: '38MB', tdp: '65W', process: '4nm',
    price: '￥1699+', releaseDate: '2024年8月' },
  { id: 19, name: 'Core i5-13400F', performance: 48.7, brand: 'Intel', tier: '主流',
    cores: 10, threads: 16, baseClock: '2.5GHz', boostClock: '4.6GHz', cache: '20MB', tdp: '65W', process: 'Intel 7',
    price: '￥1199+', releaseDate: '2023年1月' },
  { id: 20, name: 'Ryzen 5 7600X', performance: 46.8, brand: 'AMD', tier: '主流',
    cores: 6, threads: 12, baseClock: '4.7GHz', boostClock: '5.3GHz', cache: '38MB', tdp: '105W', process: '5nm',
    price: '￥1399+', releaseDate: '2022年9月' },
  { id: 21, name: 'Core i5-12400F', performance: 44.2, brand: 'Intel', tier: '主流',
    cores: 6, threads: 12, baseClock: '2.5GHz', boostClock: '4.4GHz', cache: '18MB', tdp: '65W', process: 'Intel 7',
    price: '￥899+', releaseDate: '2022年1月' },
  { id: 22, name: 'Ryzen 5 7500F', performance: 42.5, brand: 'AMD', tier: '主流',
    cores: 6, threads: 12, baseClock: '3.7GHz', boostClock: '5.0GHz', cache: '38MB', tdp: '65W', process: '5nm',
    price: '￥999+', releaseDate: '2023年7月' },
  { id: 23, name: 'Ryzen 5 5600', performance: 38.6, brand: 'AMD', tier: '主流',
    cores: 6, threads: 12, baseClock: '3.5GHz', boostClock: '4.4GHz', cache: '35MB', tdp: '65W', process: '7nm',
    price: '￥699+', releaseDate: '2022年4月' },
  
  // ==================== 入门级 ====================
  { id: 24, name: 'Core i3-14100F', performance: 32.4, brand: 'Intel', tier: '入门',
    cores: 4, threads: 8, baseClock: '3.5GHz', boostClock: '4.7GHz', cache: '12MB', tdp: '58W', process: 'Intel 7',
    price: '￥799+', releaseDate: '2024年1月' },
  { id: 25, name: 'Ryzen 5 5500', performance: 30.2, brand: 'AMD', tier: '入门',
    cores: 6, threads: 12, baseClock: '3.6GHz', boostClock: '4.2GHz', cache: '19MB', tdp: '65W', process: '7nm',
    price: '￥599+', releaseDate: '2022年4月' },
  { id: 26, name: 'Core i3-12100F', performance: 28.5, brand: 'Intel', tier: '入门',
    cores: 4, threads: 8, baseClock: '3.3GHz', boostClock: '4.3GHz', cache: '12MB', tdp: '58W', process: 'Intel 7',
    price: '￥599+', releaseDate: '2022年1月' },
  { id: 27, name: 'Ryzen 3 4100', performance: 22.8, brand: 'AMD', tier: '入门',
    cores: 4, threads: 8, baseClock: '3.8GHz', boostClock: '4.0GHz', cache: '8MB', tdp: '65W', process: '7nm',
    price: '￥499+', releaseDate: '2022年4月' },
  { id: 28, name: 'Core i3-10100F', performance: 20.5, brand: 'Intel', tier: '入门',
    cores: 4, threads: 8, baseClock: '3.6GHz', boostClock: '4.3GHz', cache: '6MB', tdp: '65W', process: '14nm',
    price: '￥399+', releaseDate: '2020年4月' },
  
  // ==================== 笔记本/移动端 ====================
  { id: 29, name: 'Apple M3 Max', performance: 78.5, brand: 'Apple', tier: '高端',
    cores: 16, threads: 16, baseClock: '-', boostClock: '4.05GHz', cache: '48MB', tdp: '40W', process: '3nm',
    price: '￥19999+', releaseDate: '2023年10月' },
  { id: 30, name: 'Apple M3 Pro', performance: 65.8, brand: 'Apple', tier: '中端',
    cores: 12, threads: 12, baseClock: '-', boostClock: '4.05GHz', cache: '36MB', tdp: '30W', process: '3nm',
    price: '￥14999+', releaseDate: '2023年10月' },
  { id: 31, name: 'Core i9-14900HX', performance: 72.3, brand: 'Intel', tier: '高端',
    cores: 24, threads: 32, baseClock: '2.2GHz', boostClock: '5.8GHz', cache: '36MB', tdp: '55W', process: 'Intel 7',
    price: '￥8999+', releaseDate: '2024年1月' },
  { id: 32, name: 'Ryzen 9 8945HS', performance: 58.4, brand: 'AMD', tier: '中端',
    cores: 8, threads: 16, baseClock: '4.0GHz', boostClock: '5.2GHz', cache: '24MB', tdp: '45W', process: '4nm',
    price: '￥6999+', releaseDate: '2024年1月' },
  { id: 33, name: 'Apple M3', performance: 52.6, brand: 'Apple', tier: '主流',
    cores: 8, threads: 8, baseClock: '-', boostClock: '4.05GHz', cache: '24MB', tdp: '22W', process: '3nm',
    price: '￥8999+', releaseDate: '2023年10月' },
  { id: 34, name: 'Core i7-13700H', performance: 48.2, brand: 'Intel', tier: '主流',
    cores: 14, threads: 20, baseClock: '2.4GHz', boostClock: '5.0GHz', cache: '24MB', tdp: '45W', process: 'Intel 7',
    price: '￥6999+', releaseDate: '2023年1月' },
  { id: 35, name: 'Ryzen 7 7840HS', performance: 45.8, brand: 'AMD', tier: '主流',
    cores: 8, threads: 16, baseClock: '3.8GHz', boostClock: '5.1GHz', cache: '24MB', tdp: '35W', process: '4nm',
    price: '￥5499+', releaseDate: '2023年5月' },
  { id: 36, name: 'Apple M2', performance: 42.3, brand: 'Apple', tier: '主流',
    cores: 8, threads: 8, baseClock: '-', boostClock: '3.49GHz', cache: '20MB', tdp: '20W', process: '5nm',
    price: '￥7499+', releaseDate: '2022年6月' },
  { id: 37, name: 'Core i5-13500H', performance: 40.5, brand: 'Intel', tier: '主流',
    cores: 12, threads: 16, baseClock: '2.6GHz', boostClock: '4.7GHz', cache: '18MB', tdp: '45W', process: 'Intel 7',
    price: '￥4999+', releaseDate: '2023年1月' },
  { id: 38, name: 'Ryzen 5 7640HS', performance: 36.2, brand: 'AMD', tier: '入门',
    cores: 6, threads: 12, baseClock: '4.0GHz', boostClock: '5.0GHz', cache: '22MB', tdp: '35W', process: '4nm',
    price: '￥4499+', releaseDate: '2023年5月' },
  { id: 39, name: 'Core i5-1240P', performance: 32.8, brand: 'Intel', tier: '入门',
    cores: 12, threads: 16, baseClock: '1.7GHz', boostClock: '4.4GHz', cache: '12MB', tdp: '28W', process: 'Intel 7',
    price: '￥3999+', releaseDate: '2022年2月' },
  { id: 40, name: 'Apple M1', performance: 28.5, brand: 'Apple', tier: '入门',
    cores: 8, threads: 8, baseClock: '-', boostClock: '3.2GHz', cache: '16MB', tdp: '15W', process: '5nm',
    price: '￥5999+', releaseDate: '2020年11月' },
];

// ==================== 显示器数据类型 ====================
interface MonitorData {
  id: number;
  name: string;
  performance: number;
  brand: string;
  tier: '旗舰' | '高端' | '中端' | '主流' | '入门';
  specs: {
    size: string;
    resolution: string;
    refreshRate: string;
    panelType: string;
    responseTime: string;
    colorGamut: string;
  };
  price?: string;
  releaseDate: string;
}

// 显示器天梯数据 - 40款
const monitorData: MonitorData[] = [
  // ==================== 旗舰级 ====================
  { id: 1, name: 'ROG PG32UCDM', performance: 100, brand: '华硕', tier: '旗舰',
    specs: { size: '32英寸', resolution: '4K 3840×2160', refreshRate: '240Hz', panelType: 'QD-OLED', responseTime: '0.03ms', colorGamut: '99% DCI-P3' },
    price: '￥12999+', releaseDate: '2024年1月' },
  { id: 2, name: 'Alienware AW3225QF', performance: 96, brand: '外星人', tier: '旗舰',
    specs: { size: '32英寸', resolution: '4K 3840×2160', refreshRate: '240Hz', panelType: 'QD-OLED', responseTime: '0.03ms', colorGamut: '99% DCI-P3' },
    price: '￥11999+', releaseDate: '2024年2月' },
  { id: 3, name: 'LG 32GS95UE', performance: 94, brand: 'LG', tier: '旗舰',
    specs: { size: '32英寸', resolution: '4K 3840×2160', refreshRate: '240Hz', panelType: 'WOLED', responseTime: '0.03ms', colorGamut: '98% DCI-P3' },
    price: '￥10999+', releaseDate: '2024年1月' },
  { id: 4, name: 'Samsung Odyssey OLED G9', performance: 92, brand: '三星', tier: '旗舰',
    specs: { size: '49英寸', resolution: '5K 5120×1440', refreshRate: '240Hz', panelType: 'QD-OLED', responseTime: '0.03ms', colorGamut: '99% DCI-P3' },
    price: '￥13999+', releaseDate: '2023年6月' },
  { id: 5, name: 'Dell U3224KB', performance: 88, brand: '戴尔', tier: '旗舰',
    specs: { size: '32英寸', resolution: '6K 6016×3384', refreshRate: '60Hz', panelType: 'IPS Black', responseTime: '5ms', colorGamut: '100% DCI-P3' },
    price: '￥25999+', releaseDate: '2023年3月' },
  
  // ==================== 高端级 ====================
  { id: 6, name: 'ROG PG27AQDM', performance: 82, brand: '华硕', tier: '高端',
    specs: { size: '27英寸', resolution: '2K 2560×1440', refreshRate: '240Hz', panelType: 'OLED', responseTime: '0.03ms', colorGamut: '99% DCI-P3' },
    price: '￥7999+', releaseDate: '2023年1月' },
  { id: 7, name: 'LG 27GR95QE-B', performance: 80, brand: 'LG', tier: '高端',
    specs: { size: '27英寸', resolution: '2K 2560×1440', refreshRate: '240Hz', panelType: 'OLED', responseTime: '0.03ms', colorGamut: '98% DCI-P3' },
    price: '￥6999+', releaseDate: '2023年1月' },
  { id: 8, name: 'ROG PG32UQX', performance: 78, brand: '华硕', tier: '高端',
    specs: { size: '32英寸', resolution: '4K 3840×2160', refreshRate: '144Hz', panelType: 'IPS', responseTime: '1ms', colorGamut: '98% DCI-P3' },
    price: '￥9999+', releaseDate: '2022年1月' },
  { id: 9, name: 'BenQ Mobiuz EX3210U', performance: 75, brand: '明基', tier: '高端',
    specs: { size: '32英寸', resolution: '4K 3840×2160', refreshRate: '144Hz', panelType: 'IPS', responseTime: '1ms', colorGamut: '98% DCI-P3' },
    price: '￥7999+', releaseDate: '2022年6月' },
  { id: 10, name: 'AORUS FO48U', performance: 72, brand: '技嘉', tier: '高端',
    specs: { size: '48英寸', resolution: '4K 3840×2160', refreshRate: '120Hz', panelType: 'OLED', responseTime: '0.1ms', colorGamut: '99% DCI-P3' },
    price: '￥8999+', releaseDate: '2021年7月' },
  
  // ==================== 中端级 ====================
  { id: 11, name: 'ROG PG279QM', performance: 68, brand: '华硕', tier: '中端',
    specs: { size: '27英寸', resolution: '2K 2560×1440', refreshRate: '240Hz', panelType: 'IPS', responseTime: '1ms', colorGamut: '95% DCI-P3' },
    price: '￥4999+', releaseDate: '2022年3月' },
  { id: 12, name: 'Dell S2722DGM', performance: 65, brand: '戴尔', tier: '中端',
    specs: { size: '27英寸', resolution: '2K 2560×1440', refreshRate: '165Hz', panelType: 'VA', responseTime: '2ms', colorGamut: '90% DCI-P3' },
    price: '￥2999+', releaseDate: '2021年6月' },
  { id: 13, name: 'LG 27GP850-B', performance: 62, brand: 'LG', tier: '中端',
    specs: { size: '27英寸', resolution: '2K 2560×1440', refreshRate: '180Hz', panelType: 'Nano IPS', responseTime: '1ms', colorGamut: '98% DCI-P3' },
    price: '￥3299+', releaseDate: '2021年4月' },
  { id: 14, name: 'AOC AGON PRO AG274QZM', performance: 60, brand: 'AOC', tier: '中端',
    specs: { size: '27英寸', resolution: '2K 2560×1440', refreshRate: '240Hz', panelType: 'IPS', responseTime: '1ms', colorGamut: '98% DCI-P3' },
    price: '￥4499+', releaseDate: '2022年1月' },
  { id: 15, name: 'MSI Optix MAG274QRF-QD', performance: 58, brand: '微星', tier: '中端',
    specs: { size: '27英寸', resolution: '2K 2560×1440', refreshRate: '165Hz', panelType: 'IPS', responseTime: '1ms', colorGamut: '97% DCI-P3' },
    price: '￥2499+', releaseDate: '2021年3月' },
  
  // ==================== 主流级 ====================
  { id: 16, name: 'Xiaomi Curved Gaming 34"', performance: 52, brand: '小米', tier: '主流',
    specs: { size: '34英寸', resolution: 'WQHD 3440×1440', refreshRate: '144Hz', panelType: 'VA', responseTime: '4ms', colorGamut: '85% DCI-P3' },
    price: '￥1999+', releaseDate: '2022年8月' },
  { id: 17, name: 'HKC SG27C', performance: 48, brand: '惠科', tier: '主流',
    specs: { size: '27英寸', resolution: '2K 2560×1440', refreshRate: '165Hz', panelType: 'VA', responseTime: '4ms', colorGamut: '85% sRGB' },
    price: '￥1099+', releaseDate: '2023年1月' },
  { id: 18, name: 'ASUS VG27AQ1A', performance: 46, brand: '华硕', tier: '主流',
    specs: { size: '27英寸', resolution: '2K 2560×1440', refreshRate: '170Hz', panelType: 'IPS', responseTime: '1ms', colorGamut: '95% DCI-P3' },
    price: '￥1899+', releaseDate: '2022年1月' },
  { id: 19, name: 'SANC G5C', performance: 44, brand: 'SANC', tier: '主流',
    specs: { size: '27英寸', resolution: '2K 2560×1440', refreshRate: '165Hz', panelType: 'VA', responseTime: '5ms', colorGamut: '90% sRGB' },
    price: '￥899+', releaseDate: '2023年3月' },
  { id: 20, name: 'Lenovo Legion Y25-30', performance: 42, brand: '联想', tier: '主流',
    specs: { size: '24.5英寸', resolution: '1080P 1920×1080', refreshRate: '240Hz', panelType: 'IPS', responseTime: '1ms', colorGamut: '99% sRGB' },
    price: '￥1599+', releaseDate: '2022年6月' },
  
  // ==================== 入门级 ====================
  { id: 21, name: 'HKC SG24C', performance: 36, brand: '惠科', tier: '入门',
    specs: { size: '23.8英寸', resolution: '1080P 1920×1080', refreshRate: '144Hz', panelType: 'VA', responseTime: '5ms', colorGamut: '85% sRGB' },
    price: '￥699+', releaseDate: '2023年1月' },
  { id: 22, name: 'AOC 24G2SP', performance: 34, brand: 'AOC', tier: '入门',
    specs: { size: '23.8英寸', resolution: '1080P 1920×1080', refreshRate: '165Hz', panelType: 'IPS', responseTime: '1ms', colorGamut: '99% sRGB' },
    price: '￥899+', releaseDate: '2022年3月' },
  { id: 23, name: 'SANC N50Pro', performance: 32, brand: 'SANC', tier: '入门',
    specs: { size: '24英寸', resolution: '1080P 1920×1080', refreshRate: '180Hz', panelType: 'IPS', responseTime: '1ms', colorGamut: '99% sRGB' },
    price: '￥799+', releaseDate: '2023年5月' },
  { id: 24, name: 'Redmi 23.8Pro', performance: 30, brand: '红米', tier: '入门',
    specs: { size: '23.8英寸', resolution: '1080P 1920×1080', refreshRate: '75Hz', panelType: 'IPS', responseTime: '5ms', colorGamut: '99% sRGB' },
    price: '￥549+', releaseDate: '2022年9月' },
];

// ==================== 手机CPU数据类型 ====================
interface MobileCPUData {
  id: number;
  name: string;
  performance: number;
  brand: string;
  tier: '旗舰' | '高端' | '中端' | '入门';
  specs: {
    process: string;
    cpuCores: string;
    gpu: string;
    aiScore: string;
  };
  devices?: string;
  price?: string;
  releaseDate: string;
}

// 手机CPU天梯数据 - 30款
const mobileCPUData: MobileCPUData[] = [
  // ==================== 旗舰级 ====================
  { id: 1, name: 'Apple A18 Pro', performance: 100, brand: 'Apple', tier: '旗舰',
    specs: { process: '3nm', cpuCores: '6核 (2P+4E)', gpu: '6核GPU', aiScore: '35 TOPS' },
    devices: 'iPhone 16 Pro系列', releaseDate: '2024年9月' },
  { id: 2, name: '骁龙 8 Gen 4', performance: 97, brand: '高通', tier: '旗舰',
    specs: { process: '3nm', cpuCores: '8核', gpu: 'Adreno 830', aiScore: '75 TOPS' },
    devices: '小米15 Pro、一加13', releaseDate: '2024年10月' },
  { id: 3, name: '天玑 9400', performance: 95, brand: '联发科', tier: '旗舰',
    specs: { process: '3nm', cpuCores: '8核', gpu: 'Immortalis-G925', aiScore: '70 TOPS' },
    devices: 'vivo X200 Pro、OPPO Find X8', releaseDate: '2024年10月' },
  { id: 4, name: 'Apple A17 Pro', performance: 92, brand: 'Apple', tier: '旗舰',
    specs: { process: '3nm', cpuCores: '6核 (2P+4E)', gpu: '6核GPU', aiScore: '35 TOPS' },
    devices: 'iPhone 15 Pro系列', releaseDate: '2023年9月' },
  { id: 5, name: '骁龙 8 Gen 3', performance: 88, brand: '高通', tier: '旗舰',
    specs: { process: '4nm', cpuCores: '8核', gpu: 'Adreno 750', aiScore: '45 TOPS' },
    devices: '小米14、Galaxy S24', releaseDate: '2023年10月' },
  { id: 6, name: '天玑 9300', performance: 86, brand: '联发科', tier: '旗舰',
    specs: { process: '4nm', cpuCores: '8核 (全大核)', gpu: 'Immortalis-G720', aiScore: '40 TOPS' },
    devices: 'vivo X100、OPPO Find X7', releaseDate: '2023年11月' },
  
  // ==================== 高端级 ====================
  { id: 7, name: 'Apple A16', performance: 80, brand: 'Apple', tier: '高端',
    specs: { process: '4nm', cpuCores: '6核 (2P+4E)', gpu: '5核GPU', aiScore: '17 TOPS' },
    devices: 'iPhone 15、iPhone 14 Pro', releaseDate: '2022年9月' },
  { id: 8, name: '骁龙 8 Gen 2', performance: 75, brand: '高通', tier: '高端',
    specs: { process: '4nm', cpuCores: '8核', gpu: 'Adreno 740', aiScore: '25 TOPS' },
    devices: '小米13、Galaxy S23', releaseDate: '2022年11月' },
  { id: 9, name: '天玑 9200', performance: 72, brand: '联发科', tier: '高端',
    specs: { process: '4nm', cpuCores: '8核', gpu: 'Immortalis-G715', aiScore: '20 TOPS' },
    devices: 'vivo X90、OPPO Find X6', releaseDate: '2022年11月' },
  { id: 10, name: '骁龙 7+ Gen 3', performance: 68, brand: '高通', tier: '高端',
    specs: { process: '4nm', cpuCores: '8核', gpu: 'Adreno 732', aiScore: '18 TOPS' },
    devices: '一加Ace 3V、真我GT Neo6', releaseDate: '2024年3月' },
  
  // ==================== 中端级 ====================
  { id: 11, name: '骁龙 7 Gen 3', performance: 58, brand: '高通', tier: '中端',
    specs: { process: '4nm', cpuCores: '8核', gpu: 'Adreno 720', aiScore: '12 TOPS' },
    devices: '荣耀100、vivo S18', releaseDate: '2023年11月' },
  { id: 12, name: '天玑 8300', performance: 55, brand: '联发科', tier: '中端',
    specs: { process: '4nm', cpuCores: '8核', gpu: 'Mali-G615', aiScore: '10 TOPS' },
    devices: 'Redmi K70E', releaseDate: '2023年12月' },
  { id: 13, name: '骁龙 6 Gen 1', performance: 48, brand: '高通', tier: '中端',
    specs: { process: '4nm', cpuCores: '8核', gpu: 'Adreno 710', aiScore: '8 TOPS' },
    devices: '荣耀X50、OPPO A98', releaseDate: '2023年5月' },
  { id: 14, name: '天玑 7200', performance: 45, brand: '联发科', tier: '中端',
    specs: { process: '4nm', cpuCores: '8核', gpu: 'Mali-G610', aiScore: '6 TOPS' },
    devices: 'vivo V27、OPPO Reno10', releaseDate: '2023年2月' },
  
  // ==================== 入门级 ====================
  { id: 15, name: '骁龙 4 Gen 2', performance: 35, brand: '高通', tier: '入门',
    specs: { process: '4nm', cpuCores: '8核', gpu: 'Adreno 613', aiScore: '4 TOPS' },
    devices: 'Redmi 12、realme C67', releaseDate: '2023年7月' },
  { id: 16, name: '天玑 6080', performance: 32, brand: '联发科', tier: '入门',
    specs: { process: '6nm', cpuCores: '8核', gpu: 'Mali-G57', aiScore: '3 TOPS' },
    devices: 'OPPO A58、vivo Y35', releaseDate: '2022年10月' },
  { id: 17, name: '骁龙 680', performance: 28, brand: '高通', tier: '入门',
    specs: { process: '6nm', cpuCores: '8核', gpu: 'Adreno 610', aiScore: '2 TOPS' },
    devices: 'Redmi Note 11、荣耀X40', releaseDate: '2021年10月' },
  { id: 18, name: '天玑 700', performance: 25, brand: '联发科', tier: '入门',
    specs: { process: '7nm', cpuCores: '8核', gpu: 'Mali-G57', aiScore: '2 TOPS' },
    devices: 'OPPO A55、vivo Y53s', releaseDate: '2021年5月' },
];

// ==================== 耳机数据类型 ====================
interface HeadphoneData {
  id: number;
  name: string;
  performance: number;
  brand: string;
  tier: '旗舰' | '高端' | '中端' | '主流' | '入门';
  specs: {
    type: string;
    driver: string;
    impedance: string;
    sensitivity: string;
    connectivity: string;
  };
  price?: string;
  releaseDate: string;
}

// 耳机天梯数据 - 30款
const headphoneData: HeadphoneData[] = [
  // ==================== 旗舰级 ====================
  { id: 1, name: 'Sennheiser HD 800S', performance: 100, brand: '森海塞尔', tier: '旗舰',
    specs: { type: '开放式头戴', driver: '56mm动圈', impedance: '300Ω', sensitivity: '102dB', connectivity: '有线' },
    price: '￥18999+', releaseDate: '2015年12月' },
  { id: 2, name: 'HIFIMAN HE1000se', performance: 98, brand: 'HIFIMAN', tier: '旗舰',
    specs: { type: '开放式头戴', driver: '平面磁单元', impedance: '35Ω', sensitivity: '96dB', connectivity: '有线' },
    price: '￥19999+', releaseDate: '2020年10月' },
  { id: 3, name: 'Audeze LCD-5', performance: 96, brand: 'Audeze', tier: '旗舰',
    specs: { type: '开放式头戴', driver: '平面磁单元', impedance: '14Ω', sensitivity: '110dB', connectivity: '有线' },
    price: '￥29999+', releaseDate: '2021年9月' },
  { id: 4, name: 'Focal Utopia', performance: 94, brand: 'Focal', tier: '旗舰',
    specs: { type: '开放式头戴', driver: '铍振膜动圈', impedance: '80Ω', sensitivity: '104dB', connectivity: '有线' },
    price: '￥29999+', releaseDate: '2016年6月' },
  { id: 5, name: 'Sony MDR-Z1R', performance: 92, brand: '索尼', tier: '旗舰',
    specs: { type: '封闭式头戴', driver: '70mm镁振膜', impedance: '64Ω', sensitivity: '100dB', connectivity: '有线' },
    price: '￥17999+', releaseDate: '2016年9月' },
  
  // ==================== 高端级 ====================
  { id: 6, name: 'Sennheiser HD 660S2', performance: 85, brand: '森海塞尔', tier: '高端',
    specs: { type: '开放式头戴', driver: '42mm动圈', impedance: '150Ω', sensitivity: '104dB', connectivity: '有线' },
    price: '￥3999+', releaseDate: '2023年2月' },
  { id: 7, name: 'Beyerdynamic DT 1990 Pro', performance: 82, brand: '拜雅', tier: '高端',
    specs: { type: '开放式头戴', driver: 'Tesla动圈', impedance: '250Ω', sensitivity: '102dB', connectivity: '有线' },
    price: '￥3999+', releaseDate: '2017年1月' },
  { id: 8, name: 'HIFIMAN Sundara', performance: 78, brand: 'HIFIMAN', tier: '高端',
    specs: { type: '开放式头戴', driver: '平面磁单元', impedance: '32Ω', sensitivity: '94dB', connectivity: '有线' },
    price: '￥2999+', releaseDate: '2018年5月' },
  { id: 9, name: 'Apple AirPods Max', performance: 75, brand: 'Apple', tier: '高端',
    specs: { type: '封闭式头戴', driver: '40mm动圈', impedance: '-', sensitivity: '-', connectivity: '蓝牙5.0' },
    price: '￥4399+', releaseDate: '2020年12月' },
  { id: 10, name: 'Sony WH-1000XM5', performance: 72, brand: '索尼', tier: '高端',
    specs: { type: '封闭式头戴', driver: '30mm动圈', impedance: '-', sensitivity: '-', connectivity: '蓝牙5.2' },
    price: '￥2999+', releaseDate: '2022年5月' },
  
  // ==================== 中端级 ====================
  { id: 11, name: 'Sennheiser HD 600', performance: 68, brand: '森海塞尔', tier: '中端',
    specs: { type: '开放式头戴', driver: '42mm动圈', impedance: '300Ω', sensitivity: '97dB', connectivity: '有线' },
    price: '￥1999+', releaseDate: '1997年' },
  { id: 12, name: 'Beyerdynamic DT 990 Pro', performance: 65, brand: '拜雅', tier: '中端',
    specs: { type: '开放式头戴', driver: 'Tesla动圈', impedance: '250Ω', sensitivity: '99dB', connectivity: '有线' },
    price: '￥1399+', releaseDate: '2010年' },
  { id: 13, name: 'Audio-Technica ATH-M50x', performance: 62, brand: '铁三角', tier: '中端',
    specs: { type: '封闭式头戴', driver: '45mm动圈', impedance: '38Ω', sensitivity: '99dB', connectivity: '有线' },
    price: '￥1299+', releaseDate: '2011年' },
  { id: 14, name: 'Sony WH-CH720N', performance: 58, brand: '索尼', tier: '中端',
    specs: { type: '封闭式头戴', driver: '30mm动圈', impedance: '-', sensitivity: '-', connectivity: '蓝牙5.2' },
    price: '￥799+', releaseDate: '2023年1月' },
  { id: 15, name: '1More Sonoflow', performance: 55, brand: '万魔', tier: '中端',
    specs: { type: '封闭式头戴', driver: '40mm动圈', impedance: '-', sensitivity: '-', connectivity: '蓝牙5.3' },
    price: '￥499+', releaseDate: '2023年6月' },
  
  // ==================== 主流级 ====================
  { id: 16, name: 'Sennheiser HD 280 Pro', performance: 48, brand: '森海塞尔', tier: '主流',
    specs: { type: '封闭式头戴', driver: '38mm动圈', impedance: '64Ω', sensitivity: '102dB', connectivity: '有线' },
    price: '￥799+', releaseDate: '2003年' },
  { id: 17, name: 'Audio-Technica ATH-M30x', performance: 45, brand: '铁三角', tier: '主流',
    specs: { type: '封闭式头戴', driver: '40mm动圈', impedance: '47Ω', sensitivity: '96dB', connectivity: '有线' },
    price: '￥599+', releaseDate: '2014年' },
  { id: 18, name: 'Edifier W820NB', performance: 42, brand: '漫步者', tier: '主流',
    specs: { type: '封闭式头戴', driver: '40mm动圈', impedance: '-', sensitivity: '-', connectivity: '蓝牙5.0' },
    price: '￥349+', releaseDate: '2022年3月' },
  { id: 19, name: 'QCY H3', performance: 40, brand: 'QCY', tier: '主流',
    specs: { type: '封闭式头戴', driver: '40mm动圈', impedance: '-', sensitivity: '-', connectivity: '蓝牙5.3' },
    price: '￥199+', releaseDate: '2023年5月' },
  
  // ==================== 入门级 ====================
  { id: 20, name: 'Edifier HECATE G2', performance: 35, brand: '漫步者', tier: '入门',
    specs: { type: '封闭式头戴', driver: '50mm动圈', impedance: '32Ω', sensitivity: '100dB', connectivity: '有线' },
    price: '￥149+', releaseDate: '2021年' },
  { id: 21, name: 'HyperX Cloud II', performance: 32, brand: '金士顿', tier: '入门',
    specs: { type: '封闭式头戴', driver: '53mm动圈', impedance: '60Ω', sensitivity: '98dB', connectivity: '有线USB' },
    price: '￥399+', releaseDate: '2015年' },
];

// ==================== 路由器数据类型 ====================
interface RouterData {
  id: number;
  name: string;
  performance: number;
  brand: string;
  tier: '旗舰' | '高端' | '中端' | '主流' | '入门';
  specs: {
    wifiStandard: string;
    maxSpeed: string;
    bands: string;
    ports: string;
    cpu: string;
    antennas: string;
  };
  price?: string;
  releaseDate: string;
}

// 路由器天梯数据 - 25款
const routerData: RouterData[] = [
  // ==================== 旗舰级 ====================
  { id: 1, name: 'ROG Rapture GT-BE98 Pro', performance: 100, brand: '华硕', tier: '旗舰',
    specs: { wifiStandard: 'WiFi 7', maxSpeed: '46Gbps', bands: '四频', ports: '10G×4 + 2.5G×2', cpu: '四核2.6GHz', antennas: '8根外置' },
    price: '￥7999+', releaseDate: '2024年1月' },
  { id: 2, name: 'Netgear Orbi 970 Series', performance: 96, brand: '网件', tier: '旗舰',
    specs: { wifiStandard: 'WiFi 7', maxSpeed: '27Gbps', bands: '三频', ports: '10G×2 + 2.5G×2', cpu: '四核2.2GHz', antennas: '内置' },
    price: '￥9999+', releaseDate: '2024年2月' },
  { id: 3, name: 'TP-Link Archer GE800', performance: 93, brand: 'TP-Link', tier: '旗舰',
    specs: { wifiStandard: 'WiFi 7', maxSpeed: '32Gbps', bands: '三频', ports: '10G×2 + 2.5G×4', cpu: '四核2.0GHz', antennas: '8根外置' },
    price: '￥4999+', releaseDate: '2024年1月' },
  { id: 4, name: 'ASUS GT-AX11000 Pro', performance: 88, brand: '华硕', tier: '旗舰',
    specs: { wifiStandard: 'WiFi 6E', maxSpeed: '11Gbps', bands: '三频', ports: '10G×2 + 2.5G×1', cpu: '四核1.8GHz', antennas: '8根外置' },
    price: '￥3999+', releaseDate: '2022年3月' },
  { id: 5, name: 'Xiaomi Router BE7000', performance: 85, brand: '小米', tier: '旗舰',
    specs: { wifiStandard: 'WiFi 7', maxSpeed: '19Gbps', bands: '三频', ports: '10G×2 + 2.5G×4', cpu: '四核1.5GHz', antennas: '内置' },
    price: '￥1999+', releaseDate: '2024年1月' },
  
  // ==================== 高端级 ====================
  { id: 6, name: 'ASUS RT-AX88U Pro', performance: 78, brand: '华硕', tier: '高端',
    specs: { wifiStandard: 'WiFi 6', maxSpeed: '6Gbps', bands: '双频', ports: '2.5G×1 + 1G×8', cpu: '四核1.8GHz', antennas: '4根外置' },
    price: '￥2299+', releaseDate: '2022年3月' },
  { id: 7, name: 'Netgear RAXE500', performance: 75, brand: '网件', tier: '高端',
    specs: { wifiStandard: 'WiFi 6E', maxSpeed: '11Gbps', bands: '三频', ports: '2.5G×1 + 1G×4', cpu: '四核1.8GHz', antennas: '内置' },
    price: '￥3499+', releaseDate: '2021年3月' },
  { id: 8, name: 'TP-Link Archer AXE300', performance: 72, brand: 'TP-Link', tier: '高端',
    specs: { wifiStandard: 'WiFi 6E', maxSpeed: '16Gbps', bands: '三频', ports: '10G×2 + 2.5G×2', cpu: '四核2.0GHz', antennas: '8根外置' },
    price: '￥2999+', releaseDate: '2022年1月' },
  { id: 9, name: 'H3C NX15000', performance: 68, brand: '新华三', tier: '高端',
    specs: { wifiStandard: 'WiFi 6', maxSpeed: '15Gbps', bands: '三频', ports: '2.5G×2', cpu: '四核1.4GHz', antennas: '内置' },
    price: '￥1799+', releaseDate: '2023年3月' },
  { id: 10, name: 'Xiaomi Router AX9000', performance: 65, brand: '小米', tier: '高端',
    specs: { wifiStandard: 'WiFi 6', maxSpeed: '9Gbps', bands: '三频', ports: '2.5G×1 + 1G×4', cpu: '四核1.4GHz', antennas: '内置' },
    price: '￥999+', releaseDate: '2021年4月' },
  
  // ==================== 中端级 ====================
  { id: 11, name: 'ASUS RT-AX68U', performance: 58, brand: '华硕', tier: '中端',
    specs: { wifiStandard: 'WiFi 6', maxSpeed: '2.7Gbps', bands: '双频', ports: '1G×4', cpu: '双核1.8GHz', antennas: '3根外置' },
    price: '￥899+', releaseDate: '2020年6月' },
  { id: 12, name: 'TP-Link Archer AX72', performance: 55, brand: 'TP-Link', tier: '中端',
    specs: { wifiStandard: 'WiFi 6', maxSpeed: '5.4Gbps', bands: '双频', ports: '1G×4', cpu: '双核1.5GHz', antennas: '6根外置' },
    price: '￥699+', releaseDate: '2021年3月' },
  { id: 13, name: 'Xiaomi Router AX6000', performance: 52, brand: '小米', tier: '中端',
    specs: { wifiStandard: 'WiFi 6', maxSpeed: '6Gbps', bands: '双频', ports: '2.5G×1 + 1G×3', cpu: '四核1.0GHz', antennas: '内置' },
    price: '￥599+', releaseDate: '2020年12月' },
  { id: 14, name: 'H3C NX54', performance: 48, brand: '新华三', tier: '中端',
    specs: { wifiStandard: 'WiFi 6', maxSpeed: '5.4Gbps', bands: '双频', ports: '2.5G×1 + 1G×3', cpu: '双核1.0GHz', antennas: '内置' },
    price: '￥349+', releaseDate: '2022年6月' },
  { id: 15, name: 'Redmi Router AX6S', performance: 45, brand: '红米', tier: '中端',
    specs: { wifiStandard: 'WiFi 6', maxSpeed: '3.2Gbps', bands: '双频', ports: '1G×4', cpu: '双核880MHz', antennas: '6根外置' },
    price: '￥199+', releaseDate: '2022年3月' },
  
  // ==================== 主流级 ====================
  { id: 16, name: 'Xiaomi Router AX3000T', performance: 40, brand: '小米', tier: '主流',
    specs: { wifiStandard: 'WiFi 6', maxSpeed: '3Gbps', bands: '双频', ports: '1G×4', cpu: '双核1.0GHz', antennas: '内置' },
    price: '￥199+', releaseDate: '2023年6月' },
  { id: 17, name: 'TP-Link Archer AX23', performance: 38, brand: 'TP-Link', tier: '主流',
    specs: { wifiStandard: 'WiFi 6', maxSpeed: '1.8Gbps', bands: '双频', ports: '1G×4', cpu: '双核1.5GHz', antennas: '4根外置' },
    price: '￥249+', releaseDate: '2021年' },
  { id: 18, name: 'H3C NX30', performance: 36, brand: '新华三', tier: '主流',
    specs: { wifiStandard: 'WiFi 6', maxSpeed: '3Gbps', bands: '双频', ports: '1G×4', cpu: '双核1.0GHz', antennas: '内置' },
    price: '￥199+', releaseDate: '2022年' },
  
  // ==================== 入门级 ====================
  { id: 19, name: 'Redmi Router AX3000', performance: 32, brand: '红米', tier: '入门',
    specs: { wifiStandard: 'WiFi 6', maxSpeed: '2.4Gbps', bands: '双频', ports: '1G×4', cpu: '单核880MHz', antennas: '4根外置' },
    price: '￥129+', releaseDate: '2021年' },
  { id: 20, name: 'Xiaomi Router 4A 千兆版', performance: 28, brand: '小米', tier: '入门',
    specs: { wifiStandard: 'WiFi 5', maxSpeed: '1.2Gbps', bands: '双频', ports: '1G×3', cpu: '单核880MHz', antennas: '4根外置' },
    price: '￥99+', releaseDate: '2019年' },
];

// 品牌颜色映射
const brandColorsMap: Record<string, { bg: string; text: string; border: string }> = {
  // 显卡品牌
  NVIDIA: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/50' },
  // 处理器品牌
  Intel: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' },
  AMD: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' },
  Apple: { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/50' },
  // 手机CPU品牌
  高通: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/50' },
  联发科: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/50' },
  // 显示器/耳机/路由器品牌
  华硕: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' },
  三星: { bg: 'bg-blue-400/20', text: 'text-blue-400', border: 'border-blue-400/50' },
  LG: { bg: 'bg-red-400/20', text: 'text-red-400', border: 'border-red-400/50' },
  戴尔: { bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-600/50' },
  外星人: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' },
  明基: { bg: 'bg-purple-400/20', text: 'text-purple-400', border: 'border-purple-400/50' },
  技嘉: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/50' },
  AOC: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/50' },
  微星: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' },
  小米: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/50' },
  红米: { bg: 'bg-orange-400/20', text: 'text-orange-400', border: 'border-orange-400/50' },
  惠科: { bg: 'bg-green-400/20', text: 'text-green-400', border: 'border-green-400/50' },
  SANC: { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-500/50' },
  联想: { bg: 'bg-red-400/20', text: 'text-red-400', border: 'border-red-400/50' },
  // 耳机品牌
  森海塞尔: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/50' },
  HIFIMAN: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/50' },
  Audeze: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/50' },
  Focal: { bg: 'bg-blue-400/20', text: 'text-blue-400', border: 'border-blue-400/50' },
  索尼: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/50' },
  拜雅: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/50' },
  铁三角: { bg: 'bg-red-400/20', text: 'text-red-400', border: 'border-red-400/50' },
  万魔: { bg: 'bg-orange-400/20', text: 'text-orange-400', border: 'border-orange-400/50' },
  漫步者: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' },
  QCY: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/50' },
  金士顿: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' },
  // 路由器品牌
  网件: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' },
  'TP-Link': { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/50' },
  新华三: { bg: 'bg-blue-400/20', text: 'text-blue-400', border: 'border-blue-400/50' },
};

// 获取品牌颜色
const getBrandColors = (brand: string) => {
  return brandColorsMap[brand] || { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/50' };
};

// 定位颜色映射
const tierColors: Record<string, string> = {
  '旗舰': 'from-yellow-500 to-orange-500',
  '高端': 'from-purple-500 to-pink-500',
  '中端': 'from-blue-500 to-cyan-500',
  '主流': 'from-green-500 to-emerald-500',
  '入门': 'from-gray-400 to-gray-500',
  '低端': 'from-gray-500 to-gray-600',
};

interface GPUTierChartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GPUTierChart({ isOpen, onClose }: GPUTierChartProps) {
  const [type, setType] = useState<HardwareType>('gpu');
  const [selectedGPU, setSelectedGPU] = useState<GPUData | null>(null);
  const [selectedCPU, setSelectedCPU] = useState<CPUData | null>(null);
  const [selectedMonitor, setSelectedMonitor] = useState<MonitorData | null>(null);
  const [selectedMobileCPU, setSelectedMobileCPU] = useState<MobileCPUData | null>(null);
  const [selectedHeadphone, setSelectedHeadphone] = useState<HeadphoneData | null>(null);
  const [selectedRouter, setSelectedRouter] = useState<RouterData | null>(null);
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [filterTier, setFilterTier] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 获取当前类型的数据
  const getCurrentData = () => {
    switch (type) {
      case 'gpu': return gpuData;
      case 'cpu': return cpuData;
      case 'monitor': return monitorData;
      case 'mobilecpu': return mobileCPUData;
      case 'headphone': return headphoneData;
      case 'router': return routerData;
      default: return gpuData;
    }
  };

  // 获取所有品牌
  const getAllBrands = () => {
    const data = getCurrentData();
    const brands = [...new Set(data.map(item => item.brand))];
    return ['all', ...brands];
  };

  // 过滤并按性能排序
  const getFilteredData = () => {
    const data = getCurrentData();
    return data
      .filter((item: any) => {
        const brandMatch = filterBrand === 'all' || item.brand === filterBrand;
        const tierMatch = filterTier === 'all' || item.tier === filterTier;
        return brandMatch && tierMatch;
      })
      .sort((a: any, b: any) => b.performance - a.performance);
  };

  // 清除选中状态
  const clearSelection = () => {
    setSelectedGPU(null);
    setSelectedCPU(null);
    setSelectedMonitor(null);
    setSelectedMobileCPU(null);
    setSelectedHeadphone(null);
    setSelectedRouter(null);
  };

  // 关闭时重置
  useEffect(() => {
    if (!isOpen) {
      clearSelection();
      setFilterBrand('all');
      setFilterTier('all');
      setType('gpu');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 主容器 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl border border-white/10 w-full max-w-5xl h-[85vh] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* 标题栏 */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-black/30">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-chart-line text-2xl text-blue-400"></i>
                <h3 className="text-white text-xl font-bold">天梯图 2026</h3>
                <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded-full">
                  {hardwareTypeInfo[type].benchmark} = 100% | 共{getCurrentData().length}款
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors p-2"
                aria-label="关闭"
              >
                <i className="fa-solid fa-times text-lg"></i>
              </button>
            </div>
            
            {/* 类型和品牌筛选栏 */}
            <div className="flex items-center justify-between px-6 py-2 border-b border-white/10 bg-black/20">
              {/* 类型切换 */}
              <div className="flex gap-1 bg-black/30 rounded-lg p-1 overflow-x-auto">
                {(Object.keys(hardwareTypeInfo) as HardwareType[]).map(t => (
                  <button
                    key={t}
                    onClick={() => { setType(t); setFilterBrand('all'); clearSelection(); scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      type === t ? 'bg-blue-500 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <i className={hardwareTypeInfo[t].icon}></i>
                    {hardwareTypeInfo[t].name}
                  </button>
                ))}
              </div>
              
              {/* 品牌筛选 */}
              <div className="flex gap-1 bg-black/30 rounded-lg p-1 overflow-x-auto max-w-[240px]">
                {getAllBrands().slice(0, 6).map(brand => (
                  <button
                    key={brand}
                    onClick={() => setFilterBrand(brand)}
                    className={`px-2 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                      filterBrand === brand
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {brand === 'all' ? '全部' : brand}
                  </button>
                ))}
              </div>
            </div>

            {/* 天梯图主体 */}
            <div className="flex flex-1 min-h-0">
              {/* 左侧天梯图 */}
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-1 tier-chart-scrollbar"
              >
                {/* 通用列表渲染 */}
                {getFilteredData().map((item: any, index: number) => (
                  <motion.div
                    key={`${type}-${index}-${item.name}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(index * 0.01, 0.5) }}
                    onClick={() => {
                      if (type === 'gpu') setSelectedGPU(item);
                      else if (type === 'cpu') setSelectedCPU(item);
                      else if (type === 'monitor') setSelectedMonitor(item);
                      else if (type === 'mobilecpu') setSelectedMobileCPU(item);
                      else if (type === 'headphone') setSelectedHeadphone(item);
                      else if (type === 'router') setSelectedRouter(item);
                    }}
                    className={`relative cursor-pointer group transition-all duration-300 ${
                      (type === 'gpu' && selectedGPU?.id === item.id) ||
                      (type === 'cpu' && selectedCPU?.id === item.id) ||
                      (type === 'monitor' && selectedMonitor?.id === item.id) ||
                      (type === 'mobilecpu' && selectedMobileCPU?.id === item.id) ||
                      (type === 'headphone' && selectedHeadphone?.id === item.id) ||
                      (type === 'router' && selectedRouter?.id === item.id)
                        ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                    }`}
                  >
                    {/* 进度条背景 */}
                    <div className="relative h-11 bg-white/5 rounded-lg overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors">
                      {/* 性能条 */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.performance}%` }}
                        transition={{ duration: 0.6, delay: Math.min(index * 0.01, 0.5), ease: 'easeOut' }}
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${tierColors[item.tier]} opacity-40`}
                      />
                      
                      {/* 内容 */}
                      <div className="absolute inset-0 flex items-center px-3">
                        {/* 排名 */}
                        <div className="w-8 text-center shrink-0">
                          <span className={`text-sm font-bold ${
                            index < 3 ? 'text-yellow-400' : 'text-white/60'
                          }`}>
                            {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}
                          </span>
                        </div>
                        
                        {/* 品牌标识 */}
                        <div className={`px-1.5 py-0.5 rounded text-xs font-bold shrink-0 ${getBrandColors(item.brand).bg} ${getBrandColors(item.brand).text} ${getBrandColors(item.brand).border} border`}>
                          {item.brand}
                        </div>
                        
                        {/* 名称 */}
                        <div className="flex-1 ml-2 min-w-0">
                          <span className="text-white font-semibold text-sm truncate block">{item.name}</span>
                        </div>
                        
                        {/* 性能百分比 */}
                        <div className="text-right shrink-0">
                          <span className="text-white font-bold text-sm">{item.performance}%</span>
                        </div>
                      </div>
                      
                      {/* 悬停提示 */}
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end pr-3">
                        <span className="text-white/60 text-xs">点击查看详情 →</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 右侧详情面板 */}
              <AnimatePresence mode="wait">
                <DetailPanel 
                  type={type} 
                  selectedGPU={selectedGPU}
                  selectedCPU={selectedCPU}
                  selectedMonitor={selectedMonitor}
                  selectedMobileCPU={selectedMobileCPU}
                  selectedHeadphone={selectedHeadphone}
                  selectedRouter={selectedRouter}
                  onClose={clearSelection}
                  getBrandColors={getBrandColors}
                />
              </AnimatePresence>
            </div>

            {/* 底部说明 */}
            <div className="px-6 py-2 bg-black/30 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>数据更新时间：2026年3月 | 仅供参考</span>
                <div className="flex items-center gap-3">
                  {Object.entries(tierColors).slice(0, 4).map(([tier, color]) => (
                    <div key={tier} className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-sm bg-gradient-to-r ${color}`}></div>
                      <span>{tier}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 详情面板组件
function DetailPanel({ type, selectedGPU, selectedCPU, selectedMonitor, selectedMobileCPU, selectedHeadphone, selectedRouter, onClose, getBrandColors }: { 
  type: HardwareType; 
  selectedGPU: GPUData | null;
  selectedCPU: CPUData | null;
  selectedMonitor: MonitorData | null;
  selectedMobileCPU: MobileCPUData | null;
  selectedHeadphone: HeadphoneData | null;
  selectedRouter: RouterData | null;
  onClose: () => void;
  getBrandColors: (brand: string) => { bg: string; text: string; border: string };
}) {
  const selectedItem = type === 'gpu' ? selectedGPU 
    : type === 'cpu' ? selectedCPU
    : type === 'monitor' ? selectedMonitor
    : type === 'mobilecpu' ? selectedMobileCPU
    : type === 'headphone' ? selectedHeadphone
    : selectedRouter;

  const typeName = hardwareTypeInfo[type].name;
  const benchmark = hardwareTypeInfo[type].benchmark;

  if (!selectedItem) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-80 border-l border-white/10 bg-black/20 p-5 flex items-center justify-center"
      >
        <div className="text-center text-white/40">
          <i className="fa-solid fa-hand-pointer text-4xl mb-4"></i>
          <p className="text-sm">点击左侧{typeName}<br/>查看详细信息</p>
        </div>
      </motion.div>
    );
  }

  // 获取规格列表
  const getSpecs = () => {
    switch (type) {
      case 'gpu':
        return [
          { label: '显存', value: selectedGPU.specs.vram },
          { label: '显存类型', value: selectedGPU.specs.vramType },
          { label: '流处理器', value: selectedGPU.specs.cores },
          { label: '工艺', value: selectedGPU.specs.process },
          { label: '带宽', value: selectedGPU.specs.bandwidth },
          { label: '功耗', value: selectedGPU.specs.tdp },
        ];
      case 'cpu':
        return [
          { label: '核心数', value: `${selectedCPU.cores}核` },
          { label: '线程数', value: `${selectedCPU.threads}线程` },
          { label: '基础频率', value: selectedCPU.baseClock },
          { label: '加速频率', value: selectedCPU.boostClock },
          { label: '缓存', value: selectedCPU.cache },
          { label: '工艺', value: selectedCPU.process },
          { label: '功耗', value: selectedCPU.tdp },
        ];
      case 'monitor':
        return [
          { label: '尺寸', value: selectedMonitor.specs.size },
          { label: '分辨率', value: selectedMonitor.specs.resolution },
          { label: '刷新率', value: selectedMonitor.specs.refreshRate },
          { label: '面板类型', value: selectedMonitor.specs.panelType },
          { label: '响应时间', value: selectedMonitor.specs.responseTime },
          { label: '色域', value: selectedMonitor.specs.colorGamut },
        ];
      case 'mobilecpu':
        return [
          { label: '工艺', value: selectedMobileCPU.specs.process },
          { label: 'CPU核心', value: selectedMobileCPU.specs.cpuCores },
          { label: 'GPU', value: selectedMobileCPU.specs.gpu },
          { label: 'AI算力', value: selectedMobileCPU.specs.aiScore },
        ];
      case 'headphone':
        return [
          { label: '类型', value: selectedHeadphone.specs.type },
          { label: '单元', value: selectedHeadphone.specs.driver },
          { label: '阻抗', value: selectedHeadphone.specs.impedance },
          { label: '灵敏度', value: selectedHeadphone.specs.sensitivity },
          { label: '连接方式', value: selectedHeadphone.specs.connectivity },
        ];
      case 'router':
        return [
          { label: 'WiFi标准', value: selectedRouter.specs.wifiStandard },
          { label: '最高速率', value: selectedRouter.specs.maxSpeed },
          { label: '频段', value: selectedRouter.specs.bands },
          { label: '网口', value: selectedRouter.specs.ports },
          { label: '处理器', value: selectedRouter.specs.cpu },
          { label: '天线', value: selectedRouter.specs.antennas },
        ];
      default:
        return [];
    }
  };

  return (
    <motion.div
      key={selectedItem.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="w-80 border-l border-white/10 bg-black/20 p-5 overflow-y-auto tier-chart-scrollbar"
    >
      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white/40 hover:text-white transition-colors"
      >
        <i className="fa-solid fa-times"></i>
      </button>

      {/* 名称和品牌 */}
      <div className="text-center mb-4">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${getBrandColors(selectedItem.brand).bg} ${getBrandColors(selectedItem.brand).text} ${getBrandColors(selectedItem.brand).border} border`}>
          {selectedItem.brand}
        </div>
        <h4 className="text-white text-xl font-bold">{selectedItem.name}</h4>
        <p className="text-white/50 text-sm mt-1">{selectedItem.tier}级{typeName}</p>
      </div>

      {/* 性能得分 */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-3 mb-4 border border-white/10">
        <div className="text-center">
          <span className="text-white/60 text-xs">性能得分</span>
          <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {selectedItem.performance}%
          </div>
          <span className="text-white/40 text-xs">相对 {benchmark}</span>
        </div>
      </div>

      {/* 核心参数 */}
      <div className="mb-4">
        <h5 className="text-white/80 text-xs font-semibold mb-2 flex items-center gap-2">
          <i className="fa-solid fa-microchip"></i>核心参数
        </h5>
        <div className="grid grid-cols-2 gap-1.5">
          {getSpecs().map((spec: any, i: number) => (
            <div key={i} className={`bg-white/5 rounded-lg p-2 ${getSpecs().length % 2 !== 0 && i === getSpecs().length - 1 ? 'col-span-2' : ''}`}>
              <span className="text-white/50 text-xs">{spec.label}</span>
              <p className="text-white font-semibold text-sm">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 手机CPU显示搭载设备 */}
      {type === 'mobilecpu' && selectedItem.devices && (
        <div className="mb-4">
          <h5 className="text-white/80 text-xs font-semibold mb-2 flex items-center gap-2">
            <i className="fa-solid fa-mobile-screen"></i>搭载设备
          </h5>
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-white/80 text-sm">{selectedItem.devices}</p>
          </div>
        </div>
      )}

      {/* 显卡游戏性能 */}
      {type === 'gpu' && selectedGPU.gaming && (
        <div className="mb-4">
          <h5 className="text-white/80 text-xs font-semibold mb-2 flex items-center gap-2">
            <i className="fa-solid fa-gamepad"></i>游戏性能
          </h5>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between bg-white/5 rounded-lg p-2">
              <span className="text-white/60 text-xs">1080P</span>
              <span className="text-green-400 font-semibold text-sm">{selectedGPU.gaming.p1080}</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 rounded-lg p-2">
              <span className="text-white/60 text-xs">2K</span>
              <span className="text-blue-400 font-semibold text-sm">{selectedGPU.gaming.p2k}</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 rounded-lg p-2">
              <span className="text-white/60 text-xs">4K</span>
              <span className="text-purple-400 font-semibold text-sm">{selectedGPU.gaming.p4k}</span>
            </div>
          </div>
        </div>
      )}

      {/* 价格和发布日期 */}
      <div className="border-t border-white/10 pt-3">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-white/60 text-xs">参考价格</span>
          <span className="text-orange-400 font-bold text-sm">{selectedItem.price || '暂无'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-xs">发布时间</span>
          <span className="text-white/80 text-sm">{selectedItem.releaseDate}</span>
        </div>
      </div>
    </motion.div>
  );
}

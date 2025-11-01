// 校验UA是否含浏览器核心特征（可扩展特征库）
const isLegalUA = () => {
  const ua = navigator.userAgent.toLowerCase();
  const validFeatures = ["chrome", "safari", "firefox", "edge", "opera"];
  return validFeatures.some(f => ua.includes(f));
};
// 非法则跳转/拦截
if (!isLegalUA()) window.location.href = "about:blank";
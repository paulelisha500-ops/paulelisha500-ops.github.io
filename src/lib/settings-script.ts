// Shared between the server-rendered <head> and the client settings store.

export const SETTINGS_KEY = "ep:settings";

/** Applies saved theme and ambient preference before first paint. Dark is the default. */
export const settingsScript = `(function(){try{var s=JSON.parse(localStorage.getItem("${SETTINGS_KEY}")||"{}");var t=s.theme||"system";if(t==="system")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";var r=document.documentElement;r.dataset.theme=t;r.dataset.ambient=s.ambient===false?"off":"on";var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"#000000":"#fbfbfd");}catch(e){}})();`;

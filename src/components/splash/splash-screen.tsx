import { AllSplashLogos, LOGO_COUNT } from "./logos";
import { profile } from "@/data/profile";

// The loading screen is plain server-rendered HTML plus one inline script, so
// it paints on the very first frame, before React or any bundle has loaded.
// The script picks a random logo (never the same one twice in a row) and fades
// the screen out once the page has finished loading, after a short minimum so
// the mark has time to draw.

const MIN_MS = 750;

const script = `(function(){
var s=document.getElementById("splash");if(!s)return;
var n=${LOGO_COUNT},k="ep:last-logo",last=-1;
try{last=+(localStorage.getItem(k)||-1)}catch(e){}
var i=Math.floor(Math.random()*n);
if(i===last)i=(i+1+Math.floor(Math.random()*(n-1)))%n;
s.setAttribute("data-logo",String(i));
try{localStorage.setItem(k,String(i))}catch(e){}
function hide(){s.setAttribute("data-state","done");document.documentElement.setAttribute("data-ready","")}
function done(){setTimeout(hide,Math.max(0,${MIN_MS}-performance.now()))}
if(document.readyState==="complete")done();else addEventListener("load",done,{once:true});
setTimeout(hide,4000);
})();`;

export function SplashScreen() {
  return (
    <>
      <div id="splash" data-logo="0" suppressHydrationWarning role="status" aria-label="Loading">
        <div className="flex flex-col items-center gap-6 text-fg">
          <AllSplashLogos />
          <div className="flex flex-col items-center gap-3">
            <span className="text-[13px] font-medium tracking-[0.22em] text-muted uppercase">{profile.name}</span>
            <span className="splash-bar block h-[3px] w-28 overflow-hidden rounded-full bg-line">
              <span />
            </span>
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}

import { BrandIcon } from "@/components/icons";
import { live } from "@/lib/live";
import { cn } from "@/lib/utils";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function level(count: number, max: number) {
  if (count === 0) return 0;
  const r = count / max;
  return r > 0.75 ? 4 : r > 0.5 ? 3 : r > 0.25 ? 2 : 1;
}

const heat = ["bg-[var(--heat-0)]", "bg-[var(--heat-1)]", "bg-[var(--heat-2)]", "bg-[var(--heat-3)]", "bg-[var(--heat-4)]"];

// GitHub-style contribution calendar, rendered at build time from live.json.
// The scroller is RTL so it opens on the most recent weeks without any JS.
export function ContributionGraph({ className }: { className?: string }) {
  const { weeks, total } = live.contributions;
  const max = Math.max(1, ...weeks.flat().map(([, c]) => c));

  const months = weeks.map((week, i) => {
    const m = new Date(week[0][0]).getUTCMonth();
    const prev = i > 0 ? new Date(weeks[i - 1][0][0]).getUTCMonth() : -1;
    return m !== prev ? monthNames[m] : "";
  });

  return (
    <div className={cn("card p-5 sm:p-7", className)}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2 font-medium">
          <BrandIcon name="github" className="size-4" />
          {total.toLocaleString("en-US")} contributions in the last year
        </p>
        <a
          href="https://github.com/paulelisha500-ops"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted transition-colors hover:text-fg"
        >
          @paulelisha500-ops on GitHub
        </a>
      </div>

      <div dir="rtl" className="no-scrollbar overflow-x-auto">
        <div dir="ltr" className="inline-flex flex-col gap-1.5">
          <div className="flex gap-[3px] text-[10px] text-subtle">
            {months.map((m, i) => (
              <span key={i} className="w-[11px] overflow-visible whitespace-nowrap">
                {m}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {week.map(([date, count]) => (
                  <span
                    key={date}
                    title={`${count} contribution${count === 1 ? "" : "s"} on ${date}`}
                    className={cn("size-[11px] rounded-[3px]", heat[level(count, max)])}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-subtle">
        Less
        {heat.map((h) => (
          <span key={h} className={cn("size-[11px] rounded-[3px]", h)} />
        ))}
        More
      </div>
    </div>
  );
}

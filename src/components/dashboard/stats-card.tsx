"use client";

import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: string;
  trend?: { value: number; positive: boolean };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight text-card-foreground">
            {value}
          </p>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {description}
            </p>
          )}
          {trend && (
            <p
              className={cn(
                "mt-1.5 text-xs font-medium",
                trend.positive ? "text-success" : "text-destructive"
              )}
            >
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        {icon && <span className="shrink-0 text-xl">{icon}</span>}
      </div>
    </div>
  );
}

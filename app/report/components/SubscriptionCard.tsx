"use client";
import React from "react";

type Props = {
  name: string;
  cost: number;
  frequency: string;
  tags?: string[];
  status?: "duplicate" | "unused" | "ok";
};

export default function SubscriptionCard({ name, cost, frequency, tags = [], status = "ok" }: Props) {
  const badgeClass = status === "duplicate" ? "badge duplicate" : status === "unused" ? "badge unused" : "badge ok";

  return (
    <div className="card flex items-center justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold">{name}</div>
          <div className={badgeClass}>{status}</div>
        </div>
        <div className="mt-1 text-sm text-gray-600">{frequency} • ₩{cost.toLocaleString()}</div>
        {tags.length > 0 && (
          <div className="mt-2 flex gap-2">
            {tags.map((t) => (
              <span key={t} className="text-xs text-gray-500">#{t}</span>
            ))}
          </div>
        )}
      </div>
      <div className="text-right">
        <div className="text-sm text-gray-700">Monthly</div>
        <div className="mt-1 text-lg font-semibold">₩{cost.toLocaleString()}</div>
      </div>
    </div>
  );
}

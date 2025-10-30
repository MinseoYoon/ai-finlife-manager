"use client";
import React from "react";

type Props = {
  total: number;
  duplicates: number;
  unused: number;
  estimatedSavings: number;
};

export default function ReportSummary({ total, duplicates, unused, estimatedSavings }: Props) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold">요약</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs text-gray-500">구독 항목</div>
          <div className="mt-1 text-2xl font-bold">{total}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">중복 구독</div>
          <div className="mt-1 text-2xl font-bold text-rose-600">{duplicates}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">미사용 / 낮은 사용</div>
          <div className="mt-1 text-2xl font-bold text-sky-600">{unused}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">예상 절감(월)</div>
          <div className="mt-1 text-2xl font-bold">₩{estimatedSavings.toLocaleString()}</div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="generate-btn">절감 리포트 생성</button>
        <button className="border rounded-md px-3 py-2">CSV로 내보내기</button>
      </div>
    </div>
  );
}

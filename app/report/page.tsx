"use client";
import React, { useMemo, useState } from "react";
import "./report.css";
import SubscriptionCard from "./components/SubscriptionCard";
import ReportSummary from "./components/ReportSummary";

type Sub = { name: string; cost: number; frequency: string; tags?: string[] };

const SAMPLE_SUBSCRIPTIONS: Sub[] = [
  { name: "Spotify", cost: 9500, frequency: "Monthly", tags: ["music"] },
  { name: "YouTube Premium", cost: 10900, frequency: "Monthly", tags: ["video"] },
  { name: "Netflix", cost: 15500, frequency: "Monthly", tags: ["video"] },
  { name: "Netflix Basic", cost: 9900, frequency: "Monthly", tags: ["video"] },
  { name: "Notion", cost: 5400, frequency: "Monthly", tags: ["productivity"] },
  { name: "Adobe Creative Cloud", cost: 27000, frequency: "Monthly", tags: ["design"] },
];

export default function ReportPage() {
  const [data] = useState<Sub[]>(SAMPLE_SUBSCRIPTIONS);
  const [analyzed, setAnalyzed] = useState(false);

  // Simple UI-only duplicate detection by name token similarity
  const analysis = useMemo(() => {
    const map = new Map<string, Sub[]>();
    data.forEach((s) => {
      const key = s.name.toLowerCase().replace(/\s+/g, " ");
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(s);
    });

    const duplicates: Sub[] = [];
    map.forEach((list) => {
      if (list.length > 1) duplicates.push(...list);
    });

    // For demo: mark items with long names as 'unused' arbitrarily
    const unused = data.filter((d) => d.name.length > 12 && !duplicates.includes(d));

    const estimatedSavings = duplicates.reduce((s, it) => s + it.cost, 0) + Math.round(unused.reduce((s, it) => s + it.cost, 0) * 0.6);

    return {
      total: data.length,
      duplicates: duplicates.length,
      unused: unused.length,
      estimatedSavings,
      duplicateNames: new Set(duplicates.map((d) => d.name)),
      unusedNames: new Set(unused.map((d) => d.name)),
    };
  }, [data]);

  return (
    <div>
      <h1 className="text-2xl font-bold">불필요 지출 자동 감지</h1>
      <p className="mt-2 text-sm text-gray-600">중복 구독과 쓸데없는 비용을 감지하고 절감 리포트를 제공합니다. (UI 데모)</p>

      <div className="mt-6 report-grid">
        <aside>
          <div className="upload-box">
            <div className="text-center">
              <div className="text-lg font-semibold">데이터 업로드</div>
              <div className="mt-2 text-sm text-gray-500">CSV 업로드 또는 결제 계정 연결(모의 UI)</div>
            </div>

            <div className="w-full">
              <input type="file" accept=".csv" className="w-full" />
            </div>

            <div className="w-full flex gap-2">
              <button className="generate-btn" onClick={() => setAnalyzed(true)}>분석 시작</button>
              <button className="border rounded-md px-3 py-2" onClick={() => setAnalyzed(false)}>초기화</button>
            </div>

            <div className="mt-2 text-xs text-gray-500 text-center">샘플 데이터가 기본으로 로드됩니다. (UI 전용)</div>
          </div>

          <div className="mt-4">
            <ReportSummary
              total={analysis.total}
              duplicates={analysis.duplicates}
              unused={analysis.unused}
              estimatedSavings={analysis.estimatedSavings}
            />
          </div>
        </aside>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">감지 결과</h2>
            <div className="text-sm text-gray-500">상태: {analyzed ? "분석 완료" : "대기중"}</div>
          </div>

          <div className="mt-4 subscription-list">
            {data.map((s) => {
              const status = analyzed ? (analysis.duplicateNames.has(s.name) ? "duplicate" : analysis.unusedNames.has(s.name) ? "unused" : "ok") : "ok";
              return (
                <SubscriptionCard key={s.name} name={s.name} cost={s.cost} frequency={s.frequency} tags={s.tags} status={status as any} />
              );
            })}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">추천 조치</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
              <li>중복 구독은 하나만 유지하도록 계정 통합 또는 해지 권장</li>
              <li>미사용 구독은 무료 체험 전환 또는 해지 권장</li>
              <li>월별 총 지출을 고려한 우선순위 절감 액션 제공</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

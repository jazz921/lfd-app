"use client"

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fileSlice, { getFileState } from "@/store/slices/file.slice";

interface DataRow {
  Gender?: string;
  Age?: number;
  "Pair1 Status"?: string;
  "Pair2 Status"?: string;
  "Pair3 Status"?: string;
  "Pair4 Status"?: string;
  "Pair1 Lens Type"?: string;
  "Subjective Right Sphere"?: number | null;
  "Subjective Left Sphere"?: number | null;
  "Subjective Right Cylinder"?: number | null;
  "Subjective Left Cylinder"?: number | null;
  [key: string]: any;
}

interface PowerRow {
  power: number | string;
  right: number | string;
  left: number | string;
  combined: number;
  percentage: string;
}

export default function Home() {
  const { datas } = useSelector(getFileState);
  const [summary, setSummary] = useState<Record<string, string>>({});
  const [summaryTable, setSummaryTable] = useState<any[][]>([]);
  const [powerTables, setPowerTables] = useState<any[]>([]);

  const normalizeData = (rows: DataRow[]): DataRow[] => {
    return rows.map((row) => {
      const cleaned: DataRow = { ...row };

      // Clean string fields (remove leading D, trim)
      for (const key in cleaned) {
        if (typeof cleaned[key] === "string") {
          cleaned[key] = (cleaned[key] as string).replace(/^D/, "").trim();
        }
      }

      // Safe numeric parsing
      [
        "Subjective Right Sphere",
        "Subjective Left Sphere",
        "Subjective Right Cylinder",
        "Subjective Left Cylinder",
      ].forEach((field) => {
        const num = parseFloat(String(cleaned[field]));
        cleaned[field] = isNaN(num) ? null : num;
      });

      return cleaned;
    });
  };

  const execute = () => {
    // Always work on normalized copy
    const thailand2223: DataRow[] = normalizeData([...datas]);

    const columnsToCheck = [
      "Pair1 Status",
      "Pair2 Status",
      "Pair3 Status",
      "Pair4 Status",
    ];

    const thailand2223Glasses = thailand2223.filter((row) =>
      columnsToCheck.some(
        (col) => row[col] !== undefined && row[col] !== null && row[col] !== ""
      )
    );

    const sentToLabCount = thailand2223.filter((row) =>
      columnsToCheck.some((col) => String(row[col]).includes("Send to Lab"))
    ).length;

    const percentageSentToLab = thailand2223Glasses.length
      ? (sentToLabCount / thailand2223Glasses.length) * 100
      : 0;

    const percentageNoGlasses = thailand2223.length
      ? ((thailand2223.length - thailand2223Glasses.length) /
          thailand2223.length) *
        100
      : 0;

    // ---------- Breakdown ----------
    const readingThailand2223 = thailand2223Glasses.filter(
      (row) => row["Pair1 Lens Type"] === "Reading"
    );
    const readingPercentage = thailand2223Glasses.length
      ? (readingThailand2223.length / thailand2223Glasses.length) * 100
      : 0;

    const maleGlasses = thailand2223Glasses.filter(
      (row) => row.Gender === "Male" && (row.Age || 0) > 12
    );
    const maleNonReaders = maleGlasses.filter(
      (row) => row["Pair1 Lens Type"] !== "Reading"
    );

    const femaleGlasses = thailand2223Glasses.filter(
      (row) => row.Gender === "Female" && (row.Age || 0) > 12
    );
    const femaleNonReaders = femaleGlasses.filter(
      (row) => row["Pair1 Lens Type"] !== "Reading"
    );

    const childrenGlasses = thailand2223Glasses.filter(
      (row) => (row.Age || 0) <= 12
    );
    const childrenNonReaders = childrenGlasses.filter(
      (row) => row["Pair1 Lens Type"] !== "Reading"
    );

    const genderCounts = [
      maleNonReaders.length,
      femaleNonReaders.length,
      childrenNonReaders.length,
    ];
    const totalCount = genderCounts.reduce((a, b) => a + b, 0);
    const genderPercentages = genderCounts.map((count) =>
      totalCount ? ((count / totalCount) * 100).toFixed(2) + "%" : "0%"
    );

    const summaryTbl = [
      ["Gender", "Count", "Percentage"],
      ["Males", maleNonReaders.length, genderPercentages[0]],
      ["Females", femaleNonReaders.length, genderPercentages[1]],
      ["Children", childrenNonReaders.length, genderPercentages[2]],
      ["Total", totalCount, "100.00%"],
    ];

    // ---------- Power Distribution ----------
    const roundToQuarter = (val: number) => Math.round(val * 4) / 4;

    function analyzePowerDistribution(data: DataRow[], groupName: string) {
      const subjectivePowers = [
        6.0, 5.5, 5.0, 4.5, 4.0, 3.75, 3.5, 3.25, 3.0, 2.75, 2.5, 2.25, 2.0,
        1.75, 1.5, 1.25, 1.0, 0.75, 0.5, 0.25, 0, -0.25, -0.5, -0.75, -1.0,
        -1.25, -1.5, -1.75, -2.0, -2.25, -2.5, -2.75, -3.0, -3.25, -3.5, -3.75,
        -4.0, -4.5, -5.0, -5.5, -6.0,
      ];

      const rightCounts: Record<number, number> = {};
      const leftCounts: Record<number, number> = {};

      data.forEach((row) => {
        const rightPower =
          typeof row["Subjective Right Sphere"] === "number"
            ? roundToQuarter(row["Subjective Right Sphere"])
            : null;
        const leftPower =
          typeof row["Subjective Left Sphere"] === "number"
            ? roundToQuarter(row["Subjective Left Sphere"])
            : null;

        if (rightPower !== null) {
          rightCounts[rightPower] = (rightCounts[rightPower] || 0) + 1;
        }
        if (leftPower !== null) {
          leftCounts[leftPower] = (leftCounts[leftPower] || 0) + 1;
        }
      });

      const totalRight = Object.values(rightCounts).reduce((a, b) => a + b, 0);
      const totalLeft = Object.values(leftCounts).reduce((a, b) => a + b, 0);

      const powerTable: PowerRow[] = subjectivePowers.map((power) => {
        const right = rightCounts[power] || 0;
        const left = leftCounts[power] || 0;
        const combined = right + left;
        const percentage =
          totalRight + totalLeft > 0
            ? ((combined / (totalRight + totalLeft)) * 100).toFixed(2) + "%"
            : "0%";
        return { power, right, left, combined, percentage };
      });

      powerTable.push({
        power: "Total",
        right: "-",
        left: "-",
        combined: totalRight + totalLeft,
        percentage: "100%",
      });

      return { groupName, table: powerTable };
    }

    const powerTbls = [
      analyzePowerDistribution(maleNonReaders, "Males"),
      analyzePowerDistribution(femaleNonReaders, "Females"),
      analyzePowerDistribution(childrenNonReaders, "Children"),
    ];

    // ---------- Final Summary ----------
    const lenTotalOph = thailand2223Glasses.length - readingThailand2223.length;
    const ophPercentage = thailand2223.length
      ? (lenTotalOph / thailand2223.length) * 100
      : 0;
    const totalR2c =
      maleNonReaders.length +
      femaleNonReaders.length +
      childrenNonReaders.length;

    setSummary({
      percentageSentToLab: percentageSentToLab.toFixed(2) + "%",
      percentageNoGlasses: percentageNoGlasses.toFixed(2) + "%",
      readingPercentage: readingPercentage.toFixed(2) + "%",
      ophPercentage: ophPercentage.toFixed(2) + "%",
      r2cPercentage: lenTotalOph
        ? ((totalR2c / lenTotalOph) * 100).toFixed(2) + "%"
        : "0%",
      glassesPct: thailand2223.length
        ? ((thailand2223Glasses.length / thailand2223.length) * 100).toFixed(
            2
          ) + "%"
        : "0%",
      readersPct: thailand2223Glasses.length
        ? (
            (readingThailand2223.length / thailand2223Glasses.length) *
            100
          ).toFixed(2) + "%"
        : "0%",
      ophthalmicPct: thailand2223.length
        ? (
            ((thailand2223Glasses.length - readingThailand2223.length) /
              thailand2223.length) *
            100
          ).toFixed(2) + "%"
        : "0%",
    });

    setSummaryTable(summaryTbl);
    setPowerTables(powerTbls);
  };

  return (
    <div className="flex flex-col gap-y-5 items-start p-4">
      {/* <div>
        <label>Select file 1</label>
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          // onChange={handleThailand2022}
        />
      </div>
      <div>
        <label>Select file 2</label>
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          // onChange={handleThailand2023}
        />
      </div>
      <div>
        <label>Select file 3</label>
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          // onChange={handleBangkokOnesight}
        />
      </div> */}

      <button className="bg-amber-200 p-3" onClick={execute}>
        Execute
      </button>

      {/* ---------- Summary ---------- */}
      {Object.keys(summary).length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold">Summary Stats</h2>
          <ul className="list-disc pl-6">
            {Object.entries(summary).map(([k, v]) => (
              <li key={k}>
                {k}: {v}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---------- Gender Summary ---------- */}
      {summaryTable.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold">
            Gender Summary (Excluding Readers)
          </h2>
          <table className="border-collapse border border-gray-400">
            <thead>
              <tr>
                {summaryTable[0].map((head, i) => (
                  <th key={i} className="border border-gray-400 px-2 py-1">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {summaryTable.slice(1).map((row, i) => (
                <tr key={i}>
                  {row.map((cell: any, j: number) => (
                    <td key={j} className="border border-gray-400 px-2 py-1">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------- Power Tables ---------- */}
      {powerTables.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold">Power Distribution</h2>
          {powerTables.map((group, idx) => (
            <div key={idx} className="mt-4">
              <h3 className="font-semibold">{group.groupName}</h3>
              <table className="border-collapse border border-gray-400 text-sm">
                <thead>
                  <tr>
                    <th className="border px-2">Power</th>
                    <th className="border px-2">Right</th>
                    <th className="border px-2">Left</th>
                    <th className="border px-2">Combined</th>
                    <th className="border px-2">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {group.table.map((row: any, i: number) => (
                    <tr key={i}>
                      <td className="border px-2">{row.power}</td>
                      <td className="border px-2">{row.right}</td>
                      <td className="border px-2">{row.left}</td>
                      <td className="border px-2">{row.combined}</td>
                      <td className="border px-2">{row.percentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
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
  const { datas, countries } = useSelector(getFileState);
  const [summary, setSummary] = useState<Record<string, string>>({});
  const [summaryTable, setSummaryTable] = useState<any[][]>([]);
  const [powerTables, setPowerTables] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("")

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
    // Always work on normalized copy to reduce error on data computation
    // const thailand2223: DataRow[] = normalizeData([...datas]).filter(data => data.country_db === selectedCountry);
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

    console.log("percentageNoGlasses", percentageNoGlasses)

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

  const handleSummaryStatsKey = (k: string) => {
    switch (k) {
      case "percentageSentToLab":
        return "Sent to Lab";
      case "percentageNoGlasses":
        return "Glasses";
      case "readingPercentage":
        return "Reading";
      case "ophPercentage":
        return "OPH";
      case "r2cPercentage":
        return "R2C";
      case "glassesPct":
        return "Glasses";
      case "readersPct":
        return "Readers";
      case "ophthalmicPct":
        return "Opthalmic";
      default:
        return "";
    }
  };

  useEffect(() => {
    execute();
  }, [selectedCountry]);

  console.log(selectedCountry)

  return (
    <div className="flex flex-col gap-y-3 items-center p-4 overflow-y-hidden w-full">
      <div className="text-center mt-[5px]">
        <p className="font-avenir-regular font-bold text-[24px]">
          Lens Forecast Dashboard
        </p>
        <p className="font-avenir-light mt-[5px] lg:w-[40vw]">
          Select a country and input the number of people to estimate how many
          Ready 2 Clip lenses you will need for your clinic based on previous
          data.
        </p>
      </div>

      {/* <button className="bg-amber-200 p-3" onClick={execute}>
        Execute
      </button> */}

      <div className="flex w-full flex-row justify-center gap-x-2">
        <div className="flex">
          <label className="font-semibold font-avenir-regular text-sm text-wrap mr-3 my-2">
            Select a Country
          </label>
          <select
            className="border border-gray-400 py-[3px] px-3"
            id="countries"
            name="countries"
            onChange={e => setSelectedCountry(prev => prev = e.target.value)}
          >
            {countries.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
            {/* <option value="ph">Philippines</option>
            <option value="jp">Japan</option>
            <option value="us">United States</option>
            <option value="fr">France</option> */}
          </select>
        </div>
        <div className="">
          <label className="semi-bold text-sm mr-3 my-2 font-semibold font-avenir-regular">
            Input the number of people
          </label>
          <input className="border border-gray-400 p-2" type="text" />
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-center gap-x-5">
        <div className="md:w-[30%]">
          {Object.keys(summary).length > 0 && (
            <div className="w-full bg-black flex items-center px-2 py-1">
              <p className="text-white font-avenir-regular font-bold tracking-wider">
                Results
              </p>
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-x-2 w-full">
            {/* ---------- Summary ---------- */}
            {Object.keys(summary).length > 0 && (
              <div className="mt-[5px] flex-[1]">
                <h3 className="font-semibold text-center border border-b-0 border-subtle-grey bg-very-light-blue">
                  Summary Stats
                </h3>
                {/* <ul className="list-disc pl-6">
                {Object.entries(summary).map(([k, v]) => (
                  <li key={k}>
                    {k}: {v}
                  </li>
                ))}
              </ul> */}
                <table className="min-w-full border border-subtle-grey">
                  <thead className="">
                    <tr>
                      <th className="px-2 text-left border-b border-subtle-grey bg-very-light-blue">
                        Key
                      </th>
                      <th className="px-2 text-left border-b border-l border-subtle-grey bg-very-light-blue">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(summary).map(([k, v]) => (
                      <tr key={k} className="">
                        <td className="border-b border-subtle-grey px-2">
                          {handleSummaryStatsKey(k)}
                        </td>
                        <td className="border-b border-subtle-grey px-2 border-l">
                          {v}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ---------- Gender Summary ---------- */}
            {summaryTable.length > 0 && (
              <div className="mt-[5px]">
                <h3 className="font-semibold text-center border border-b-0 border-subtle-grey bg-very-light-blue">
                  Gender Summary (Excluding Readers)
                </h3>
                <table className="border-collapse border border-subtle-grey w-full">
                  <thead>
                    <tr>
                      {summaryTable[0].map((head, i) => (
                        <th
                          key={i}
                          className="border text-left border-subtle-grey bg-very-light-blue px-2"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {summaryTable.slice(1).map((row, i) => (
                      <tr key={i}>
                        {row.map((cell: any, j: number) => (
                          <td
                            key={j}
                            className="border border-subtle-grey px-2"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ---------- Power Tables ---------- */}
        <div className="md:w-[70%] h-[60vh] overflow-x-hidden overflow-y-auto border-b border-subtle-grey">
          {powerTables.length > 0 && (
            <div className="w-full bg-black flex items-center px-2 py-1">
              <p className="text-white font-avenir-regular font-bold tracking-wider">
                Demographic
              </p>
            </div>
          )}
          {powerTables.length > 0 && (
            <div className="flex flex-col lg:flex-row gap-x-2 mt-[5px]">
              {powerTables.map((group, idx) => (
                <div key={idx} className="w-full">
                  <h3 className="font-semibold text-center border border-b-0 border-subtle-grey bg-very-light-blue">
                    {group.groupName}
                  </h3>
                  <table className="border-collapse border border-subtle-grey text-sm w-full">
                    <thead>
                      <tr>
                        <th className="border px-2 border-subtle-grey bg-very-light-blue">
                          Power
                        </th>
                        <th className="border px-2 border-subtle-grey bg-very-light-blue">
                          Right
                        </th>
                        <th className="border px-2 border-subtle-grey bg-very-light-blue">
                          Left
                        </th>
                        <th className="border px-2 border-subtle-grey bg-very-light-blue">
                          Combined
                        </th>
                        <th className="border px-2 border-subtle-grey bg-very-light-blue">
                          Percentage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.table.map((row: any, i: number) => (
                        <tr key={i}>
                          <td className="border px-2 border-subtle-grey">
                            {row.power}
                          </td>
                          <td className="border px-2 border-subtle-grey">
                            {row.right}
                          </td>
                          <td className="border px-2 border-subtle-grey">
                            {row.left}
                          </td>
                          <td className="border px-2 border-subtle-grey">
                            {row.combined}
                          </td>
                          <td className="border px-2 border-subtle-grey">
                            {row.percentage}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

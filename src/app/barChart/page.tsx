import { BarChart } from "@/components/bar_chart/barChartCom";
import ExportPdfButton from "@/components/ExportPdfButton";

export default function BarChartPage({
  searchParams,
}: {
  searchParams?: { print?: string };
}) {
  const isPrintMode = searchParams?.print === "true";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm w-full max-w-2xl">
        {!isPrintMode && (
          <div className="mb-4 flex justify-end">
            <ExportPdfButton />
          </div>
        )}

        <BarChart />
      </div>
    </main>
  );
}

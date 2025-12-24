import { useState } from "react";
import { useStore } from "./store";

export const SubmitButton = () => {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://harsh-sen-technical-assessment-backend-1.onrender.com/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await res.json();
      setResult(data);
      setOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-500 disabled:opacity-60"
      >
        {loading ? "Running..." : "▶ Run Pipeline"}
      </button>

      {/* MODAL */}
      {open && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-[360px] rounded-lg bg-white shadow-xl border border-slate-200">
            
            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-sm font-semibold text-slate-800">
                Pipeline Analysis
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <div className="px-4 py-4 text-sm text-slate-700 space-y-2">
              <div className="flex justify-between">
                <span>Nodes</span>
                <span className="font-medium">{result.num_nodes}</span>
              </div>
              <div className="flex justify-between">
                <span>Edges</span>
                <span className="font-medium">{result.num_edges}</span>
              </div>
              <div className="flex justify-between">
                <span>Valid DAG</span>
                <span
                  className={`font-medium ${
                    result.is_dag ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {result.is_dag ? "Yes" : "No"}
                </span>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-4 py-3 border-t flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1.5 text-xs rounded-md border text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

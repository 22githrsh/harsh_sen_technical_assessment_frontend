import { useState } from "react";
import { BaseNode } from "./BaseNode";
import { useStore } from "../store";

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const deleteNode = useStore((s) => s.deleteNode);

  const [name, setName] = useState(data?.outputName || "final_response");
  const [type, setType] = useState(data?.outputType || "Text");

  return (
    <BaseNode title="Output" accent="bg-slate-500" onDelete={() => deleteNode(id)}>
      <div className="space-y-3">
        <input
          className="w-full rounded-md bg-slate-900 border border-slate-700 px-2 py-1.5 text-sm text-slate-100"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            updateNodeField(id, "outputName", e.target.value);
          }}
        />

        <select
          className="w-full rounded-md bg-slate-900 border border-slate-700 px-2 py-1.5 text-sm text-slate-100"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            updateNodeField(id, "outputType", e.target.value);
          }}
        >
          <option>Text</option>
          <option>Image</option>
        </select>

        <p className="text-[11px] text-slate-500">
          Final output of the pipeline
        </p>
      </div>
    </BaseNode>
  );
};

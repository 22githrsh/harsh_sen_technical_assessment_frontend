import { useState } from "react";
import { BaseNode } from "./BaseNode";
import { useStore } from "../store";

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const deleteNode = useStore((s) => s.deleteNode);

  const [name, setName] = useState(data?.inputName || "customer_email");
  const [type, setType] = useState(data?.inputType || "Text");

  return (
    <BaseNode title="Input" accent="bg-green-500" onDelete={() => deleteNode(id)}>
      <div className="space-y-3">

        <div>
          <p className="text-xs text-slate-400 mb-1">Name</p>
          <input
            className="w-full rounded-md bg-slate-900 border border-slate-700 px-2 py-1.5 text-sm text-slate-100"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              updateNodeField(id, "inputName", e.target.value);
            }}
          />
        </div>

        <div>
          <p className="text-xs text-slate-400 mb-1">Type</p>
          <select
            className="w-full rounded-md bg-slate-900 border border-slate-700 px-2 py-1.5 text-sm text-slate-100"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              updateNodeField(id, "inputType", e.target.value);
            }}
          >
            <option>Text</option>
            <option>File</option>
          </select>
        </div>

        <p className="text-[11px] text-slate-500">
          Demo input used for pipeline preview
        </p>

      </div>
    </BaseNode>
  );
};

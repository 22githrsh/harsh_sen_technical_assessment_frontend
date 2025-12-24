import { useState, useMemo } from "react";
import { BaseNode } from "./BaseNode";
import { useStore } from "../store";

export const TextNode = ({ id, data }) => {
  const deleteNode = useStore((s) => s.deleteNode);
  const [text, setText] = useState(
    data?.text || "Hello {{customer_email}}, your request is being processed."
  );

  const variables = useMemo(() => {
    const regex = /{{\s*(\w+)\s*}}/g;
    const found = new Set();
    let match;
    while ((match = regex.exec(text))) found.add(match[1]);
    return [...found];
  }, [text]);

  return (
    <BaseNode title="Text" accent="bg-slate-400" onDelete={() => deleteNode(id)}>
      <p className="text-xs text-slate-400">Prompt Template</p>

      <textarea
        rows={3}
        className="w-full rounded-md bg-slate-900 border border-slate-700 px-2 py-1.5 text-sm text-slate-100 resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {variables.length > 0 && (
        <p className="text-[11px] text-slate-500">
          Uses variables:{" "}
          {variables.map(v => (
            <span key={v} className="font-mono">{`{{${v}}}`} </span>
          ))}
        </p>
      )}

      <p className="text-[11px] text-slate-500">
        Demo prompt for pipeline preview
      </p>
    </BaseNode>
  );
};

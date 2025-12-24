import { BaseNode } from "./BaseNode";
import { useStore } from "../store";

export const LLMNode = ({ id }) => {
  const deleteNode = useStore((s) => s.deleteNode);

  return (
    <BaseNode title="LLM" accent="bg-blue-500" onDelete={() => deleteNode(id)}>
      <p className="text-sm text-slate-300">
        Large Language Model
      </p>

      <p className="text-xs text-slate-400">
        Generates a response using the provided prompt and inputs.
      </p>

      <div className="flex flex-wrap gap-2 pt-1">
        {["Text generation", "Reasoning", "Summarization"].map(tag => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-full text-[11px] bg-slate-800 text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-[11px] text-slate-500">
        Demo model for pipeline preview
      </p>
    </BaseNode>
  );
};

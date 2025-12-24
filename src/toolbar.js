// toolbar.js
import { DraggableNode } from "./draggableNode";
import { useStore } from "./store";
import { Undo2, Redo2 } from "lucide-react";

export const PipelineToolbar = () => {
  const undo = useStore((s) => s.undo);
  const redo = useStore((s) => s.redo);

  return (
    <div className="flex items-center gap-2 bg-slate-900 px-2 py-1.5 rounded-xl">

    
     

      {/* NODES */}
      <DraggableNode type="customInput" label="Input" />
      <DraggableNode type="text" label="Text" />
      <DraggableNode type="llm" label="LLM" />
      <DraggableNode type="customOutput" label="Output" />
      <div className="w-px h-5 bg-slate-700 mx-1" />
        {/* UNDO / REDO */}
        <button
        onClick={undo}
        title="Undo (Ctrl + Z)"
        className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300"
      >
        <Undo2 size={14} />
      </button>

      <button
        onClick={redo}
        title="Redo (Ctrl + Y)"
        className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300"
      >
        <Redo2 size={14} />
      </button>

    </div>
  );
};

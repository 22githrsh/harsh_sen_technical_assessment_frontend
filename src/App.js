import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { LogOut } from "lucide-react";

function App() {
  return (
    <div className="w-full h-screen flex flex-col bg-[#020617]">


      <div className="h-16 grid grid-cols-3 py-[8.5px] items-center px-6 border-b border-slate-800 bg-[#1F2937]">


        <div className="leading-tight">
          <p className="text-sm font-medium text-slate-100">
            Data Processing Pipeline
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>Draft</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>Autosaved</span>
          </div>
        </div>


        <div className="flex items-center justify-center gap-3">
          <span className="text-[12px] text-slate-400">
            Drag nodes →
          </span>
          <PipelineToolbar />
        </div>


        <div className="flex items-center justify-end gap-2">
          <button className="px-3 py-[5.5px] text-[12px] rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800">
            Save Draft
          </button>

          <SubmitButton />

          <button
            className="p-1.5 text-slate-300 hover:bg-slate-800 rounded-md"
            title="Exit"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>



      <PipelineUI />
    </div>
  );
}

export default App;

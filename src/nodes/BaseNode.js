import { Handle, Position } from "reactflow";

export const BaseNode = ({
  title,
  children,
  accent = "bg-blue-500",
  onDelete,
}) => {
  return (

    <div className="relative w-[260px]">


      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />


      <div className="rounded-xl bg-[#1F2937] border border-slate-700 shadow-lg overflow-hidden">


        <div className={`h-[3px] w-full ${accent}`} />


        <div className="px-4 py-2 border-b border-slate-700">
          <p className="text-sm font-semibold text-slate-100">
            {title}
          </p>
        </div>


        <div className="px-4 py-3 text-sm text-slate-300 space-y-2">
          {children}
        </div>


        <div className="px-4 py-2 border-t border-slate-700 text-xs text-slate-400 flex justify-between items-center">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Configured
          </span>

          {onDelete && (
            <span
              onClick={onDelete}
              className="text-red-400 cursor-pointer hover:text-red-300"
            >
              Delete
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

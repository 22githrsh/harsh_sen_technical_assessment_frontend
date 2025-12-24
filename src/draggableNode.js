export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={type}
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        minWidth: "64px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1F2937",
        border: "1px solid #334155",
        borderRadius: "10px",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <span
        style={{
          color: "#E5E7EB",
          fontSize: "12px",
          fontWeight: 500,
          lineHeight: "1",
        }}
      >
        {label}
      </span>
    </div>
  );
};

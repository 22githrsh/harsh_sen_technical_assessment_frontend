// store.js
import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

const MAX_HISTORY = 50;

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},


  history: [],
  future: [],

  saveHistory: () => {
    const { nodes, edges, history } = get();
    set({
      history: [...history, { nodes, edges }].slice(-MAX_HISTORY),
      future: [],
    });
  },

  undo: () => {
    const { history, future, nodes, edges } = get();
    if (history.length === 0) return;

    const previous = history[history.length - 1];

    set({
      nodes: previous.nodes,
      edges: previous.edges,
      history: history.slice(0, -1),
      future: [{ nodes, edges }, ...future],
    });
  },

  redo: () => {
    const { history, future, nodes, edges } = get();
    if (future.length === 0) return;

    const next = future[0];

    set({
      nodes: next.nodes,
      edges: next.edges,
      history: [...history, { nodes, edges }],
      future: future.slice(1),
    });
  },


  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };

    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }

    newIDs[type] += 1;
    set({ nodeIDs: newIDs });

    return `${type}-${newIDs[type]}`;
  },


  addNode: (node) => {
    get().saveHistory();
    set({
      nodes: [...get().nodes, node],
    });
  },


  deleteNode: (nodeId) => {
    get().saveHistory();
    set({
      nodes: get().nodes.filter((n) => n.id !== nodeId),
      edges: get().edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      ),
    });
  },

  onNodesChange: (changes) => {
    // 🚨 IMPORTANT FIX:
    // position drag events history me save nahi honge
    const meaningfulChange = changes.some(
      (c) => c.type !== "position"
    );

    if (meaningfulChange) {
      get().saveHistory();
    }

    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },


  onEdgesChange: (changes) => {
    get().saveHistory();
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },


  onConnect: (connection) => {
    get().saveHistory();
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: {
            type: MarkerType.Arrow,
            height: "20px",
            width: "20px",
          },
        },
        get().edges
      ),
    });
  },


  updateNodeField: (nodeId, fieldName, fieldValue) => {
    get().saveHistory();
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                [fieldName]: fieldValue,
              },
            }
          : node
      ),
    });
  },
}));

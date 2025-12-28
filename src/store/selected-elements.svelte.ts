import { writable } from "svelte/store";
import type { _Node, _NodeAPI } from "../api/types";

export const selectedElements = writable<_NodeAPI[]>([]);
export let currentSelectedComponent = writable<_Node | null>(null);

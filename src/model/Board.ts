import { Item } from "./Item";

export interface Board {
    id: number | null;
    name: string;
    description: string;
    items: Item[] | null;
}
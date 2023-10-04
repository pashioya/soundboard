export interface Item {
    id: number | null;
    soundboardId: number | null;
    name: string;
    image: string;
    sound: string;
    spokenText: string;
}

export interface Soundboard {
    id: number | null;
    name: string;
    description: string;
    items: Item[] | null;
}

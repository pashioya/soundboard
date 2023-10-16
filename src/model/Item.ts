export type Item = {
    id: number;
    soundboardId: number;
    name: string;
    image: string;
    sound: string;
    spokenText: string;
}

export type ItemData = Omit<Item, 'id' | 'soundboardId'>


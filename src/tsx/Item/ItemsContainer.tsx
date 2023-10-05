import ItemCard from "./ItemCard";
import { useState, useEffect } from "react";
import { Item } from "../Types";
import { Soundboard } from "../Types";
import axios from "axios";

interface ItemsContainerProps {
    selectedSoundBoard: Soundboard | null;
    displayItemName: boolean;
    displaySpokenText: boolean;
    removeItem: (itemId: number | null) => void;
}

function ItemsContainer(props: ItemsContainerProps) {
    const {
        selectedSoundBoard,
        displayItemName,
        displaySpokenText,
        removeItem,
    } = props;

    const [items, setItems] = useState<Item[] | null>(null);
    const [selectedItemId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        let items: Item[] = [];
        async function getItemsBySoundBoardId() {
            try {
                const response = await axios.get<Item[]>("/items");
                items = response.data.filter(
                    (item: Item) => item.soundboardId === selectedSoundBoard?.id
                );
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
            if (isLoading || !items) {
                return <div>Loading...</div>;
            }

            if (isError) {
                return <div>Error...</div>;
            }
            setItems(items);
        }
        if (selectedSoundBoard) {
            getItemsBySoundBoardId();
        } else {
            setItems(null); // Set items to null if soundboard is not selected
        }
    }, [isLoading, isError, selectedSoundBoard]);

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {items?.map((item) => (
                    <ItemCard
                        key={item.id!}
                        item={item}
                        displayItemName={displayItemName}
                        displaySpokenText={displaySpokenText}
                        selected={selectedItemId === item.id!.valueOf()}
                        removeItem={() => removeItem(item.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ItemsContainer;

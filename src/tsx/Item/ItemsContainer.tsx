import ItemCard from "./ItemCard";
import {Item} from "../Types";

interface ItemsContainerProps {
    items: Item[] | null;
    isPlaying: boolean;
    displayItemName: boolean;
    displaySpokenText: boolean;
    selectedItemId: number | null;
    playSound: (sound: string, itemId: number) => void;
    removeItem: (itemId: number | null) => void;
}

function ItemsContainer(props: ItemsContainerProps) {
    const {
        items,
        isPlaying,
        displayItemName,
        displaySpokenText,
        selectedItemId,
        playSound,
        removeItem,
    } = props;



    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {items?.map((item) => (
                    <ItemCard
                        key={item.id!}
                        item={item}
                        isPlaying={isPlaying}
                        displayItemName={displayItemName}
                        displaySpokenText={displaySpokenText}
                        selected={selectedItemId === item.id!.valueOf()}
                        playSound={() =>
                            playSound(item.sound, item.id!.valueOf())
                        }
                        removeItem={() => removeItem(item.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ItemsContainer;

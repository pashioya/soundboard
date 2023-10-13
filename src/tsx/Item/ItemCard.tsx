import { useState } from "react";
import { Item } from "../../model/Item.ts";
import { deleteItem } from "../services/ItemDataService.ts";
function ItemCard(props: {
    item: Item;
}) {
    const { item} =
        props;
    const [isPlaying, setIsPlaying] = useState(false);

    function playSound(sound: string) {
        const audio = new Audio(sound);
        // if the sound is already playing, do nothing
        if (isPlaying) return;
        setIsPlaying(true);
        audio.play();
        audio.onended = () => {
            setIsPlaying(false);
        };
    }

    return (
        <div
            id={item.id!.toString()}
            onClick={() => playSound(item.sound)}
        >
            <div className="card shadow-sm pointer">
                <img
                    className={`bd-placeholder-img card-img-top object-fit-cover`}
                    src={item.image}
                    alt=""
                    width="100%"
                    height="225"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                />
                <div className="card-body">
                    <p >
                        {item.name}
                    </p>
                    <div className={`item ${isPlaying ? "" : "hidden"}`}>
                        <p
                        >
                            {item.spokenText}
                        </p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => deleteItem(item.id!)}
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary disabled"
                            >
                                Edit
                            </button>
                        </div>
                        <small className="text-body-secondary">9 mins</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;

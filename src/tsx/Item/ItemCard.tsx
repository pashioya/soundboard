import {Item} from "../Types";

function ItemCard(props: {
    item: Item;
    isPlaying: boolean;
    displayItemName: boolean;
    displaySpokenText: boolean;
    selected: boolean;
    playSound: () => void;
    removeItem: () => void;
}) {
    const {
        item,
        isPlaying,
        displayItemName,
        displaySpokenText,
        selected,
        playSound,
        removeItem,
    } = props;

    return (
        <div
            className={`col ${selected ? "enlarge" : ""}`}
            id={item.id!.toString()}
            onClick={playSound}
        >
            <div className="card shadow-sm pointer">
                <img
                    className={`bd-placeholder-img card-img-top object-fit-cover ${
                        selected ? "enhance" : ""
                    }`}
                    src={item.image}
                    alt=""
                    width="100%"
                    height="225"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                />
                <div className="card-body">
                    <p className={`item ${displayItemName ? "" : "hidden"}`}>
                        {item.name}
                    </p>
                    <div className={`item ${isPlaying ? "" : "hidden"}`}>
                        <p
                            className={`spoken-text ${
                                displaySpokenText ? "" : "hidden"
                            }`}
                        >
                            {item.spokenText}
                        </p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={removeItem}
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
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

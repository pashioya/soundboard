import ItemCard from "../Item/ItemCard";
import { useState, useEffect } from "react";
import { Item } from "../../model/Item";
import { Board } from "../../model/Board";
import { useParams } from "react-router-dom";
import Header from "../UI/Header";
import CustomNavBar from "../UI/CustomNavBar";
import NewItemModal from "../Item/NewItemModal";
import { getItemsByBoardId } from "../services/ItemDataService";
import { getBoardById } from "../services/BoardDataService";

function Soundboard() {
    const [items, setItems] = useState<Item[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [soundBoard, setSoundBoard] = useState<Board | null>(null);
    const { id } = useParams();

    useEffect(() => {
        let items: Item[] = [];
        getItemsByBoardId(id!).then((response: Item[]) => {
            items = response;
            setItems(items);
        }).catch((error: any) => {
            setIsError(true);
            console.log(error);
        }
        );
    }, [isLoading, isError, items]);

    useEffect(() => {
        let soundBoard: Board | null = null;
        getBoardById(id!).then((response: Board) => {
            soundBoard = response;
            setSoundBoard(soundBoard);
            setIsLoading(false);
        }
        ).catch((error: any) => {
            setIsError(true);
            console.log(error);
        });
    }, []);

    return (
        <div className="container">
            <CustomNavBar />
            <Header soundBoard={soundBoard} />
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {items?.map((item) => (
                    <ItemCard
                        key={item.id!}
                        item={item}
                    />
                ))}
            </div>
            <NewItemModal />
        </div>
    );
}

export default Soundboard;

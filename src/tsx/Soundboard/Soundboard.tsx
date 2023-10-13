import ItemCard from "../Item/ItemCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { Item } from "../../model/Item";
import { Board } from "../../model/Board";
import { useParams } from "react-router-dom";
import Header from "../UI/Header";
import CustomNavBar from "../UI/CustomNavBar";



function Soundboard() {
    const [items, setItems] = useState<Item[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [soundBoard, setSoundBoard] = useState<Board | null>(null);
    const { id } = useParams();

    useEffect(() => {
        let items: Item[] = [];
        async function getItemsBySoundBoardId() {
            try {
                const response = await axios.get<Item[]>("/soundboards/" + id + "/items");
                items = response.data;
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
        getItemsBySoundBoardId();
    }, [isLoading, isError, items]);

    useEffect(() => {
        async function getSoundboard() {
            try {
                const response = await axios.get("/soundboards/" + id);
                setSoundBoard(response.data);
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
        }
        getSoundboard();
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
        </div>
    );
}

export default Soundboard;

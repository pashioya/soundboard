import "./css/App.css";

import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
import NewItemModal from "./tsx/Item/NewItemModal";
import CustomNavbar from "./tsx/UI/CustomNavBar";
import ItemsContainer from "./tsx/Item/ItemsContainer";
import Header from "./tsx/UI/Header";
import {Item} from "./tsx/Types";
import {Soundboard} from "./tsx/Types";

import { useEffect, useState } from "react";

function App() {
    const [soundboards, setSoundboards] = useState<Soundboard[] | null>(null);
    const [soundboard, setSelectedSoundboard] = useState<Soundboard | null>(
        null
    );
    const [items, setItems] = useState<Item[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [displayItemName, setDisplayItemName] = useState(true);
    const [displaySpokenText, setDisplaySpokenText] = useState(true);

    useEffect(() => {
        async function getSoundboards() {
            try {
                const response = await axios.get<Soundboard[]>("/soundboards");
                setSoundboards(response.data);
                if (response.data.length > 0) {
                    setSelectedSoundboard(response.data[0]); // Select the first soundboard
                }
            } catch (error) {
                setIsError(true);
            }
        }
        setIsLoading(false);
        getSoundboards();
    }, []);


    useEffect(() => {
        let items: Item[] = [];
        if (soundboard) {
            async function getItemsBySoundBoardId() {
                try {
                    const response = await axios.get<Item[]>("/items");
                    items = response.data.filter((item : Item) => item.soundboardId === soundboard?.id);
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
        } else {
            setItems(null); // Set items to null if soundboard is not selected
        }
    }, [soundboard]);




    function selectSoundBoard(selectedSoundBoard: Soundboard) {
        setSelectedSoundboard(selectedSoundBoard);
    }
    function addItem(newItem: Item) {
        setItems((prevItems) => {
            if (prevItems) {
                newItem.id = prevItems.length + 1;
                return [...prevItems, newItem];
            } else {
                // If items is null or undefined, create a new array with the new item
                return [newItem];
            }
        });
    }

    function removeItem(itemId: number | null) {
        if (itemId === null || itemId === undefined) {
            // If itemId is null or undefined, do nothing
            return;
        }

        setItems((prevItems) => {
            if (prevItems) {
                return prevItems.filter((item) => item.id !== itemId);
            } else {
                // If items is null or undefined, return an empty array
                return [];
            }
        });
    }

    function toggleItemName() {
        setDisplayItemName((prevValue) => !prevValue);
    }

    function toggleSpokenText() {
        setDisplaySpokenText((prevValue) => !prevValue);
    }

    function playSound(sound: string, itemId: number) {
        const audio = new Audio(sound);
        // if the sound is already playing, do nothing
        if (isPlaying) return;
        setIsPlaying(true);
        setSelectedItemId(itemId);
        audio.play();
        audio.onended = () => {
            setIsPlaying(false);
            setSelectedItemId(null);
        };
    }

    return (
        <>
            <CustomNavbar
                soundboards={soundboards}
                selectSoundBoard={selectSoundBoard}
                toggleItemName={toggleItemName}
                toggleSpokenText={toggleSpokenText}
            />
            <Header {...{ soundboard }} />
            <ItemsContainer
                items={items}
                isPlaying={isPlaying}
                displayItemName={displayItemName}
                displaySpokenText={displaySpokenText}
                selectedItemId={selectedItemId}
                playSound={playSound}
                removeItem={removeItem}
            />

            <NewItemModal addItem={addItem} />
        </>
    );
}

export default App;

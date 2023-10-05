import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
import "./css/App.css";
import NewItemModal from "./tsx/Item/NewItemModal";
import CustomNavbar from "./tsx/UI/CustomNavBar";
import ItemsContainer from "./tsx/Item/ItemsContainer";
import Header from "./tsx/UI/Header";
import { Soundboard } from "./tsx/Types";
import { useEffect, useState } from "react";

function App() {
    const [soundboards, setSoundboards] = useState<Soundboard[] | null>(null);
    const [soundboard, setSelectedSoundboard] = useState<Soundboard | null>(
        null
    );

    const [, setIsLoading] = useState(true);
    const [, setIsError] = useState(false);

    const [displayItemName, setDisplayItemName] = useState(true);
    const [displaySpokenText, setDisplaySpokenText] = useState(true);

    useEffect(() => {
        async function getSoundboards() {
            try {
                const response = await axios.get<Soundboard[]>("/soundboards");
                if (response.data.length > 0) {
                    setSoundboards(response.data);
                }
            } catch (error) {
                setIsError(true);
            }
        }
        setIsLoading(false);
        getSoundboards();
    }, []);

    function selectSoundBoard(selectedSoundBoard: Soundboard) {
        setSelectedSoundboard(selectedSoundBoard);
    }

    function removeItem(itemId: number | null) {
        axios.delete(`/items/${itemId}`).then((response) => {
            console.log(response.data);
        });
    }

    function toggleItemName() {
        setDisplayItemName((prevValue) => !prevValue);
    }

    function toggleSpokenText() {
        setDisplaySpokenText((prevValue) => !prevValue);
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
                selectedSoundBoard={soundboard}
                displayItemName={displayItemName}
                displaySpokenText={displaySpokenText}
                removeItem={removeItem}
            />

            <NewItemModal />
        </>
    );
}

export default App;

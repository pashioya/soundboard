import {useEffect, useState } from "react";
import Header from "../UI/Header";
import { Board } from "../../model/Board";
import axios from "axios";
import CustomNavBar from "../UI/CustomNavBar";
import SelectSoundBoard from "./SelectSoundBoard";
function Soundboards(){
    const [soundboards, setSoundboards] = useState<Board[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function getSoundboards() {
            try {
                const response = await axios.get<Board[]>("/soundboards");
                setSoundboards(response.data)
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
            if (isLoading || !soundboards) {
                return <div>Loading...</div>;
            }

            if (isError) {
                return <div>Error...</div>;
            }
            setSoundboards(soundboards);
        }
        getSoundboards();
    }, []);

    return (
        <>
            <CustomNavBar />
            <SelectSoundBoard soundBoards={soundboards}/>
            <Header soundBoard={null} />
        </>
    );
}

export default Soundboards;
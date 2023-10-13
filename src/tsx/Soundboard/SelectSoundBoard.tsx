import { useNavigate } from "react-router-dom";
import {Board} from "../../model/Board";


interface SelectSoundboardProps {
    soundBoards: Board[];
}


function selectSoundBoard({
                              soundBoards
                          }: SelectSoundboardProps) {
    const navigate = useNavigate();

    return (
        <div className="scrollmenu">
            {
                soundBoards.map((soundBoard) =>
                    <a onClick={
                        () => {
                            navigate("/soundboards/" + soundBoard.id);
                        }}
                       key={soundBoard.id}>{soundBoard.name}</a>)
                    }
                    <a>Add SoundBar</a>
                </div>
                )
            }

export default selectSoundBoard;
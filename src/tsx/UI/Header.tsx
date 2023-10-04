import { Button } from "react-bootstrap";
import {Soundboard} from "../Types";

function Header({ soundboard }: { soundboard: Soundboard | null }) {
    if (!soundboard) {
        return (
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">SoundBoards</h1>
                        <p className="lead text-body-secondary">
                            Select a soundboard from the dropdown menu above.
                        </p>
                    </div>
                </div>
            </section>
        );
    }
    return (
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">{soundboard.name}</h1>
                    <p className="lead text-body-secondary">
                        {soundboard.description}
                    </p>
                    <p>
                        <Button variant="danger">Delete</Button>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Header;

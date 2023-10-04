import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Soundboard} from "../Types";

interface CustomNewNavBarProps {
    soundboards: Soundboard[] | null;
    selectSoundBoard: (selectedSoundBoard: Soundboard) => void;
    toggleItemName: () => void;
    toggleSpokenText: () => void;
}

function CustomNewNavBar(props: CustomNewNavBarProps) {
    if (!props.soundboards)
        return (
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">SoundBoards</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>
        );

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">SoundBoards</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <SelectSoundBoard
                    soundboards={props.soundboards}
                    selectSoundBoard={props.selectSoundBoard}
                />
                <Settings
                    toggleItemName={props.toggleItemName}
                    toggleSpokenText={props.toggleSpokenText}
                />
            </Container>
        </Navbar>
    );
}

function SelectSoundBoard(props: {
    soundboards: Soundboard[];
    selectSoundBoard: (selectedSoundBoard: Soundboard) => void;
}) {
    return (
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <NavDropdown title="Select Soundboard" id="basic-nav-dropdown">
                    {props.soundboards?.map((soundboard) => (
                        <NavDropdown.Item
                            key={soundboard.id}
                            onClick={() => props.selectSoundBoard(soundboard)}
                        >
                            {soundboard.name}
                        </NavDropdown.Item>
                    ))}
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    );
}

function Settings(props: {
    toggleItemName: () => void;
    toggleSpokenText: () => void;
}) {
    return (
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={props.toggleItemName}>
                        Toggle Item Name
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={props.toggleSpokenText}>
                        Toggle Spoken Text
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    );
}

export default CustomNewNavBar;

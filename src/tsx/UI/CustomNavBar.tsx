import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function CustomNewNavBar() {
    const navigate = useNavigate();
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand
                    onClick={() => {navigate("/soundboards")}}
                    className="cursor-pointer"
                >SoundBoards</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Container>
        </Navbar>
    );
}

export default CustomNewNavBar;

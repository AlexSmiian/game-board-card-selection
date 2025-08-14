import Container from "./components/_ui/Container";
import Logo from "./components/Logo";
import H1 from "./components/_ui/H1/indext.tsx";
import CashCounter from "./components/CashCounter";
import CardWrapper from "./components/CardWrapper";
import CashAnimationLayer from "./components/CashAnimationLayer";

function App() {
    return (
        <Container>
            <Logo/>
            <H1/>
            <CashCounter />
            <CardWrapper />
            <CashAnimationLayer />
        </Container>
    )
}

export default App

import Container from "./components/Container";
import Card from "./components/Card";
import HelperDialog from "./components/HelperDialog";
import { randomCardNumberAndType } from "./libs/random";

export default function App() {
  const card = randomCardNumberAndType();
  return (
    <Container>
      <HelperDialog />
      <div className="fixed top-1/2 left-1/2 -translate-1/2 h-[90dvh] w-[90dvw] max-w-lg flex flex-col">
        <Card allowTapping type={card.type} number={card.number} />
      </div>
    </Container>
  );
}

import Container from "./components/Container";
import Card, { type CardType } from "./components/Card";
import HelperDialog from "./components/HelperDialog";
import { useCard } from "./hooks/useCard";
import StatusIndicator from "./components/StatusIndicator";

export default function App() {
  const { cardNumber = 0, cardType = "", status = "pending" } = useCard()
  return (
    <Container>
      <StatusIndicator status={status} />
      <HelperDialog />
      <div className="fixed top-1/2 left-1/2 -translate-1/2 h-[90dvh] w-[90dvw] max-w-lg flex flex-col">
        <Card allowTapping type={cardType as CardType} number={cardNumber} />
      </div>
    </Container>
  );
}

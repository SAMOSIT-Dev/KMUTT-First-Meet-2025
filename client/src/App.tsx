import Container from "./components/Container";
import Card, { type CardType } from "./components/Card";
import HelperDialog from "./components/HelperDialog";
import { useCard } from "./hooks/useCard";
import StatusIndicator from "./components/StatusIndicator";

export default function App() {
  const { cardNumber, cardType, status } = useCard();

  return (
    <Container>
      <div className="fixed m-4 top-0 left-0">
        <StatusIndicator status={status ?? "pending"} />
      </div>
      <HelperDialog />
      <div className="fixed top-1/2 left-1/2 -translate-1/2 h-[90dvh] w-[90dvw] max-w-lg">
        <Card
          allowTapping={!!cardNumber && !!cardType}
          type={cardType as CardType}
          number={cardNumber}
        />
      </div>
    </Container>
  );
}

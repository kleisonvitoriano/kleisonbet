
import { Card } from "@/components/ui/card";

interface BalanceProps {
  amount: number;
}

export const Balance = ({ amount }: BalanceProps) => {
  return (
    <Card className="p-4 mb-6">
      <h2 className="text-sm font-medium text-muted-foreground">Seu Saldo</h2>
      <p className="text-2xl font-bold">R$ {amount.toFixed(2)}</p>
    </Card>
  );
};

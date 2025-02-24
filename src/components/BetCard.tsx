
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface BetCardProps {
  match: string;
  odds: number;
  onBet: (amount: number) => void;
}

export const BetCard = ({ match, odds, onBet }: BetCardProps) => {
  const [betAmount, setBetAmount] = useState("");

  const handleBet = () => {
    const amount = parseFloat(betAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Por favor, insira um valor válido");
      return;
    }
    onBet(amount);
    setBetAmount("");
    toast.success("Aposta realizada com sucesso!");
  };

  return (
    <Card className="bet-card">
      <h3 className="text-lg font-semibold mb-2">{match}</h3>
      <p className="text-sm text-muted-foreground mb-4">Odds: {odds}</p>
      <div className="space-y-4">
        <Input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          placeholder="Valor da aposta"
          className="w-full"
        />
        <Button onClick={handleBet} className="w-full">
          Apostar
        </Button>
      </div>
    </Card>
  );
};


import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface BetCardProps {
  match: string;
  odds: number;
  onBet: (amount: number, selection: string) => void;
}

export const BetCard = ({ match, odds, onBet }: BetCardProps) => {
  const [betAmount, setBetAmount] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const teams = match.split(" vs ");

  const handleBet = () => {
    const amount = parseFloat(betAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Por favor, insira um valor válido");
      return;
    }
    if (!selectedTeam) {
      toast.error("Por favor, selecione um time");
      return;
    }
    onBet(amount, selectedTeam);
    setBetAmount("");
    setSelectedTeam("");
    toast.success(`Aposta realizada com sucesso em ${selectedTeam}!`);
  };

  return (
    <Card className="bet-card">
      <h3 className="text-lg font-semibold mb-4">{match}</h3>
      <div className="space-y-4 mb-4">
        {teams.map((team) => (
          <div
            key={team}
            onClick={() => setSelectedTeam(team)}
            className={`team-selection p-3 rounded-lg border cursor-pointer ${
              selectedTeam === team ? "selected" : ""
            }`}
          >
            <p className="font-medium">{team}</p>
            <p className="text-sm text-muted-foreground">Odds: {odds}</p>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <Input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          placeholder="Valor da aposta"
          className="w-full bg-background/50"
        />
        <Button onClick={handleBet} className="w-full bg-primary hover:bg-primary/90">
          Apostar
        </Button>
      </div>
    </Card>
  );
};

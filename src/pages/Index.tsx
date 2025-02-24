
import { useState, useEffect } from "react";
import { BetCard } from "@/components/BetCard";
import { ExitModal } from "@/components/ExitModal";
import { Balance } from "@/components/Balance";

const INITIAL_BALANCE = 1000;
const MATCHES = [
  { id: 1, match: "Flamengo vs Corinthians", odds: 1.85 },
  { id: 2, match: "São Paulo vs Palmeiras", odds: 2.1 },
  { id: 3, match: "Santos vs Vasco", odds: 1.95 },
  { id: 4, match: "Grêmio vs Internacional", odds: 2.25 },
];

const Index = () => {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      setShowExitModal(true);
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const handleBet = (amount: number, selection: string) => {
    if (amount <= balance) {
      setBalance((prev) => prev - amount);
    }
  };

  const handleAddBalance = (amount: number) => {
    setBalance((prev) => prev + amount);
  };

  const handleExit = () => {
    window.location.href = "about:blank";
  };

  return (
    <div className="min-h-screen p-6 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl mb-8 text-center neon-title">Kleison Bet</h1>
      
      <Balance amount={balance} onAddBalance={handleAddBalance} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MATCHES.map((match) => (
          <BetCard
            key={match.id}
            match={match.match}
            odds={match.odds}
            onBet={handleBet}
          />
        ))}
      </div>

      <ExitModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleExit}
      />
    </div>
  );
};

export default Index;

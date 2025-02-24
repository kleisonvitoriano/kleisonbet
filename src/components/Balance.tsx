
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface BalanceProps {
  amount: number;
  onAddBalance: (amount: number) => void;
}

export const Balance = ({ amount, onAddBalance }: BalanceProps) => {
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const PIX_KEY = "kleissonvitoriano@gmail.com";

  const handleAddMoney = () => {
    const value = parseFloat(depositAmount);
    if (isNaN(value) || value <= 0) {
      toast.error("Por favor, insira um valor válido");
      return;
    }
    
    // Copy PIX key to clipboard
    navigator.clipboard.writeText(PIX_KEY);
    toast.success("Chave PIX copiada para a área de transferência!");
    
    onAddBalance(value);
    setDepositAmount("");
    setShowAddMoney(false);
  };

  return (
    <>
      <Card className="p-4 mb-6 relative">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Seu Saldo</h2>
            <p className="text-2xl font-bold">R$ {amount.toFixed(2)}</p>
          </div>
          <Button 
            onClick={() => setShowAddMoney(true)}
            className="bg-primary hover:bg-primary/90"
          >
            Adicionar Saldo
          </Button>
        </div>
      </Card>

      <Dialog open={showAddMoney} onOpenChange={setShowAddMoney}>
        <DialogContent className="glass-effect">
          <DialogHeader>
            <DialogTitle>Adicionar Saldo via PIX</DialogTitle>
            <DialogDescription className="space-y-4 mt-4">
              <div className="bg-muted/30 p-4 rounded-lg text-center">
                <p className="text-sm mb-2">Chave PIX:</p>
                <p className="font-mono bg-background/50 p-2 rounded select-all">{PIX_KEY}</p>
              </div>
              <div className="space-y-4 mt-4">
                <Input
                  type="number"
                  placeholder="Valor do depósito"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="bg-background/50"
                />
                <div className="flex flex-col gap-2">
                  <Button onClick={handleAddMoney} className="w-full">
                    Confirmar Depósito
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddMoney(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

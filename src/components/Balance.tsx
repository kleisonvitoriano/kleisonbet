
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
  const [step, setStep] = useState<"input" | "confirmation">("input");
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
    setStep("confirmation");
  };

  const handleConfirmTransfer = () => {
    const value = parseFloat(depositAmount);
    onAddBalance(value);
    setDepositAmount("");
    setShowAddMoney(false);
    setStep("input");
    toast.success("Depósito confirmado com sucesso!");
  };

  const handleClose = () => {
    setShowAddMoney(false);
    setStep("input");
    setDepositAmount("");
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

      <Dialog open={showAddMoney} onOpenChange={handleClose}>
        <DialogContent className="glass-effect">
          <DialogHeader>
            <DialogTitle>Adicionar Saldo via PIX</DialogTitle>
            <DialogDescription className="space-y-4 mt-4">
              {step === "input" ? (
                <>
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
                        Copiar Chave e Prosseguir
                      </Button>
                      <Button variant="outline" onClick={handleClose}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                    <p className="text-center font-medium">Valor a ser depositado:</p>
                    <p className="text-2xl text-center font-bold">R$ {parseFloat(depositAmount).toFixed(2)}</p>
                  </div>
                  <div className="space-y-3 text-center">
                    <p className="text-sm">Por favor, realize o PIX para a chave:</p>
                    <p className="font-mono bg-background/50 p-2 rounded select-all">{PIX_KEY}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-center text-muted-foreground">
                      Após realizar o PIX, clique em "Confirmar Transferência"
                    </p>
                    <div className="flex flex-col gap-2">
                      <Button onClick={handleConfirmTransfer} className="w-full">
                        Confirmar Transferência
                      </Button>
                      <Button variant="outline" onClick={handleClose}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

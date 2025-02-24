
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ExitModal = ({ isOpen, onClose, onConfirm }: ExitModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-effect">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Já vai embora?</DialogTitle>
          <DialogDescription className="mt-4 text-center space-y-4">
            <p className="text-lg">Não vá ainda... A sorte pode estar ao seu lado!</p>
            <p className="text-sm text-muted-foreground">Temos mais jogos incríveis esperando por você.</p>
            <img 
              src="/lovable-uploads/6444767d-4288-4f0e-9423-5f17e5205045.png" 
              alt="Minerador quase chegando ao tesouro"
              className="w-full max-w-md mx-auto rounded-lg my-4"
            />
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-4 mt-6">
          <Button variant="outline" onClick={onClose}>
            Continuar jogando
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Sair
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

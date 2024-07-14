import { ArrowRight, UserRoundPlus } from "lucide-react";

interface InviteGuestsModalProps {
    openGuestModal: () => void
    emailsToInvite: string[]
    openConfirmModal: () => void
}

export function InviteGuestStep({emailsToInvite, openConfirmModal, openGuestModal}: InviteGuestsModalProps) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <button type="button" onClick={openGuestModal} className="flex items-center gap-2 flex-1">
                <UserRoundPlus className="size-5 text-zinc-400"/>
                {emailsToInvite.length > 0 ? (
                  <span className="text-zinc-100 text-lg flex-1 text-left">{emailsToInvite.length} pessoas convidadas</span>
                ): (
                  <span className="text-zinc-400 text-lg flex-1 text-left">Quem estará na viagem?</span>
                )}                
            </button>         

            <button onClick={openConfirmModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">            
                Confirmar viagem
                <ArrowRight className="size-5" />
            </button>
        </div>  
    )
}
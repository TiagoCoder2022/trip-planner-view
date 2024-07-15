import { Calendar, Tag, X } from "lucide-react";

interface CreateActivityModalProps {
    closeCreateActiveModal: () => void
}

export function CreateActivityModal({closeCreateActiveModal}: CreateActivityModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
                        <button type="button" onClick={closeCreateActiveModal}>
                            <X className="size-5"/>
                        </button>
                    </div>
                    <p className="text-zinc-400 text-sm">
                            Todos os convidados podem vizualizar as atividades.
                    </p>
                </div>                   
        
                <form className="space-y-3">
                    <div className="h-12 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Tag className="text-zinc-400"/>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="Qual a sua atividade?" 
                            className="bg-transparent text-lg placehoder-zinc-400 outline-none flex-1"
                        />              
                    </div>
        
                    <div className="flex items-center gap-2">
                                
                        <div className="h-12 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                            <Calendar className="text-zinc-400"/>
                            <input 
                                type="datetime-local" 
                                name="occurs_at" 
                                placeholder="Horário" 
                                className="bg-transparent text-lg placehoder-zinc-400 outline-none flex-1"
                            />              
                        </div>                                
                    </div>
        
                    <button 
                        type="submit"                          
                        className="bg-lime-300 text-lime-950 w-full rounded-lg px-5 h-12 font-medium flex items-center justify-center gap-2 hover:bg-lime-400"
                    >            
                        Salvar atividade              
                    </button>
                </form>
            </div>
        </div>
    )
}
import { Calendar, MapPin, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";


interface UpdateDestinationAndDatesStepProps {    
    closeCreateActiveModal: () => void   
}

export function UpdateTripModal({closeCreateActiveModal}: UpdateDestinationAndDatesStepProps) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()
    const { tripId } = useParams()

    function openDatePicker() {
        return setIsDatePickerOpen(true)
    } 
    
    function closeDatePicker() {
        return setIsDatePickerOpen(false)
    }    

    async function updateActivity(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const data = new FormData(e.currentTarget);
    
            if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
                return alert('Selecione uma data');
            }        
    
            const destination = data.get('destination')?.toString();
            
            await api.put(`/trips/${tripId}`, {
                destination,
                starts_at: eventStartAndEndDates?.from,
                ends_at: eventStartAndEndDates?.to,
            });
            
            window.document.location.reload();
        } catch (error) {
            console.error("Failed to update activity:", error);
            alert('Ocorreu um erro ao atualizar a atividade. Tente novamente.');
        }
    }

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
   ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL")) 
   : null

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Atualizar viagem</h2>
                        <button type="button" onClick={closeCreateActiveModal}>
                            <X className="size-5"/>
                        </button>
                    </div>
                    <p className="text-zinc-400 text-sm">
                        Informe o destino e as datas.
                    </p>
                </div>                   
        
                <form onSubmit={updateActivity} className="space-y-3">
                    <div className="h-12 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <MapPin className="size-5 text-zinc-400"/>
                        <input 
                            type="text" 
                            name="destination" 
                            placeholder="Qual o destino?" 
                            className="bg-transparent text-lg placehoder-zinc-400 outline-none flex-1"
                        />              
                    </div>
        
                    <div className="h-12 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">              
                        <button 
                            onClick={openDatePicker}
                            type="button"                                       
                            className="flex items-center gap-2 text-left w-[260px]"
                        >
                            <Calendar className="size-5 text-zinc-400"/>
                            <span className="text-lg text-zinc-400 w-40 flex-1">
                                {displayedDate || 'Quando?'}
                            </span>
                        </button>
                    </div>

                    { isDatePickerOpen && (
                        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg font-semibold">Selecione a data</h2>
                                        <button type="button" onClick={closeDatePicker}>
                                            <X className="size-5"/>
                                        </button>
                                    </div>                          
                                </div>                   
                
                                <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates}/>
                            </div>
                        </div>
                    )}      
                    
                    <Button variant="primary" size="full">
                        Atualizar viagem                   
                    </Button>
                </form>
            </div>
        </div>
    )
}
import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format, parseISO } from "date-fns";

interface Trip {
    id: string;
    destination: string;
    startsAt: string;
    endsAt: string;
    is_confirmed: boolean;
}

export function DestinationAndDateHeader() {
    const [trip, setTrip] = useState<Trip | undefined>(undefined);
    const { tripId } = useParams();

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await api.get(`/trips/${tripId}`);
               
                setTrip(response.data);
                
            } catch (error) {
                console.error("Failed to fetch trip:", error);
            }
        };

        fetchTrip();
    }, [tripId]);      
    
    const displayedDate = trip
        ? format(parseISO(trip.startsAt), "dd' de 'LLL").concat(' até ').concat(format(parseISO(trip.endsAt), "dd' de 'LLL"))
        : null;

    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                <span className="text-zinc-100">{trip?.destination}</span>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400" />
                    <span className="text-zinc-100">{displayedDate}</span>
                </div>

                <div className="w-px h-6 bg-zinc-800"></div>

                <Button variant="secondary">
                    Alterar local/data
                    <Settings2 className="size-5" />
                </Button>
            </div>
        </div>
    );
}

import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format, parseISO } from "date-fns";
import { UpdateTripModal } from "./update-trip-modal";
import { useDetailsContext } from "../contex/details-context"; 

export function DestinationAndDateHeader() {
    const { trip, setTrip } = useDetailsContext();
    const [isUpdateTripModalOpen, setIsUpdateTripModalOpen] = useState(false);
    
    const { tripId } = useParams();

    function openUpdateTripModal() {
        setIsUpdateTripModalOpen(true);
    }

    function closeUpdateTripModal() {
        setIsUpdateTripModalOpen(false);
    }

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
    }, [tripId, setTrip]);     
    
    const displayedDate = trip
        ? format(parseISO(trip.startsAt), "dd'/'MM").concat(' - ').concat(format(parseISO(trip.endsAt), "dd'/'MM"))
        : null;

    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center md:gap-2 gap-1">
                <MapPin className="size-4 text-zinc-400" />
                <span className="text-zinc-100 text-md md:text-lg overflow-hidden whitespace-nowrap text-ellipsis">{trip?.destination}</span>
            </div>

            <div className="flex items-center md:gap-5 gap-3">
                <div className="flex items-center md:gap-2 gap-1">
                    <Calendar className="size-4 md:size-5 text-zinc-400" />
                    <span className="text-zinc-100 text-md md:text-lg overflow-hidden whitespace-nowrap text-ellipsis">{displayedDate}</span>
                </div>

                <div className="w-px h-6 bg-zinc-800 hidden md:inline"></div>

                <Button onClick={openUpdateTripModal} variant="secondary">
                    <span className="hidden md:inline">Alterar local/data</span>
                    <Settings2 className="size-5" />
                </Button>
            </div>

            {isUpdateTripModalOpen && (
                <UpdateTripModal closeCreateActiveModal={closeUpdateTripModal} />
            )}
        </div>
    );
}

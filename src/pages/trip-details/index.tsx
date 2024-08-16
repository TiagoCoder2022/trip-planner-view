import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { useDetailsContext } from "../contex/details-context";  
import { useParams } from 'react-router-dom';

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
  const { fetchTripDetails } = useDetailsContext();
  const { tripId } = useParams();

  useEffect(() => {
    if (tripId) {
      fetchTripDetails(tripId);
    }
  }, [tripId, fetchTripDetails]);

  function openCreateActiveModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActiveModal() {
    setIsCreateActivityModalOpen(false);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex  flex-wrap gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex flex-wrap lg:flex-nowrap justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <button              
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
              onClick={openCreateActiveModal}
            >
              Cadastrar atividade
              <Plus className="size-5" />
            </button>
          </div>

          <Activities />
        </div>

        <div className="w-full md:w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal closeCreateActiveModal={closeCreateActiveModal} />
      )}
    </div>
  );
}

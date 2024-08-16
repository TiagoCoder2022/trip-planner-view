import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Trip } from "../../types/trip";
import { api } from "../../lib/axios";

// Define a interface para atividades (suponha um tipo básico para ilustração)
interface Activity {
  id: string;
  name: string;
  date: string;
}

// Atualiza a interface do contexto para incluir atividades
interface DetailsContextType {
  trip: Trip | undefined;
  activities: Activity[];
  setTrip: React.Dispatch<React.SetStateAction<Trip | undefined>>;
  fetchTripDetails: (tripId: string) => void;
}

const DetailsContext = createContext<DetailsContextType | undefined>(undefined)

// Cria um hook personalizado para acessar o contexto
export const useDetailsContext = () => {
    const context = useContext(DetailsContext)
    if (!context) {
        throw new Error("useDetailsContext must be used within a DetailsProvider")
    }
    return context
}

interface DetailsProviderProps {
  children: ReactNode;
}

export const DetailsProvider: React.FC<DetailsProviderProps> = ({ children }) => {
    const [trip, setTrip] = useState<Trip | undefined>(undefined)
    const [activities, setActivities] = useState<Activity[]>([])

    const fetchTripDetails = useCallback(async (tripId: string) => {
        try {
            const response = await api.get(`/trips/${tripId}`)
            setTrip(response.data);
            setActivities(response.data.activities || [])
        } catch (error) {
            console.error("Failed to fetch trip details:", error)
        }
    }, [])

    return (
        <DetailsContext.Provider value={{ trip, activities, setTrip, fetchTripDetails }}>
            {children}
        </DetailsContext.Provider>
    )
}

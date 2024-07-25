import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
    id: string;
    title: string;
    occursAt: string;
}

export function Activities() {
    const { tripId } = useParams();
    const [activities, setActivities] = useState<Activity[] | undefined>(undefined);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await api.get(`/trips/${tripId}/activities`);
                
                setActivities(response.data);
            } catch (error) {
                console.error("Failed to fetch activities:", error);
            }
        };
       
        fetchActivities();
    }, [tripId]);
   
    return (
        <div className="space-y-8">
            {activities?.map(activity => {                
                const activityTime = parseISO(activity.occursAt);
                const activityDate = format(activityTime, 'dd');
                const activityDay = format(activityTime, 'EEEE, dd MMMM', { locale: ptBR });

                return (
                    <div key={activity.id} className="space-y-2.5">
                        <div className="flex gap-2 items-baseline">
                            <span className="text-xl text-zinc-300 font-semibold">
                                Dia {activityDate}
                            </span>
                            <span className="text-xs text-zinc-500">
                                {activityDay}
                            </span>
                        </div>
                        <div className="space-y-2.5">
                            <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                <CircleCheck className="size-5 text-lime-300" />
                                <span className="text-zinc-100">{activity.title}</span>
                                <span className="text-zinc-400 text-sm ml-auto">
                                    {format(activityTime, 'HH:mm')}h
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}                                    
        </div>
    );
}

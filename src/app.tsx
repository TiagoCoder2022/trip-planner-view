import { createBrowserRouter, RouterProvider,  } from "react-router-dom"
import { CreateTripPage } from "./pages/create-trip"
import { TripDetailsPage } from "./pages/trip-details"
import { DetailsProvider}  from "./pages/contex/details-context"

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />
  }
])

export function App () {
  return (
    <DetailsProvider>
      <RouterProvider router={router} />
    </DetailsProvider>
  )
}
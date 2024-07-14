import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InviteGuestsModal } from "./invite-guests-modal"
import { ConfirmTripModal } from "./confirm-trip-modal"
import { DestinationAndDatesStep } from "./steps/destination-and-date-step"
import { InviteGuestStep } from "./steps/invite-guest-step"

export function CreateTripPage() {
    const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
    const [emailsToInvite, setEmailsToInvite] = useState(['darth@vader.com'])
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

    const navigate = useNavigate() 

  function openGuestInput() {
    setIsGuestInputOpen(true)
  }

  function closeGuestInput() {
    setIsGuestInputOpen(false)
  }

  function openGuestModal() {
    setIsGuestModalOpen(true)
  }

  function closeGuestModal() {
    setIsGuestModalOpen(false)
  }  

  function openConfirmModal() {
    setIsConfirmModalOpen(true)
  }

  function closeConfirmModal() {
    setIsConfirmModalOpen(false)
  }

  function addNewEmailToInvite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = data.get('email')?.toString()

    if(!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])

    e.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email != emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  function createTrip(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    navigate("/trips/123")
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
        <div className="max-w-3xl w-full px-6 text-center space-y-10">
            <div className="flex flex-col items-center gap-3">
                <img src="/logo.svg" alt="Planner" />
                <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
            </div>

            <div className="space-y-4">
                <DestinationAndDatesStep 
                    closeGuestInput={closeGuestInput} 
                    openGuestInput={openGuestInput} 
                    isGuestInputOpen={isGuestInputOpen}
                />

                {isGuestInputOpen && (
                    <InviteGuestStep 
                        emailsToInvite={emailsToInvite} 
                        openConfirmModal={openConfirmModal} 
                        openGuestModal={openGuestModal}
                    />
                )}
            </div>

            <p className="text-sm text-zinc-500">
                Ao planejar sua viagem pela planner você automaticamente concorda <br/>
                com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>
            </p>
        </div>
        {isGuestModalOpen && (
            <InviteGuestsModal 
                emailsToInvite={emailsToInvite}
                addNewEmailToInvite={addNewEmailToInvite}
                closeGuestModal={closeGuestModal}
                removeEmailFromInvites={removeEmailFromInvites} 
                openGuestInput={openGuestInput}       
            />
        )}

        {isConfirmModalOpen && (
            <ConfirmTripModal
                closeConfirmModal={closeConfirmModal}
                createTrip={createTrip}
            />
      )}      
    </div>
  )
}
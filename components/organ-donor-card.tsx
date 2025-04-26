import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Heart } from "lucide-react"

interface OrganDonorCardProps {
  donor: {
    _id: string
    fullName: string
    email: string
    phone: string
    location?: string
    address: string
    organPreferences: string[]
    dateOfBirth: string
    isAvailable?: boolean
  }
}

export default function OrganDonorCard({ donor }: OrganDonorCardProps) {
  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const age = donor.dateOfBirth ? calculateAge(donor.dateOfBirth) : "N/A"
  const location = donor.location || donor.address?.split(",").slice(-2).join(", ") || "Unknown location"

  // Format organ preferences for display
  const organsList = donor.organPreferences?.includes("all")
    ? "All organs"
    : donor.organPreferences?.join(", ") || "Not specified"

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="flex items-center p-4 border-b">
        <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mr-4">
          <Heart className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{donor.fullName}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{location}</span>
          </div>
        </div>
        <div className="ml-auto">
          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Organ Donor
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-2">Age: {age} years</p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Organs: </span>
          {organsList}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0 gap-2">
        {donor.phone && (
          <Button variant="outline" size="sm" className="flex-1">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
        )}
        <Button variant="outline" size="sm" className="flex-1">
          <Mail className="h-4 w-4 mr-2" />
          Email
        </Button>
        <Link href={`/profile/organ/${donor._id}`} className="flex-1">
          <Button variant="default" size="sm" className="w-full">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

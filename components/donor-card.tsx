import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"

interface DonorCardProps {
  donor: {
    _id: string
    name: string
    bloodType: string
    location: string
    phone?: string
    email: string
    lastDonation?: string
    isDonor: boolean
  }
}

export default function DonorCard({ donor }: DonorCardProps) {
  const bloodTypeColors: Record<string, string> = {
    "A+": "bg-red-600",
    "A-": "bg-red-700",
    "B+": "bg-blue-600",
    "B-": "bg-blue-700",
    "AB+": "bg-purple-600",
    "AB-": "bg-purple-700",
    "O+": "bg-green-600",
    "O-": "bg-green-700",
  }

  const bgColor = bloodTypeColors[donor.bloodType] || "bg-gray-600"

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="flex items-center p-4 border-b">
        <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center mr-4`}>
          <span className="text-white font-bold">{donor.bloodType}</span>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{donor.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{donor.location}</span>
          </div>
        </div>
        <div className="ml-auto">
          <span
            className={`px-2 py-1 rounded-full text-xs ${donor.isDonor ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
          >
            {donor.isDonor ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        {donor.lastDonation && (
          <p className="text-sm text-muted-foreground mb-2">
            Last donation: {new Date(donor.lastDonation).toLocaleDateString()}
          </p>
        )}
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
        <Link href={`/profile/${donor._id}`} className="flex-1">
          <Button variant="default" size="sm" className="w-full">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

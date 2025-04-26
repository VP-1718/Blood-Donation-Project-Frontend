"use client"

import { useState, useEffect } from "react"
import { getUserProfile } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Loader2, Phone, Mail, MapPin, Calendar } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DonorProfilePage({ params }: { params: { id: string } }) {
  const [donor, setDonor] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDonorProfile = async () => {
      setLoading(true)
      try {
        const data = await getUserProfile(params.id)
        setDonor(data)
        setError(null)
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load donor profile.")
      } finally {
        setLoading(false)
      }
    }

    fetchDonorProfile()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    )
  }

  if (error || !donor) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error || "Donor not found"}</AlertDescription>
      </Alert>
    )
  }

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
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center`}>
            <span className="text-white text-xl font-bold">{donor.bloodType}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{donor.name}</h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{donor.location}</span>
            </div>
          </div>
          <div className="ml-auto">
            <span
              className={`px-3 py-1 rounded-full text-sm ${donor.isDonor ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
            >
              {donor.isDonor ? "Available Donor" : "Not Available"}
            </span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="info">
        <TabsList className="mb-6">
          <TabsTrigger value="info">Donor Information</TabsTrigger>
          <TabsTrigger value="history">Donation History</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Contact Information</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donor.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p>{donor.phone}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{donor.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p>{donor.location}</p>
                  </div>
                </div>

                {donor.lastDonation && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Last Donation</p>
                      <p>{new Date(donor.lastDonation).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex gap-4">
                {donor.phone && (
                  <Button className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                )}
                <Button className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Donation History</h2>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">No donation records available</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

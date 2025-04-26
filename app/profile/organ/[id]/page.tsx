"use client"

import { useState, useEffect } from "react"
import { getUserProfile } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Loader2, Phone, Mail, MapPin, Calendar, Heart } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function OrganDonorProfilePage({ params }: { params: { id: string } }) {
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

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return "N/A"

    const birthDate = new Date(dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const age = calculateAge(donor.dateOfBirth)
  const location = donor.location || donor.address?.split(",").slice(-2).join(", ") || "Unknown location"

  // Format organ preferences for display
  const organsList = donor.organPreferences?.includes("all")
    ? "All organs and tissues"
    : donor.organPreferences?.join(", ") || "Not specified"

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{donor.fullName}</h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
          </div>
          <div className="ml-auto">
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Organ Donor
            </span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="info">
        <TabsList className="mb-6">
          <TabsTrigger value="info">Donor Information</TabsTrigger>
          <TabsTrigger value="medical">Medical Information</TabsTrigger>
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
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p>{donor.address}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p>
                      {donor.dateOfBirth ? new Date(donor.dateOfBirth).toLocaleDateString() : "Not provided"} (Age:{" "}
                      {age})
                    </p>
                  </div>
                </div>
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

        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Donation Information</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Organs for Donation</h3>
                  <p>{organsList}</p>
                </div>

                {donor.medicalConditions && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Medical Conditions</h3>
                    <p>{donor.medicalConditions}</p>
                  </div>
                )}

                {donor.emergencyContact && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Emergency Contact</h3>
                    <p>{donor.emergencyContact}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

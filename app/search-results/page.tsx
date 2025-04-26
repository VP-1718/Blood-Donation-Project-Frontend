"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getDonors } from "@/lib/api"
import DonorCard from "@/components/donor-card"
import { Loader2 } from "lucide-react"

interface Donor {
  _id: string
  name: string
  bloodType: string
  location: string
  phone?: string
  email: string
  lastDonation?: string
  available: boolean
}

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const [donors, setDonors] = useState<Donor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)

      const params: any = {}
      if (searchParams.get("bloodType")) params.bloodType = searchParams.get("bloodType")
      if (searchParams.get("location")) params.location = searchParams.get("location")
      if (searchParams.get("search")) params.search = searchParams.get("search")

      try {
        const data = await getDonors(params)
        setDonors(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch search results. Please try again.")
        setDonors([])
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {searchParams.get("bloodType") && (
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
              Blood Type: {searchParams.get("bloodType")}
            </div>
          )}
          {searchParams.get("location") && (
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
              Location: {searchParams.get("location")}
            </div>
          )}
          {searchParams.get("search") && (
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
              Search: {searchParams.get("search")}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg">{error}</div>
      ) : donors.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No donors found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <DonorCard key={donor._id} donor={donor} />
          ))}
        </div>
      )}
    </div>
  )
}

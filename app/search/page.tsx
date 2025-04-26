"use client"

import { useState, useEffect } from "react"
import { getDonors } from "@/lib/api"
import DonorCard from "@/components/donor-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Search } from "lucide-react"

interface Donor {
  _id: string
  name: string
  bloodType: string
  location: string
  phone?: string
  email: string
  lastDonation?: string
  available: boolean
  isDonor: string
}

export default function SearchPage() {
  const [donors, setDonors] = useState<Donor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [bloodTypeFilter, setBloodTypeFilter] = useState<string>("")
  const [locationFilter, setLocationFilter] = useState<string>("")

  useEffect(() => {
    fetchDonors()
  }, [])

  const fetchDonors = async () => {
    setLoading(true)
    try {
      const data = await getDonors()
      setDonors(data)
      setError(null)
    } catch (err) {
      setError("Failed to fetch donors. Please try again later.")
      setDonors([])
    } finally {
      setLoading(false)
    }
  }

  const fetchOrganDonors = async () => {
    setLoading(true)
    try {
      const data = await getDonors()
      setDonors(data)
      setError(null)
    } catch (err) {
      setError("Failed to fetch donors. Please try again later.")
      setDonors([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    setLoading(true)
    try {
      const params: any = {}
      if (searchTerm) params.search = searchTerm
      if (bloodTypeFilter) params.bloodType = bloodTypeFilter
      if (locationFilter) params.location = locationFilter

      const data = await getDonors(params)
      setDonors(data)
      setError(null)
    } catch (err) {
      setError("Search failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const filteredDonors = donors.filter(
    (donor) =>
      (bloodTypeFilter ? bloodTypeFilter === "all" || donor.bloodType === bloodTypeFilter : true) &&
      (locationFilter ? donor.location.toLowerCase().includes(locationFilter.toLowerCase()) : true) &&
      (searchTerm
        ? donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donor.location.toLowerCase().includes(searchTerm.toLowerCase())
        : true),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Find Blood Donors</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name or location"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Blood Type</label>
              <Select value={bloodTypeFilter} onValueChange={setBloodTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All blood types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blood Types</SelectItem>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input
                type="text"
                placeholder="Filter by location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg">{error}</div>
      ) : filteredDonors.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No donors found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
            <DonorCard key={donor._id} donor={donor} />
          ))}
        </div>
      )}
    </div>
  )
}

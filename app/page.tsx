import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Donate Blood, <span className="text-red-600">Save Lives</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Connect with blood donors in your area and help save lives. Register as a donor or find donors when you
                need them most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Become a Donor
                  </Button>
                </Link>
                <Link href="/search">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Find Donors
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Blood Donation"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blood Types Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Blood Types & Compatibility</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding blood types is crucial for successful transfusions. Find out which blood types are
              compatible with yours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { type: "A+", canReceiveFrom: "A+, A-, O+, O-", canDonateTo: "A+, AB+" },
              { type: "A-", canReceiveFrom: "A-, O-", canDonateTo: "A+, A-, AB+, AB-" },
              { type: "B+", canReceiveFrom: "B+, B-, O+, O-", canDonateTo: "B+, AB+" },
              { type: "B-", canReceiveFrom: "B-, O-", canDonateTo: "B+, B-, AB+, AB-" },
              { type: "AB+", canReceiveFrom: "All Blood Types", canDonateTo: "AB+" },
              { type: "AB-", canReceiveFrom: "A-, B-, AB-, O-", canDonateTo: "AB+, AB-" },
              { type: "O+", canReceiveFrom: "O+, O-", canDonateTo: "A+, B+, AB+, O+" },
              { type: "O-", canReceiveFrom: "O-", canDonateTo: "All Blood Types" },
            ].map((bloodType) => (
              <div
                key={bloodType.type}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{bloodType.type}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-4">Type {bloodType.type}</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Can receive from:</span> {bloodType.canReceiveFrom}
                  </p>
                  <p>
                    <span className="font-medium">Can donate to:</span> {bloodType.canDonateTo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Donate Blood?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your donation can make a significant impact on someone's life. Here's why you should consider donating
              blood.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Save Lives",
                description:
                  "One donation can save up to three lives. Blood is needed every two seconds for emergencies and regular treatments.",
                icon: "❤️",
              },
              {
                title: "Health Benefits",
                description:
                  "Donating blood can help reduce the risk of heart disease and cancer. It also helps in maintaining good health.",
                icon: "🩺",
              },
              {
                title: "Community Impact",
                description:
                  "By donating blood, you're directly contributing to your community's health and emergency preparedness.",
                icon: "🏙️",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organ Donation Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Organ Donation"
                className="rounded-lg object-cover w-full h-[300px]"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-3xl font-bold">
                Become an <span className="text-red-600">Organ Donor</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Beyond blood donation, you can make an even bigger impact by registering as an organ donor. One organ
                donor can save up to eight lives and enhance many more.
              </p>
              <Link href="/organ-donation">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of blood donors today and help save lives in your area.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button size="lg" variant="secondary">
                Register Now
              </Button>
            </Link>
            <Link href="/search">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white hover:bg-white hover:text-red-600"
              >
                Find Donors
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

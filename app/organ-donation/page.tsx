"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { registerOrganDonor } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle, Heart, Leaf, Clock, Users } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const organDonorSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  dateOfBirth: z.string().min(1, {
    message: "Date of birth is required.",
  }),
  address: z.string().min(5, {
    message: "Please enter your complete address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  emergencyContact: z.string().min(5, {
    message: "Please provide an emergency contact.",
  }),
  medicalConditions: z.string().optional(),
  organPreferences: z.array(z.string()).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to organ donation.",
  }),
})

const organOptions = [
  { id: "kidneys", label: "Kidneys" },
  { id: "liver", label: "Liver" },
  { id: "heart", label: "Heart" },
  { id: "lungs", label: "Lungs" },
  { id: "pancreas", label: "Pancreas" },
  { id: "intestines", label: "Intestines" },
  { id: "corneas", label: "Corneas" },
  { id: "tissue", label: "Tissue" },
  { id: "all", label: "All organs and tissues" },
]

export default function OrganDonationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof organDonorSchema>>({
    resolver: zodResolver(organDonorSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      address: "",
      phone: "",
      email: "",
      emergencyContact: "",
      medicalConditions: "",
      organPreferences: ["all"],
      consent: false,
    },
  })

  async function onSubmit(values: z.infer<typeof organDonorSchema>) {
    setIsSubmitting(true)
    setError(null)

    try {
      // Here you would connect to your backend API
      // For now, we'll simulate a successful submission
      const { ...userData } = values
      const res = await registerOrganDonor(userData)
      console.log("backend response:", res)

      toast({
        title: "Registration successful!",
        description: "Thank you for registering as an organ donor.",
      })

      form.reset()
    } catch (err: any) {
      console.log(err)
      setError("Registration failed. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTabChange = (value: string) => {
    // This is a workaround for the tab click handler
    if (value === "register") {
      // You can add any logic here if needed
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Organ Donation</h1>

      <Tabs defaultValue="about" onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="about">About Organ Donation</TabsTrigger>
          <TabsTrigger value="register">Register as Donor</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Why Become an Organ Donor?</h2>
              <p className="text-muted-foreground mb-4">
                Organ donation is a selfless act that can save and improve the lives of many people. One organ donor can
                save up to eight lives and enhance the lives of up to 75 others through tissue donation.
              </p>
              <p className="text-muted-foreground mb-4">
                By registering as an organ donor, you're giving hope to thousands of people awaiting transplants. Your
                decision today could be the miracle someone is waiting for tomorrow.
              </p>

              <div className="mt-6">
                <Button
                  size="lg"
                  onClick={() => {
                    const registerTab = document.querySelector('[data-value="register"]') as HTMLElement
                    if (registerTab) registerTab.click()
                  }}
                >
                  Register Now
                </Button>
              </div>
            </div>

            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Organ Donation"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
            {[
              {
                icon: <Heart className="h-10 w-10 text-red-600" />,
                title: "Save Lives",
                description: "One organ donor can save up to eight lives through organ donation.",
              },
              {
                icon: <Leaf className="h-10 w-10 text-green-600" />,
                title: "Legacy of Life",
                description: "Your decision creates a lasting legacy of generosity and compassion.",
              },
              {
                icon: <Clock className="h-10 w-10 text-blue-600" />,
                title: "Critical Need",
                description: "Every 10 minutes, someone is added to the organ transplant waiting list.",
              },
              {
                icon: <Users className="h-10 w-10 text-purple-600" />,
                title: "Help Many",
                description: "Beyond organs, tissue donation can enhance the lives of up to 75 people.",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Did You Know?</h3>
            <p className="text-muted-foreground">
              More than 100,000 people are waiting for an organ transplant in the United States alone. Unfortunately, 17
              people die each day while waiting for an organ transplant. Your registration as an organ donor could help
              reduce this number and save precious lives.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Organ Donor Registration</CardTitle>
              <CardDescription>
                Register your intent to become an organ donor. This information will be kept confidential.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Your full address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact</FormLabel>
                          <FormControl>
                            <Input placeholder="Name and phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="medicalConditions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medical Conditions (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="List any medical conditions that might be relevant" {...field} />
                          </FormControl>
                          <FormDescription>
                            This information helps medical professionals make informed decisions.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <FormLabel>Organs and Tissues for Donation</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {organOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="organPreferences"
                            render={({ field }) => {
                              return (
                                <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), option.id])
                                          : field.onChange(field.value?.filter((value) => value !== option.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{option.label}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>I consent to organ and tissue donation</FormLabel>
                            <FormDescription>
                              I understand that by registering, I am giving consent for the donation of my organs and
                              tissues after my death.
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Register as Organ Donor"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about organ donation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  question: "Who can be an organ donor?",
                  answer:
                    "People of all ages and medical histories should consider themselves potential donors. Your medical condition at the time of death will determine what organs and tissues can be donated.",
                },
                {
                  question: "Does my religion support organ donation?",
                  answer:
                    "Most major religions support organ donation and consider it an act of charity and goodwill. If you're unsure, consult with your religious leader.",
                },
                {
                  question: "Will doctors try less hard to save me if they know I'm a donor?",
                  answer:
                    "No. Doctors and emergency personnel have one priority: to save your life. Organ donation is only considered after all lifesaving efforts have failed and death has been declared.",
                },
                {
                  question: "Will organ donation affect my funeral arrangements?",
                  answer:
                    "No. Organ donation doesn't interfere with having an open-casket funeral. The body is treated with respect and dignity throughout the donation process.",
                },
                {
                  question: "Is there a cost to my family for organ donation?",
                  answer:
                    "No. The donor's family pays for medical care and funeral costs, but all costs related to organ donation are paid by the recipient or their insurance.",
                },
                {
                  question: "Can I specify which organs I want to donate?",
                  answer:
                    "Yes. You can specify which organs and tissues you wish to donate during the registration process.",
                },
                {
                  question: "Can I change my mind about being a donor?",
                  answer:
                    "Yes. You can change or revoke your decision at any time by updating your donor registration.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

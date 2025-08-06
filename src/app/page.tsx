"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Menu, User, Heart, MapPin, Bed, Bath, Square, Phone, Mail, Calendar, Home, Car, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

// Mock property data
const featuredProperties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    price: "$2,450,000",
    location: "Beverly Hills, CA",
    beds: 5,
    baths: 4,
    sqft: "4,200",
    image: "https://ugc.same-assets.com/q9x2j0WuLKoy7YS2Cg901l6v9MNeMAa5.jpeg",
    status: "For Sale",
    type: "Single Family"
  },
  {
    id: 2,
    title: "Contemporary Estate",
    price: "$1,850,000",
    location: "Malibu, CA",
    beds: 4,
    baths: 3,
    sqft: "3,800",
    image: "https://ugc.same-assets.com/JgEsd6gYnCySW6Puie441ijfM8Y_uDfn.jpeg",
    status: "For Sale",
    type: "Single Family"
  },
  {
    id: 3,
    title: "Luxury Modern Home",
    price: "$3,200,000",
    location: "Los Angeles, CA",
    beds: 6,
    baths: 5,
    sqft: "5,500",
    image: "https://ugc.same-assets.com/d9E0mqJ_y2bSYcSxbjUy-Tt4LMWRp6cO.jpeg",
    status: "For Sale",
    type: "Single Family"
  },
  {
    id: 4,
    title: "Designer Villa",
    price: "$2,950,000",
    location: "Santa Monica, CA",
    beds: 5,
    baths: 4,
    sqft: "4,800",
    image: "https://ugc.same-assets.com/MXg-nEFmwZbGOKm_RbkqeUESPqnr5pi4.jpeg",
    status: "For Sale",
    type: "Single Family"
  },
  {
    id: 5,
    title: "Stunning Modern Estate",
    price: "$4,100,000",
    location: "Manhattan Beach, CA",
    beds: 7,
    baths: 6,
    sqft: "6,200",
    image: "https://ugc.same-assets.com/y2x6N3IzOb72NCCSYcGnvQjvLWMxJjiF.jpeg",
    status: "For Sale",
    type: "Single Family"
  },
  {
    id: 6,
    title: "Architectural Masterpiece",
    price: "$3,750,000",
    location: "Pasadena, CA",
    beds: 6,
    baths: 5,
    sqft: "5,800",
    image: "https://ugc.same-assets.com/zdPxllhImvqTKB11I9XM9d0Jm4651_sI.jpeg",
    status: "For Sale",
    type: "Single Family"
  }
]

export default function HomePage() {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const { data: session, status } = useSession()
  console.log("!!!session:", session, "status:", status)
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">realtor.com</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost">Buy</Button>
            <Button variant="ghost">Rent</Button>
            <Button variant="ghost">Sell</Button>
            <Button variant="ghost">Home Loans</Button>
            <Button variant="ghost">Find Realtors</Button>
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Saved Homes
            </Button>

            {status === "loading" ? (
              <Button variant="ghost" size="sm" disabled>
                Loading...
              </Button>
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback>
                        {session.user?.name ? getUserInitials(session.user.name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Saved Properties</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <Button variant="ghost" className="justify-start">Buy</Button>
                <Button variant="ghost" className="justify-start">Rent</Button>
                <Button variant="ghost" className="justify-start">Sell</Button>
                <Button variant="ghost" className="justify-start">Home Loans</Button>
                <Button variant="ghost" className="justify-start">Find Realtors</Button>
                <hr />
                <Button variant="ghost" className="justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Saved Homes
                </Button>

                {session ? (
                  <>
                    <div className="px-3 py-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                          <AvatarFallback>
                            {session.user?.name ? getUserInitials(session.user.name) : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-sm font-medium">{session.user?.name}</p>
                          <p className="text-xs text-gray-500">{session.user?.email}</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" className="justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Link href="/auth/signin">
                    <Button variant="ghost" className="justify-start w-full">
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('https://ugc.same-assets.com/AtjDsDn8WHcZ7fcxurNe3qmcGndl7fnI.jpeg')"
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Your Dream Home
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Search millions of homes, get detailed property information, and connect with local real estate professionals
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Enter city, address, school, or neighborhood"
                    className="pl-10 h-12 text-lg"
                  />
                </div>
              </div>
              <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Price</SelectItem>
                  <SelectItem value="500k">$500K+</SelectItem>
                  <SelectItem value="1m">$1M+</SelectItem>
                  <SelectItem value="2m">$2M+</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Beds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Beds</SelectItem>
                  <SelectItem value="1">1+ Beds</SelectItem>
                  <SelectItem value="2">2+ Beds</SelectItem>
                  <SelectItem value="3">3+ Beds</SelectItem>
                  <SelectItem value="4">4+ Beds</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Baths" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Baths</SelectItem>
                  <SelectItem value="1">1+ Baths</SelectItem>
                  <SelectItem value="2">2+ Baths</SelectItem>
                  <SelectItem value="3">3+ Baths</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Type</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhome">Townhome</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover exceptional homes in premium locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <Dialog key={property.id}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
                    <div className="relative">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-64 object-cover"
                      />
                      <Badge className="absolute top-4 left-4 bg-blue-600">
                        {property.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-4 right-4 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      <div className="mb-2">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {property.price}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {property.title}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.location}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {property.beds} beds
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {property.baths} baths
                        </div>
                        <div className="flex items-center">
                          <Square className="h-4 w-4 mr-1" />
                          {property.sqft} sqft
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{property.title}</DialogTitle>
                    <DialogDescription className="text-lg">
                      {property.location}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-80 object-cover rounded-lg"
                      />

                      <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-3">Property Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center">
                            <Home className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Type: {property.type}</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Size: {property.sqft} sqft</span>
                          </div>
                          <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Bedrooms: {property.beds}</span>
                          </div>
                          <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Bathrooms: {property.baths}</span>
                          </div>
                          <div className="flex items-center">
                            <Car className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Garage: 2 cars</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Built: 2020</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-3xl font-bold text-blue-600 mb-4">
                        {property.price}
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3">Description</h4>
                        <p className="text-gray-600 leading-relaxed">
                          This stunning {property.title.toLowerCase()} offers luxurious living with modern amenities and breathtaking views.
                          Featuring high-end finishes, spacious layouts, and premium materials throughout.
                          Perfect for those seeking elegance and comfort in a prime location.
                        </p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3">Features</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          <li>Gourmet kitchen with premium appliances</li>
                          <li>Master suite with walk-in closet</li>
                          <li>Hardwood floors throughout</li>
                          <li>Private backyard with landscaping</li>
                          <li>Smart home technology</li>
                          <li>Central air conditioning</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Schedule a Tour
                        </Button>
                        <Button variant="outline" className="w-full">
                          Contact Agent
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Heart className="h-4 w-4 mr-2" />
                          Save Property
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View All Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Market Insights
            </h2>
            <p className="text-lg text-gray-600">
              Stay informed with the latest real estate trends
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-blue-600">2.3M+</CardTitle>
                <CardDescription>Active Listings</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-green-600">$425K</CardTitle>
                <CardDescription>Median Home Price</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-purple-600">32 Days</CardTitle>
                <CardDescription>Average Days on Market</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">realtor.com</div>
              <p className="text-gray-400 mb-4">
                Find your perfect home with the most comprehensive real estate platform
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Buy</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/homes-for-sale" className="hover:text-white">Homes for Sale</a></li>
                <li><a href="/open-houses" className="hover:text-white">Open Houses</a></li>
                <li><a href="/new-homes" className="hover:text-white">New Homes</a></li>
                <li><a href="/recently-sold" className="hover:text-white">Recently Sold</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Rent</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/rental-homes" className="hover:text-white">Rental Homes</a></li>
                <li><a href="/rental-buildings" className="hover:text-white">Rental Buildings</a></li>
                <li><a href="/rental-resources" className="hover:text-white">Rental Resources</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Sell</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/sell-your-home" className="hover:text-white">Sell Your Home</a></li>
                <li><a href="/home-values" className="hover:text-white">Home Values</a></li>
                <li><a href="/sellers-guide" className="hover:text-white">Sellers Guide</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Realtor.com Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

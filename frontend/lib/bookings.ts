export type BookingCategory = "hotel" | "transport" | "travel";

export type Booking = {
  id: string;
  name: string;
  location: string;
  price: string;
  numericPrice: number;
  unit: string;
  rating: string;
  image: string;
  images: string[];
  description: string;
  payment: string;
  facilities: string[];
  services: string[];
};

export const hotels: Booking[] = [
  {
    id: "ocean-view-resort",
    name: "Ocean View Resort",
    location: "Galle, Sri Lanka",
    price: "$120",
    numericPrice: 120,
    unit: "night",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
    ],
    description: "A peaceful beachfront resort overlooking the Indian Ocean, with spacious rooms and easy access to Galle's historic attractions.",
    payment: "Pay $120 per night",
    facilities: ["Ocean-view rooms", "Swimming pool", "Free parking", "Air conditioning", "Free Wi-Fi"],
    services: ["Breakfast included", "Airport transfer", "24-hour reception", "Room service"],
  },
  {
    id: "ella-mountain-hotel",
    name: "Ella Mountain Hotel",
    location: "Ella, Sri Lanka",
    price: "$95",
    numericPrice: 95,
    unit: "night",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Stay among Ella's green mountain views in a cosy hotel designed for hikers and nature lovers.",
    payment: "Pay $95 per night",
    facilities: ["Mountain-view rooms", "Restaurant", "Garden", "Air conditioning", "Free Wi-Fi"],
    services: ["Daily breakfast", "Hiking guidance", "Laundry service", "Pickup service"],
  },
  {
    id: "sigiriya-garden-inn",
    name: "Sigiriya Garden Inn",
    location: "Sigiriya, Sri Lanka",
    price: "$110",
    numericPrice: 110,
    unit: "night",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1551887373-7c1b8f8c1cc4?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1551887373-7c1b8f8c1cc4?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
    ],
    description: "A tranquil garden inn near Sigiriya Rock, offering comfortable rooms and local hospitality.",
    payment: "Pay $110 per night",
    facilities: ["Garden rooms", "Outdoor pool", "Spa", "Restaurant", "Free parking"],
    services: ["Breakfast buffet", "Heritage tours", "Bicycle rental", "Airport transfer"],
  },
  {
    id: "colombo-city-hotel",
    name: "Colombo City Hotel",
    location: "Colombo, Sri Lanka",
    price: "$105",
    numericPrice: 105,
    unit: "night",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1550966841-3cfb7d1a2d57?auto=format&fit=crop&w=900&q=80",
    ],
    description: "A modern city hotel close to Colombo's shopping, dining and business districts.",
    payment: "Pay $105 per night",
    facilities: ["Rooftop pool", "Fitness centre", "Business lounge", "Air conditioning", "Free Wi-Fi"],
    services: ["Restaurant", "City transfers", "Concierge", "Meeting rooms"],
  },
];

export const transports: Booking[] = [
  {
    id: "colombo-ella-train",
    name: "Colombo - Ella Train",
    location: "Colombo to Ella",
    price: "$18",
    numericPrice: 18,
    unit: "trip",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Take one of Sri Lanka's most scenic rail journeys through tea country from Colombo to Ella.",
    payment: "Pay $18 per passenger",
    facilities: ["Reserved seating", "Luggage storage", "Air-conditioned carriage", "Panoramic windows"],
    services: ["Ticket assistance", "Station pickup", "Travel support", "Refreshments"],
  },
  {
    id: "private-car-with-driver",
    name: "Private Car with Driver",
    location: "Island-wide",
    price: "$75",
    numericPrice: 75,
    unit: "day",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Explore Sri Lanka comfortably with a professional private driver and air-conditioned vehicle.",
    payment: "Pay $75 per day",
    facilities: ["Air conditioning", "Comfortable seats", "Large luggage space", "Clean vehicle"],
    services: ["Professional driver", "Fuel included", "Flexible itinerary", "Hotel pickup"],
  },
  {
    id: "airport-transfer",
    name: "Airport Transfer",
    location: "Bandaranaike Airport",
    price: "$35",
    numericPrice: 35,
    unit: "trip",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Reliable, door-to-door airport pickup or drop-off in a clean, modern vehicle.",
    payment: "Pay $35 per transfer",
    facilities: ["Flight tracking", "Air conditioning", "Baggage assistance", "Meet and greet"],
    services: ["24-hour availability", "Child seat on request", "Direct transfer", "Fixed fare"],
  },
  {
    id: "scenic-bus-service",
    name: "Scenic Bus Service",
    location: "Kandy to Sigiriya",
    price: "$12",
    numericPrice: 12,
    unit: "trip",
    rating: "4.5",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Affordable, comfortable travel through the cultural triangle with scheduled scenic stops.",
    payment: "Pay $12 per passenger",
    facilities: ["Reclining seats", "Onboard charging", "Luggage area", "Air conditioning"],
    services: ["Reserved seat", "Route guide", "Scheduled stops", "Travel assistance"],
  },
];

export const travelPackages: Booking[] = [
  {
    id: "ella-scenic-escape",
    name: "Ella Scenic Escape",
    location: "Ella, Sri Lanka",
    price: "$220",
    numericPrice: 220,
    unit: "package",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1586613835436-5f8ad0b2d1d6?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1586613835436-5f8ad0b2d1d6?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
    ],
    description: "A three-day escape through Ella's waterfalls, tea plantations and famous mountain railway.",
    payment: "Pay $220 per package",
    facilities: ["3-day itinerary", "Boutique accommodation", "Local transport", "Entry tickets"],
    services: ["Professional guide", "Daily breakfast", "Tea estate visit", "Photography stops"],
  },
  {
    id: "sigiriya-heritage-tour",
    name: "Sigiriya Heritage Tour",
    location: "Sigiriya, Sri Lanka",
    price: "$180",
    numericPrice: 180,
    unit: "package",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Discover ancient kingdoms, village life and Sri Lanka's remarkable natural landscapes.",
    payment: "Pay $180 per package",
    facilities: ["2-day itinerary", "Hotel stay", "Private vehicle", "Site entry tickets"],
    services: ["Heritage guide", "Village lunch", "Wildlife safari", "Hotel pickup"],
  },
  {
    id: "galle-coastal-journey",
    name: "Galle Coastal Journey",
    location: "Galle, Sri Lanka",
    price: "$250",
    numericPrice: 250,
    unit: "package",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Enjoy beaches, colonial history and ocean sunsets on a relaxed coastal journey around Galle.",
    payment: "Pay $250 per package",
    facilities: ["4-day itinerary", "Beach accommodation", "Daily transport", "Activities"],
    services: ["Local guide", "Sunset cruise", "Turtle conservation visit", "Airport transfer"],
  },
  {
    id: "kandy-cultural-experience",
    name: "Kandy Cultural Experience",
    location: "Kandy, Sri Lanka",
    price: "$195",
    numericPrice: 195,
    unit: "package",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Explore Kandy's temples, traditions, markets and beautiful central highland scenery.",
    payment: "Pay $195 per package",
    facilities: ["3-day itinerary", "City hotel", "Transport", "Temple tickets"],
    services: ["Cultural guide", "Dance show", "Tea museum visit", "Traditional dinner"],
  },
];

export function getBookings(category: BookingCategory) {
  if (category === "hotel") return hotels;
  if (category === "transport") return transports;
  return travelPackages;
}

export function getBooking(category: BookingCategory, id: string) {
  return getBookings(category).find((booking) => booking.id === id);
}

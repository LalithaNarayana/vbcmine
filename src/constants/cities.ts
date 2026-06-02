export interface City {
  id: string;
  name: string;
  zone: string;
  areas: string[];
  active: boolean;
}

export const cities: City[] = [
  {
    id: "mvp",
    name: "MVP Colony",
    zone: "North",
    areas: ["Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Sector 6", "Sector 7", "Sector 8"],
    active: true,
  },
  {
    id: "rushikonda",
    name: "Rushikonda",
    zone: "North",
    areas: ["Main Road", "Beach Road", "IT Park Area", "NTR Beach"],
    active: true,
  },
  {
    id: "gajuwaka",
    name: "Gajuwaka",
    zone: "South",
    areas: ["Main Road", "Steel Plant Area", "Old Town", "New Colony"],
    active: true,
  },
  {
    id: "maddilapalem",
    name: "Maddilapalem",
    zone: "Central",
    areas: ["Main Road", "Colony Road", "Bus Stand Area"],
    active: true,
  },
  {
    id: "seethammadhara",
    name: "Seethammadhara",
    zone: "Central",
    areas: ["Main Road", "North Extension", "South Extension"],
    active: true,
  },
  {
    id: "dwaraka-nagar",
    name: "Dwaraka Nagar",
    zone: "Central",
    areas: ["1st Lane", "2nd Lane", "3rd Lane", "4th Lane", "5th Lane"],
    active: true,
  },
  {
    id: "akkayyapalem",
    name: "Akkayyapalem",
    zone: "Central",
    areas: ["Main Road", "Cross Road 1", "Cross Road 2"],
    active: true,
  },
  {
    id: "pendurthi",
    name: "Pendurthi",
    zone: "North",
    areas: ["Town Center", "Main Bazaar", "Industrial Area"],
    active: true,
  },
  {
    id: "bheemunipatnam",
    name: "Bheemunipatnam",
    zone: "North",
    areas: ["Beach Road", "Town Center", "Old Colony"],
    active: true,
  },
  {
    id: "kommadi",
    name: "Kommadi",
    zone: "North",
    areas: ["Main Road", "Township", "New Layouts"],
    active: true,
  },
  {
    id: "gopalapatnam",
    name: "Gopalapatnam",
    zone: "North",
    areas: ["Main Road", "Fishermen Colony", "New Area"],
    active: true,
  },
  {
    id: "waltair-uplands",
    name: "Waltair Uplands",
    zone: "Central",
    areas: ["Main Road", "Residential Area", "Near RK Beach"],
    active: true,
  },
];
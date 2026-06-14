import dotenv from "dotenv";
import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import Partner from "../models/Partner.js";
import Testimonial from "../models/Testimonial.js";

dotenv.config();

const blogs = [
  {
    title: "How solar energy reduces operating costs",
    slug: "how-solar-energy-reduces-operating-costs",
    excerpt:
      "Solar systems help homes, businesses, and institutions reduce fuel dependency while improving long-term energy reliability.",
    content:
      "Solar energy reduces operating costs by lowering dependence on generator fuel, improving energy stability, and reducing maintenance pressure on traditional power systems. For businesses and institutions, a well-designed solar or hybrid system can support daily operations while improving long-term sustainability.",
    category: "Energy Insights",
    tags: ["solar", "cost saving", "renewable energy"],
    imageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    author: "GreenVolt Energy",
    status: "published",
    publishedAt: new Date(),
  },
  {
    title: "Why off-grid solar matters for rural communities",
    slug: "why-off-grid-solar-matters-for-rural-communities",
    excerpt:
      "Off-grid solar solutions improve electricity access in remote areas and support education, health, and local enterprise.",
    content:
      "Off-grid solar systems are important for rural communities because they bring reliable electricity to areas where grid access is limited. These systems support schools, clinics, small businesses, homes, and public lighting while reducing dependence on expensive fuel supply chains.",
    category: "Community Energy",
    tags: ["off-grid", "communities", "access"],
    imageUrl:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80",
    author: "GreenVolt Energy",
    status: "published",
    publishedAt: new Date(),
  },
  {
    title: "Keeping solar systems reliable after installation",
    slug: "keeping-solar-systems-reliable-after-installation",
    excerpt:
      "Routine inspections, cleaning, battery checks, and technical support protect system performance over time.",
    content:
      "A solar project does not end after installation. Regular maintenance, monitoring, battery checks, and timely troubleshooting help systems perform safely and reliably. GreenVolt supports long-term system performance through after-sales service and technical guidance.",
    category: "Maintenance",
    tags: ["maintenance", "support", "solar systems"],
    imageUrl:
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80",
    author: "GreenVolt Energy",
    status: "published",
    publishedAt: new Date(),
  },
];

const partners = [
  {
    name: "Government and Institutions",
    logoUrl:
      "https://dummyimage.com/320x160/ffffff/0f3d2e.png&text=Government+Institutions",
    websiteUrl: "",
    category: "Institutional Partner",
    status: "published",
    order: 1,
  },
  {
    name: "NGOs and Development Agencies",
    logoUrl:
      "https://dummyimage.com/320x160/ffffff/1e73be.png&text=Development+Partners",
    websiteUrl: "",
    category: "Development Partner",
    status: "published",
    order: 2,
  },
  {
    name: "Private Sector Clients",
    logoUrl:
      "https://dummyimage.com/320x160/ffffff/f4c430.png&text=Private+Sector",
    websiteUrl: "",
    category: "Business Partner",
    status: "published",
    order: 3,
  },
];

const testimonials = [
  {
    name: "Institutional Client",
    role: "Solar installation project",
    organization: "Public Institution",
    message:
      "GreenVolt delivered a reliable system and supported the team through installation, testing, and handover.",
    imageUrl: "",
    rating: 5,
    status: "published",
    order: 1,
  },
  {
    name: "Community Partner",
    role: "Off-grid energy access",
    organization: "Community Program",
    message:
      "The project improved energy access and gave the community a practical solution for daily power needs.",
    imageUrl: "",
    rating: 5,
    status: "published",
    order: 2,
  },
  {
    name: "Business Customer",
    role: "Hybrid energy solution",
    organization: "Private Sector",
    message:
      "The system reduced fuel pressure and gave our operations a cleaner, more dependable source of power.",
    imageUrl: "",
    rating: 5,
    status: "published",
    order: 3,
  },
];

const upsertBy = async (Model, key, items) => {
  for (const item of items) {
    await Model.findOneAndUpdate(
      { [key]: item[key] },
      { $set: item },
      { new: true, upsert: true, runValidators: true }
    );
  }
};

const run = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing");
  }

  await mongoose.connect(process.env.MONGO_URI);

  await upsertBy(Blog, "slug", blogs);
  await upsertBy(Partner, "name", partners);
  await upsertBy(Testimonial, "name", testimonials);

  await mongoose.connection.close();

  console.log("Seed completed: blogs, partners, and testimonials are ready.");
};

run().catch(async (error) => {
  console.error("Seed failed:", error.message);
  await mongoose.connection.close();
  process.exit(1);
});

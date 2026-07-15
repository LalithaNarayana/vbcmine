import mongoose, { Schema, Model, Document } from "mongoose";

/**
 * A single heading "block": eyebrow tag + up to 3 title fragments + description.
 *
 * How the fragments are used depends on the section (see defaults below /
 * the corresponding frontend component):
 *  - 3-part sections (Home Offers, Home Testimonials) render
 *    `titlePart1 <highlighted>titlePart2</highlighted><br/>titlePart3`.
 *  - 2-part sections (Home Clients, Plans/Services/Contact/FAQ pages) render
 *    `titlePart1 <highlighted>titlePart2</highlighted>` inline.
 *  - Plain sections (Home Plans, Home Why Choose Us) only use titlePart1,
 *    rendered as a single plain (non-highlighted) heading — "no parts".
 * titlePart3 / description are simply left blank where a section doesn't use them.
 */
export interface ISectionHeadingBlock {
  tag: string;
  titlePart1: string;
  titlePart2: string;
  titlePart3: string;
  description: string;
}

export interface ISectionHeading extends Document {
  homeOffers: ISectionHeadingBlock;
  homePlans: ISectionHeadingBlock;
  homeWhyChoose: ISectionHeadingBlock;
  homeTestimonials: ISectionHeadingBlock;
  homeClients: ISectionHeadingBlock;
  plansPage: ISectionHeadingBlock & { topTagline: string; bottomTagline: string };
  servicesPage: ISectionHeadingBlock;
  contactPage: ISectionHeadingBlock;
  faqPage: ISectionHeadingBlock;
  createdAt: Date;
  updatedAt: Date;
}

const block = (defaults: Partial<ISectionHeadingBlock>) => ({
  tag: { type: String, default: defaults.tag ?? "" },
  titlePart1: { type: String, default: defaults.titlePart1 ?? "" },
  titlePart2: { type: String, default: defaults.titlePart2 ?? "" },
  titlePart3: { type: String, default: defaults.titlePart3 ?? "" },
  description: { type: String, default: defaults.description ?? "" },
});

const SectionHeadingSchema = new Schema<ISectionHeading>(
  {
    homeOffers: {
      type: block({
        tag: "What We Offer",
        titlePart1: "COMPLETE",
        titlePart2: "CONNECTIVITY",
        titlePart3: "SOLUTIONS",
        description:
          "From high-speed fiber internet to enterprise-grade business solutions — VBC delivers it all under one roof.",
      }),
      default: () => ({}),
    },
    homePlans: {
      type: block({
        tag: "Internet + OTT",
        titlePart1: "FIBER SPEED + OTT BUNDLE",
        description:
          "High-speed unlimited fiber internet bundled with your favourite OTT streaming apps — all in one plan.",
      }),
      default: () => ({}),
    },
    homeWhyChoose: {
      type: block({
        tag: "Why Choose Us",
        titlePart1: "THE VBC DIFFERENCE",
        description: "14+ years of delivering Vizag's most trusted fiber broadband experience.",
      }),
      default: () => ({}),
    },
    homeTestimonials: {
      type: block({
        tag: "Customer Stories",
        titlePart1: "TRUSTED BY",
        titlePart2: "30,000+",
        titlePart3: "HOUSEHOLDS",
        description: "Real experiences from VBC subscribers across Visakhapatnam.",
      }),
      default: () => ({}),
    },
    homeClients: {
      type: block({
        tag: "Trusted By",
        titlePart1: "OUR",
        titlePart2: "CLIENTS",
      }),
      default: () => ({}),
    },
    plansPage: {
      type: {
        ...block({
          tag: "Broadband Plans",
          titlePart1: "PLANS &",
          titlePart2: "PRICING",
          description: "Choose your perfect plan. All prices per month. GST @18% extra.",
        }),
        topTagline: {
          type: String,
          default:
            "6+1 or 12+2 months offer available. Router & Installation free on 6/12 month plans. Non-refundable installation: ₹1500 for monthly plans.",
        },
        bottomTagline: {
          type: String,
          default:
            "All prices are exclusive of GST @18%. Non-refundable installation charges: ₹1500 (for monthly plans). For 6/12 month plans, router & installation charges free — confirm at time of booking.",
        },
      },
      default: () => ({}),
    },
    servicesPage: {
      type: block({
        tag: "Business Services",
        titlePart1: "ENTERPRISE",
        titlePart2: "SOLUTIONS",
        description:
          "Reliable, high-performance connectivity and infrastructure services for businesses across Andhra Pradesh.",
      }),
      default: () => ({}),
    },
    contactPage: {
      type: block({
        tag: "Contact Us",
        titlePart1: "WE'RE HERE",
        titlePart2: "TO HELP",
        description:
          "Sales enquiries, technical support, complaints, or feedback — our team is here to help, 24/7.",
      }),
      default: () => ({}),
    },
    faqPage: {
      type: block({
        tag: "Help Center",
        titlePart1: "FREQUENTLY ASKED",
        titlePart2: "QUESTIONS",
        description: "Everything you need to know about VBC broadband plans, installation, and support.",
      }),
      default: () => ({}),
    },
  },
  { timestamps: true }
);

const SectionHeading: Model<ISectionHeading> =
  mongoose.models.SectionHeading ||
  mongoose.model<ISectionHeading>("SectionHeading", SectionHeadingSchema);

// Singleton, like Settings / About / CtaBand.
export async function getOrCreateSectionHeadings(): Promise<ISectionHeading> {
  let doc = await SectionHeading.findOne();
  if (!doc) {
    doc = await SectionHeading.create({});
  }
  return doc;
}

export default SectionHeading;

"use client";
import { useState } from "react";
import BusinessServiceEnquiryModal from "@/components/services/BusinessServiceEnquiryModal";

interface ServiceOption {
  _id: string;
  name: string;
}

interface ServiceEnquireButtonProps {
  serviceId: string;
  services: ServiceOption[];
  cities: string[];
}

export default function ServiceEnquireButton({ serviceId, services, cities }: ServiceEnquireButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-primary"
        style={{ border: "none", cursor: "pointer" }}
      >
        Enquire Now
      </button>

      <BusinessServiceEnquiryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        services={services}
        preselectedServiceId={serviceId}
        cities={cities}
      />
    </>
  );
}

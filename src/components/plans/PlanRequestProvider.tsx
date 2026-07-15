"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import PlanRequestModal from "./PlanRequestModal";

interface PlanRequestContextValue {
  openPlanRequest: (planId?: string) => void;
  closePlanRequest: () => void;
}

const PlanRequestContext = createContext<PlanRequestContextValue | null>(null);

/**
 * App-wide provider for the "Get This Plan" flow. Mounted once near the
 * root so any component (PlanCard, PlansExplorer, SpeedHighlight, etc.)
 * can call `openPlanRequest()` to pop the connection-request modal,
 * optionally pre-selecting a plan.
 */
export default function PlanRequestProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedPlanId, setPreselectedPlanId] = useState<string | undefined>(undefined);

  const openPlanRequest = useCallback((planId?: string) => {
    setPreselectedPlanId(planId);
    setIsOpen(true);
  }, []);

  const closePlanRequest = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ openPlanRequest, closePlanRequest }),
    [openPlanRequest, closePlanRequest]
  );

  return (
    <PlanRequestContext.Provider value={value}>
      {children}
      <PlanRequestModal
        isOpen={isOpen}
        onClose={closePlanRequest}
        preselectedPlanId={preselectedPlanId}
      />
    </PlanRequestContext.Provider>
  );
}

export function usePlanRequest(): PlanRequestContextValue {
  const ctx = useContext(PlanRequestContext);
  if (!ctx) {
    throw new Error("usePlanRequest must be used within a PlanRequestProvider");
  }
  return ctx;
}

"use client";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import PlanRequestModal from "./PlanRequestModal";

interface PlanRequestContextValue {
  openPlanRequest: (planId?: string, onSuccess?: () => void) => void;
  closePlanRequest: () => void;
}

const PlanRequestContext = createContext<PlanRequestContextValue | null>(null);

/**
 * App-wide provider for the "Get This Plan" flow. Mounted once near the
 * root so any component (PlanCard, PlansExplorer, SpeedHighlight, the
 * dashboard's "Get New Connection" action, etc.) can call
 * `openPlanRequest()` to pop the connection-request modal, optionally
 * pre-selecting a plan and/or running a callback once the request is
 * successfully submitted (e.g. to refresh dashboard data).
 */
export default function PlanRequestProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedPlanId, setPreselectedPlanId] = useState<string | undefined>(undefined);
  const onSuccessRef = useRef<(() => void) | undefined>(undefined);

  const openPlanRequest = useCallback((planId?: string, onSuccess?: () => void) => {
    setPreselectedPlanId(planId);
    onSuccessRef.current = onSuccess;
    setIsOpen(true);
  }, []);

  const closePlanRequest = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSuccess = useCallback(() => {
    onSuccessRef.current?.();
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
        onSuccess={handleSuccess}
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

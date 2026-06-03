import type { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role: UserRole;
    agencyId: string | null;
    agencyName: string | null;
    agencyShortCode: string | null;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
      agencyId: string | null;
      agencyName: string | null;
      agencyShortCode: string | null;
    };
  }
}

export type DashboardStats = {
  totalBeneficiaries: number;
  uniqueBeneficiaries: number;
  totalInterventions: number;
  activeInterventions: number;
  totalAgencies: number;
  totalBudget: number;
  spentBudget: number;
  duplicationAlerts: number;
};

export type AgencyStats = {
  id: string;
  name: string;
  shortCode: string;
  interventionCount: number;
  beneficiaryCount: number;
  activeInterventions: number;
  totalBudget: number;
};

export type InterventionWithStats = {
  id: string;
  name: string;
  type: string;
  status: string;
  budget: number | null;
  location: string | null;
  targetBeneficiaries: number | null;
  enrolledCount: number;
  servedCount: number;
  startDate: Date | null;
  endDate: Date | null;
  agency: {
    name: string;
    shortCode: string;
  };
};

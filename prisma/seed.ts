import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clean existing data
  await prisma.enrollment.deleteMany();
  await prisma.intervention.deleteMany();
  await prisma.programme.deleteMany();
  await prisma.beneficiary.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  await prisma.agency.deleteMany();

  // Create Agencies
  const ncto = await prisma.agency.create({
    data: {
      name: "National Commission for the Targeting of the Poor",
      shortCode: "NCTO",
      type: "government",
      contactEmail: "contact@ncto.gov.ng",
      description: "Primary agency responsible for identifying and targeting poor households for social interventions.",
    },
  });

  const geep = await prisma.agency.create({
    data: {
      name: "Government Enterprise and Empowerment Programme",
      shortCode: "GEEP",
      type: "government",
      contactEmail: "info@geep.gov.ng",
      description: "Provides enterprise grants, loans, and empowerment support to micro-businesses.",
    },
  });

  const nema = await prisma.agency.create({
    data: {
      name: "National Emergency Management Agency",
      shortCode: "NEMA",
      type: "government",
      contactEmail: "info@nema.gov.ng",
      description: "Coordinates emergency response and disaster relief across the nation.",
    },
  });

  const redCross = await prisma.agency.create({
    data: {
      name: "Nigerian Red Cross Society",
      shortCode: "NRCS",
      type: "ngo",
      contactEmail: "info@redcross.ng",
      description: "Humanitarian organization providing emergency assistance and disaster relief.",
    },
  });

  // Create Users (password: "password123")
  const passwordHash = await hash("password123", 12);

  // Ministry-level users
  await prisma.user.create({
    data: {
      email: "minister@ohoprs.gov.ng",
      passwordHash,
      name: "Dr. Amina Bello",
      role: "minister",
    },
  });

  await prisma.user.create({
    data: {
      email: "executive@ohoprs.gov.ng",
      passwordHash,
      name: "Mr. Chidi Okonkwo",
      role: "executive",
    },
  });

  // Agency-level users
  await prisma.user.create({
    data: {
      email: "admin@ncto.gov.ng",
      passwordHash,
      name: "Fatima Usman",
      role: "agency_admin",
      agencyId: ncto.id,
    },
  });

  await prisma.user.create({
    data: {
      email: "admin@geep.gov.ng",
      passwordHash,
      name: "Blessing Adeyemi",
      role: "agency_admin",
      agencyId: geep.id,
    },
  });

  await prisma.user.create({
    data: {
      email: "ops@geep.gov.ng",
      passwordHash,
      name: "Emeka Nwosu",
      role: "operations",
      agencyId: geep.id,
    },
  });

  await prisma.user.create({
    data: {
      email: "admin@nema.gov.ng",
      passwordHash,
      name: "Ibrahim Musa",
      role: "agency_admin",
      agencyId: nema.id,
    },
  });

  await prisma.user.create({
    data: {
      email: "admin@redcross.ng",
      passwordHash,
      name: "Sarah Okafor",
      role: "agency_admin",
      agencyId: redCross.id,
    },
  });

  // Partner & view-only
  await prisma.user.create({
    data: {
      email: "partner@worldbank.org",
      passwordHash,
      name: "James Carter",
      role: "partner",
    },
  });

  await prisma.user.create({
    data: {
      email: "auditor@finance.gov.ng",
      passwordHash,
      name: "Zainab Abubakar",
      role: "view_only",
    },
  });

  // Create Programmes
  const floodRelief = await prisma.programme.create({
    data: {
      agencyId: nema.id,
      name: "Flood Relief 2026",
      description: "Emergency response to severe flooding across northern states.",
      budget: 500000000,
      startDate: new Date("2026-01-15"),
      endDate: new Date("2026-09-30"),
    },
  });

  const schoolFeeding = await prisma.programme.create({
    data: {
      agencyId: ncto.id,
      name: "National School Feeding Programme",
      description: "Provides nutritious meals to primary school children in low-income areas.",
      budget: 750000000,
      startDate: new Date("2025-09-01"),
      endDate: new Date("2026-07-31"),
    },
  });

  const enterpriseDev = await prisma.programme.create({
    data: {
      agencyId: geep.id,
      name: "Enterprise Development Initiative",
      description: "Empowering small businesses and entrepreneurs across all states.",
      budget: 350000000,
      startDate: new Date("2026-02-01"),
      endDate: new Date("2026-12-31"),
    },
  });

  // Create Interventions
  const cashTransfer = await prisma.intervention.create({
    data: {
      agencyId: ncto.id,
      programmeId: schoolFeeding.id,
      name: "Conditional Cash Transfer — South-West",
      type: "cash_transfer",
      status: "active",
      budget: 150000000,
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-12-31"),
      location: "Lagos State",
      targetBeneficiaries: 25000,
      description: "Monthly cash transfer to vulnerable households in South-West Nigeria.",
    },
  });

  const foodDist = await prisma.intervention.create({
    data: {
      agencyId: nema.id,
      programmeId: floodRelief.id,
      name: "Emergency Food Distribution — North Central",
      type: "food_distribution",
      status: "active",
      budget: 200000000,
      startDate: new Date("2026-02-01"),
      endDate: new Date("2026-08-31"),
      location: "North Central States",
      targetBeneficiaries: 50000,
      description: "Distribution of food supplies to flood-affected communities.",
    },
  });

  const shelter = await prisma.intervention.create({
    data: {
      agencyId: nema.id,
      programmeId: floodRelief.id,
      name: "Temporary Shelter — Niger State",
      type: "shelter",
      status: "active",
      budget: 300000000,
      startDate: new Date("2026-01-20"),
      endDate: new Date("2026-12-31"),
      location: "Niger State",
      targetBeneficiaries: 10000,
      description: "Temporary shelter construction for displaced families.",
    },
  });

  const schoolSupplies = await prisma.intervention.create({
    data: {
      agencyId: ncto.id,
      programmeId: schoolFeeding.id,
      name: "School Supplies Distribution — North-East",
      type: "education",
      status: "active",
      budget: 90000000,
      startDate: new Date("2026-01-15"),
      endDate: new Date("2026-07-31"),
      location: "North-East States",
      targetBeneficiaries: 30000,
      description: "Distribution of learning materials to primary school pupils in underserved areas.",
    },
  });

  const microGrant = await prisma.intervention.create({
    data: {
      agencyId: geep.id,
      programmeId: enterpriseDev.id,
      name: "Micro-Grant for Women Entrepreneurs",
      type: "livelihood",
      status: "active",
      budget: 100000000,
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-11-30"),
      location: "South-West States",
      targetBeneficiaries: 5000,
      description: "Empowering women with micro-grants to start or grow small businesses.",
    },
  });

  const medical = await prisma.intervention.create({
    data: {
      agencyId: redCross.id,
      name: "Mobile Health Clinics — IDP Camps",
      type: "medical",
      status: "draft",
      budget: 80000000,
      startDate: new Date("2026-04-01"),
      endDate: new Date("2026-10-31"),
      location: "Borno State",
      targetBeneficiaries: 15000,
      description: "Deploying mobile health units to IDP camps.",
    },
  });

  // Create Beneficiaries
  const beneficiaries = [];
  const states = ["Lagos", "Kano", "Niger", "Borno", "Kaduna", "Rivers", "Abuja", "Oyo", "Katsina", "Bauchi"];
  const lgas = ["Ikeja", "Kano Municipal", "Minna", "Maiduguri", "Kaduna South", "Port Harcourt", "AMAC", "Ibadan North", "Katsina Central", "Bauchi"];

  for (let i = 1; i <= 20; i++) {
    const stateIdx = (i - 1) % states.length;
    const ben = await prisma.beneficiary.create({
      data: {
        nationalId: `NIN${String(i).padStart(10, "0")}`,
        fullName: [
          "Adebayo Ogunlesi", "Ngozi Eze", "Musa Ibrahim", "Funke Akindele", "Sani Abdullahi",
          "Chioma Okafor", "Yakubu Mohammed", "Aisha Bello", "Tunde Bakare", "Mercy John",
          "Oluwaseun Adeyemi", "Hauwa Ibrahim", "Chinedu Nwosu", "Patience Usman", "Segun Ogunyemi",
          "Fatima Abubakar", "Emeka Nwachukwu", "Ruth Okonkwo", "Daniel Adamu", "Grace Ekwueme",
        ][i - 1],
        gender: i % 2 === 0 ? "Female" : "Male",
        phoneNumber: `+2348012345${String(i).padStart(4, "0")}`,
        state: states[stateIdx],
        lga: lgas[stateIdx],
        povertyScore: Math.round((Math.random() * 40 + 10) * 10) / 10,
      },
    });
    beneficiaries.push(ben);
  }

  // Enroll beneficiaries in interventions
  for (let i = 0; i < 12; i++) {
    await prisma.enrollment.create({
      data: {
        beneficiaryId: beneficiaries[i].id,
        interventionId: cashTransfer.id,
        status: i < 8 ? "served" : "enrolled",
        servedAt: i < 8 ? new Date("2026-03-15") : null,
      },
    });
  }

  for (let i = 5; i < 18; i++) {
    await prisma.enrollment.create({
      data: {
        beneficiaryId: beneficiaries[i].id,
        interventionId: foodDist.id,
        status: i < 12 ? "served" : "enrolled",
        servedAt: i < 12 ? new Date("2026-03-01") : null,
      },
    });
  }

  for (let i = 0; i < 7; i++) {
    await prisma.enrollment.create({
      data: {
        beneficiaryId: beneficiaries[i].id,
        interventionId: microGrant.id,
        status: "enrolled",
      },
    });
  }

  for (let i = 10; i < 16; i++) {
    await prisma.enrollment.create({
      data: {
        beneficiaryId: beneficiaries[i].id,
        interventionId: shelter.id,
        status: i < 13 ? "served" : "enrolled",
        servedAt: i < 13 ? new Date("2026-02-20") : null,
      },
    });
  }

  for (let i = 2; i < 14; i++) {
    await prisma.enrollment.create({
      data: {
        beneficiaryId: beneficiaries[i].id,
        interventionId: schoolSupplies.id,
        status: i < 8 ? "served" : "enrolled",
        servedAt: i < 8 ? new Date("2026-03-10") : null,
      },
    });
  }

  console.log("Seed completed successfully!");
  console.log(`  Agencies: 4`);
  console.log(`  Users: 9`);
  console.log(`  Programmes: 3`);
  console.log(`  Interventions: 6`);
  console.log(`  Beneficiaries: 20`);
  console.log(`  Enrollments: set`);
  console.log();
  console.log("Login credentials (all use password: password123):");
  console.log("  minister@ohoprs.gov.ng    (Ministry/National view)");
  console.log("  admin@ncto.gov.ng         (Agency Admin - NCTO)");
  console.log("  admin@geep.gov.ng         (Agency Admin - GEEP)");
  console.log("  admin@nema.gov.ng         (Agency Admin - NEMA)");
  console.log("  admin@redcross.ng         (Agency Admin - NRCS)");
  console.log("  ops@geep.gov.ng           (Operations - GEEP)");
  console.log("  partner@worldbank.org     (Partner - National scope)");
  console.log("  auditor@finance.gov.ng    (View-Only/National)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

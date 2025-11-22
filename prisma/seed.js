import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");
  

  // 统一写入真实演示账号
  const users = [
    {
      email: "B01812585@student.uws.ac.uk",
      password: "password123",
      fullName: "Jiali Ling",
      role: "participant",
      profile: {
        dateOfBirth: new Date("2004-09-11"),
        phone: "+44 7522 291350",
        address: "Edinburgh, Scotland",
        emergencyContact: "Family Contact - +44 7522 000000"
      }
    },
    {
      email: "jiali.ling@example.com",
      password: "password123",
      fullName: "Jiali Ling",
      role: "participant",
      profile: {}
    },
    {
      email: "yuhan.shi@example.com",
      password: "password123",
      fullName: "Yuhan Shi",
      role: "participant",
      profile: {}
    },
    {
      email: "admin@example.com",
      password: "admin123",
      fullName: "Admin",
      role: "admin",
      profile: {}
    }
  ];

  for (const u of users) {
    let user = await prisma.user.findUnique({ where: { email: u.email } });
    const hash = await bcrypt.hash(u.password, 10);
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: u.email,
          passwordHash: hash,
          role: u.role,
          emailVerified: true
        }
      });
      console.log(`Created user: ${u.email}`);
    } else {
      await prisma.user.update({
        where: { email: u.email },
        data: { passwordHash: hash, role: u.role, emailVerified: true }
      });
      console.log(`Updated user: ${u.email}`);
    }
    // Upsert profile
    if (u.profile && Object.keys(u.profile).length > 0) {
      await prisma.userProfile.upsert({
        where: { userId: user.id },
        update: { ...u.profile, fullName: u.fullName },
        create: { userId: user.id, ...u.profile, fullName: u.fullName }
      });
    }
  }

  const existingEvent1 = await prisma.event.findFirst({
    where: { name: "Paisley Highland Games 2025" }
  });
  
  const existingEvent2 = await prisma.event.findFirst({
    where: { name: "Stirling Highland Festival 2025" }
  });

  let event1, event2;

  if (existingEvent1) {
    event1 = await prisma.event.update({
      where: { id: existingEvent1.id },
      data: {
        date: new Date("2025-12-15T10:00:00Z"),
        registrationStart: new Date("2025-10-01"),
        registrationEnd: new Date("2025-12-10")
      }
    });
    console.log("Updated Paisley Highland Games 2025 date");
  } else {
    event1 = await prisma.event.create({
      data: {
        name: "Paisley Highland Games 2025",
        description: "Traditional Highland athletics featuring caber toss, stone put, hammer throw, and Highland dancing.",
        date: new Date("2025-12-15T10:00:00Z"),
        location: "Paisley, Scotland",
        registrationOpen: true,
        registrationStart: new Date("2025-10-01"),
        registrationEnd: new Date("2025-12-10"),
        maxParticipants: 200,
        rules: "All competitors must be 18+ and sign liability waiver."
      }
    });
  }

  if (existingEvent2) {
    event2 = await prisma.event.update({
      where: { id: existingEvent2.id },
      data: {
        date: new Date("2026-01-20T09:00:00Z")
      }
    });
    console.log("Updated Stirling Highland Festival 2025 date");
  } else {
    event2 = await prisma.event.create({
      data: {
        name: "Stirling Highland Festival 2025",
        description: "Annual Highland Festival with traditional games and cultural events.",
        date: new Date("2026-01-20T09:00:00Z"),
        location: "Stirling, Scotland",
        registrationOpen: true,
        maxParticipants: 150
      }
    });
  }

  if (!existingEvent1) {
    await prisma.winner.createMany({
      data: [
        { eventId: event1.id, category: "Caber Toss", athlete: "Hamish MacLeod", position: 1, year: 2024 },
        { eventId: event1.id, category: "Stone Put", athlete: "Fergus Campbell", position: 1, year: 2024 },
        { eventId: event1.id, category: "Hammer Throw", athlete: "Duncan Stewart", position: 1, year: 2024 },
        { eventId: event1.id, category: "Highland Dancing", athlete: "Moira Fraser", position: 1, year: 2024 },
        { eventId: event1.id, category: "Caber Toss", athlete: "Angus MacDonald", position: 1, year: 2023 },
        { eventId: event1.id, category: "Stone Put", athlete: "Ian Murray", position: 1, year: 2023 }
      ]
    });

    await prisma.announcement.createMany({
      data: [
        {
          eventId: event1.id,
          title: "Registration Now Open",
          content: "Registration for Paisley Highland Games 2025 is now open.",
          type: "general"
        },
        {
          eventId: event1.id,
          title: "Safety Protocols",
          content: "Please review the safety guidelines before the event.",
          type: "important"
        }
      ]
    });
  }
  
  console.log("Database seeded successfully");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

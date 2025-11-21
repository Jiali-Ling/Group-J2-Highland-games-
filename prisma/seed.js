import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");
  
  const existingUser = await prisma.user.findFirst();
  if (!existingUser) {
    const user1 = await prisma.user.create({
      data: {
        email: "duncan@highlands.com",
        passwordHash: await bcrypt.hash("password123", 10),
        role: "participant",
        emailVerified: true
      }
    });
    
    await prisma.userProfile.create({
      data: {
        userId: user1.id,
        fullName: "Duncan MacDougall",
        dateOfBirth: new Date("1990-05-15"),
        phone: "+44 141 555 0123",
        address: "123 High Street, Paisley, Scotland",
        emergencyContact: "Mary MacDougall - +44 141 555 0124"
      }
    });
    
    const user2 = await prisma.user.create({
      data: {
        email: "john@example.com",
        passwordHash: await bcrypt.hash("password123", 10),
        role: "participant",
        emailVerified: true
      }
    });
    
    await prisma.userProfile.create({
      data: {
        userId: user2.id,
        fullName: "John Campbell",
        dateOfBirth: new Date("1988-03-20"),
        phone: "+44 141 555 0125"
      }
    });
    
    const team = await prisma.team.create({
      data: {
        name: "Highland Warriors",
        description: "A team of dedicated Highland Games athletes",
        inviteCode: "TEST1234",
        ownerId: user1.id
      }
    });
    
    await prisma.teamMember.createMany({
      data: [
        { teamId: team.id, userId: user1.id, role: "owner" },
        { teamId: team.id, userId: user2.id, role: "member" }
      ]
    });
    
    console.log("Users created: duncan@highlands.com, john@example.com (password123)");
  }

  const existing = await prisma.event.findFirst();
  if (existing) {
    console.log("Database already seeded");
    return;
  }

  const event1 = await prisma.event.create({
    data: {
      name: "Paisley Highland Games 2025",
      description: "Traditional Highland athletics featuring caber toss, stone put, hammer throw, and Highland dancing.",
      date: new Date("2025-08-15T10:00:00Z"),
      location: "Paisley, Scotland",
      registrationOpen: true,
      registrationStart: new Date("2025-06-01"),
      registrationEnd: new Date("2025-08-10"),
      maxParticipants: 200,
      rules: "All competitors must be 18+ and sign liability waiver."
    }
  });

  const event2 = await prisma.event.create({
    data: {
      name: "Stirling Highland Festival 2025",
      description: "Annual Highland Festival with traditional games and cultural events.",
      date: new Date("2025-09-20T09:00:00Z"),
      location: "Stirling, Scotland",
      registrationOpen: true,
      maxParticipants: 150
    }
  });

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
  
  console.log("Database seeded successfully");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

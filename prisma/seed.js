import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");
  
  const existingUser = await prisma.user.findUnique({
    where: { email: "B01812585@student.uws.ac.uk" }
  });
  
  if (existingUser) {
    console.log("Updating existing user profile...");
    await prisma.userProfile.upsert({
      where: { userId: existingUser.id },
      update: {
        fullName: "Jiali Ling",
        dateOfBirth: new Date("2004-09-11"),
        phone: "+44 7522 291350",
        address: "Edinburgh, Scotland",
        emergencyContact: "Family Contact - +44 7522 000000"
      },
      create: {
        userId: existingUser.id,
        fullName: "Jiali Ling",
        dateOfBirth: new Date("2004-09-11"),
        phone: "+44 7522 291350",
        address: "Edinburgh, Scotland",
        emergencyContact: "Family Contact - +44 7522 000000"
      }
    });
    console.log("User profile updated successfully");
  }
  
  const demoPassword = "DemoPassword123!";
  const passwordHash = await bcrypt.hash(demoPassword, 10);
  
  if (!existingUser) {
    const user1 = await prisma.user.create({
      data: {
        email: "demo+owner@example.com",
        passwordHash: passwordHash,
        role: "participant",
        emailVerified: true
      }
    });
    
    await prisma.userProfile.create({
      data: {
        userId: user1.id,
        fullName: "Demo Owner",
        dateOfBirth: new Date("2000-01-01"),
        phone: "+44 0000 000000",
        address: "Demo Address, Scotland",
        emergencyContact: "Demo Emergency Contact"
      }
    });
    
    const user2 = await prisma.user.create({
      data: {
        email: "demo+member1@example.com",
        passwordHash: passwordHash,
        role: "participant",
        emailVerified: true
      }
    });
    
    await prisma.userProfile.create({
      data: {
        userId: user2.id,
        fullName: "Demo Member One",
        dateOfBirth: new Date("2000-01-15"),
        phone: "+44 0000 000001"
      }
    });
    
    const user3 = await prisma.user.create({
      data: {
        email: "demo+member2@example.com",
        passwordHash: passwordHash,
        role: "participant",
        emailVerified: true
      }
    });
    
    await prisma.userProfile.create({
      data: {
        userId: user3.id,
        fullName: "Demo Member Two",
        dateOfBirth: new Date("2000-06-20"),
        phone: "+44 0000 000002"
      }
    });
    
    const team = await prisma.team.create({
      data: {
        name: "Demo Team",
        description: "A demonstration team for testing purposes",
        inviteCode: "DEMO1234",
        ownerId: user1.id
      }
    });
    
    await prisma.teamMember.createMany({
      data: [
        { teamId: team.id, userId: user1.id, role: "owner" },
        { teamId: team.id, userId: user2.id, role: "member" },
        { teamId: team.id, userId: user3.id, role: "member" }
      ]
    });
    
    console.log("Demo users created: demo+owner@example.com, demo+member1@example.com, demo+member2@example.com (DemoPassword123!)");
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

// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");
  
  // Create test users if they don't exist
  const existingUser = await prisma.user.findFirst();
  if (!existingUser) {
    console.log("Creating test users...");
    
    // Test participant account with profile
    const user1 = await prisma.user.create({
      data: {
        email: "test@example.com",
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
    
    // Another test participant
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
    
    // Create a test team
    const team = await prisma.team.create({
      data: {
        name: "Highland Warriors",
        description: "A team of dedicated Highland Games athletes",
        inviteCode: "TEST1234",
        ownerId: user1.id
      }
    });
    
    // Add team members
    await prisma.teamMember.createMany({
      data: [
        { teamId: team.id, userId: user1.id, role: "owner" },
        { teamId: team.id, userId: user2.id, role: "member" }
      ]
    });
    
    console.log("✅ Test users created!");
    console.log("   - test@example.com / password123 (Duncan MacDougall)");
    console.log("   - john@example.com / password123 (John Campbell)");
    console.log("   - Test Team: Highland Warriors (Invite Code: TEST1234)");
  }

  const existing = await prisma.event.findFirst();
  if (existing) {
    console.log("✅ Database already seeded!");
    return;
  }

  // Create events
  const event1 = await prisma.event.create({
    data: {
      name: "Paisley Highland Games 2025",
      description: "Traditional Highland athletics featuring caber toss, stone put, hammer throw, and Highland dancing. Join us for a celebration of Scottish culture and athletic prowess!",
      date: new Date("2025-08-15T10:00:00Z"),
      location: "Paisley, Scotland",
      registrationOpen: true,
      registrationStart: new Date("2025-06-01"),
      registrationEnd: new Date("2025-08-10"),
      maxParticipants: 200,
      rules: "All competitors must be 18+ and sign liability waiver. Safety equipment provided."
    }
  });

  const event2 = await prisma.event.create({
    data: {
      name: "Stirling Highland Festival 2025",
      description: "Annual Highland Festival with traditional games, pipe bands, and cultural events.",
      date: new Date("2025-09-20T09:00:00Z"),
      location: "Stirling, Scotland",
      registrationOpen: true,
      maxParticipants: 150
    }
  });

  // Create historical winners
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

  // Create announcements
  await prisma.announcement.createMany({
    data: [
      {
        eventId: event1.id,
        title: "Registration Now Open!",
        content: "Registration for Paisley Highland Games 2025 is now open. Sign up early to secure your spot!",
        type: "general"
      },
      {
        eventId: event1.id,
        title: "New Safety Protocols",
        content: "Please review the updated safety guidelines before the event. All participants must attend the safety briefing.",
        type: "important"
      }
    ]
  });
  
  console.log("✅ Database seeded successfully!");
  console.log("   - 2 Events created");
  console.log("   - 6 Historical winners added");
  console.log("   - 2 Announcements published");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

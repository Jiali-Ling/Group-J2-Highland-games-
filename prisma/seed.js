
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function upsertUser({ email, password, role = "participant", fullName, profile = {} }) {
  const emailNorm = email.toLowerCase();
  console.log("Upserting user:", emailNorm);
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.upsert({
    where: { email: emailNorm },
    update: { passwordHash: hash, role, emailVerified: true },
    create: { email: emailNorm, passwordHash: hash, role, emailVerified: true },
  });
  if (profile && Object.keys(profile).length > 0) {
    await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: { ...profile, fullName },
      create: { userId: user.id, ...profile, fullName },
    });
  }
  return user;
}

async function upsertEvent(keyName, data) {
  const existing = await prisma.event.findFirst({ where: { name: keyName } });
  if (existing) {
    return prisma.event.update({ where: { id: existing.id }, data });
  }
  return prisma.event.create({ data: { name: keyName, ...data } });
}

async function main() {
  console.log("Seeding database...");
  const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase();
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
  await upsertUser({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: "admin", fullName: "Admin" });
  const jiali = await upsertUser({
    email: "b01812585@student.uws.ac.uk",
    password: "password123",
    role: "participant",
    fullName: "Jiali Ling",
    profile: {
      dateOfBirth: new Date("2004-09-11"),
      phone: "+44 7522 291350",
      address: "Edinburgh, Scotland",
      emergencyContact: "Family Contact - +44 7522 000000",
    },
  });
  const jiali2 = await upsertUser({ email: "jiali.ling@example.com",  password: "password123", role: "participant", fullName: "Jiali Ling" });
  const yuhan = await upsertUser({ email: "yuhan.shi@example.com",   password: "password123", role: "participant", fullName: "Yuhan Shi" });

  // Upsert three teams (two for Yuhan Shi)
  await prisma.team.upsert({
    where: { inviteCode: "JIALITEAM1" },
    update: { name: "Jiali's Caber Tossers", description: "Team led by Jiali Ling", ownerId: jiali.id },
    create: { name: "Jiali's Caber Tossers", description: "Team led by Jiali Ling", inviteCode: "JIALITEAM1", ownerId: jiali.id },
  });
  await prisma.team.upsert({
    where: { inviteCode: "YUHANTEAM1" },
    update: { name: "Yuhan's Stone Putters", description: "Team led by Yuhan Shi", ownerId: yuhan.id },
    create: { name: "Yuhan's Stone Putters", description: "Team led by Yuhan Shi", inviteCode: "YUHANTEAM1", ownerId: yuhan.id },
  });
  await prisma.team.upsert({
    where: { inviteCode: "YUHANTEAM2" },
    update: { name: "Yuhan's Hammer Throwers", description: "Second team led by Yuhan Shi", ownerId: yuhan.id },
    create: { name: "Yuhan's Hammer Throwers", description: "Second team led by Yuhan Shi", inviteCode: "YUHANTEAM2", ownerId: yuhan.id },
  });
  const event1 = await upsertEvent("Paisley Highland Games 2025", {
    description: "Traditional Highland athletics featuring caber toss, stone put, hammer throw, and Highland dancing.",
    date: new Date("2025-12-15T10:00:00Z"),
    location: "Paisley, Scotland",
    registrationOpen: true,
    registrationStart: new Date("2025-10-01"),
    registrationEnd: new Date("2025-12-10"),
    maxParticipants: 200,
    rules: "All competitors must be 18+ and sign liability waiver.",
  });
  await upsertEvent("Stirling Highland Festival 2025", {
    description: "Annual Highland Festival with traditional games and cultural events.",
    date: new Date("2026-01-20T09:00:00Z"),
    location: "Stirling, Scotland",
    registrationOpen: true,
    maxParticipants: 150,
  });
  const winnersCount = await prisma.winner.count({ where: { eventId: event1.id } });
  if (winnersCount === 0) {
    await prisma.winner.createMany({
      data: [
        { eventId: event1.id, category: "Caber Toss",        athlete: "Hamish MacLeod", position: 1, year: 2024 },
        { eventId: event1.id, category: "Stone Put",         athlete: "Fergus Campbell", position: 1, year: 2024 },
        { eventId: event1.id, category: "Hammer Throw",      athlete: "Duncan Stewart",  position: 1, year: 2024 },
        { eventId: event1.id, category: "Highland Dancing",  athlete: "Moira Fraser",     position: 1, year: 2024 },
      ],
    });
  }
  const annCount = await prisma.announcement.count({ where: { eventId: event1.id } });
  if (annCount === 0) {
    await prisma.announcement.createMany({
      data: [
        { eventId: event1.id, title: "Registration Now Open", content: "Registration for Paisley Highland Games 2025 is now open.", type: "general" },
        { eventId: event1.id, title: "Safety Protocols",      content: "Please review the safety guidelines before the event.",      type: "important" },
      ],
    });
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});

import { prisma } from "../utils/db.server";
import { json } from "@remix-run/node";
import { useLoaderData, Link, useSearchParams } from "@remix-run/react";
import eventDetailStyles from "../styles/event-detail.css?url";

export const links = () => [{ rel: "stylesheet", href: eventDetailStyles }];

export async function loader({ params }) {
  const event = await prisma.event.findUnique({ where: { id: Number(params.id) } });
  if (!event) throw new Response("Not Found", { status: 404 });
  return json({ event });
}

export default function EventDetail() {
  const { event } = useLoaderData();
  const [sp] = useSearchParams();
  const registered = sp.get("registered") === "1";
  
  return (
    <main className="event-detail-page">
      <div className="event-detail-card">
        <h1 className="event-title">{event.name}</h1>
        <p className="event-description">{event.description}</p>
        
        <div className="event-meta">
          <div className="event-datetime">
            {new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          <div className="event-location">{event.location}</div>
        </div>

        <div style={{ marginTop: "32px", padding: "24px", background: "rgba(255,255,255,0.04)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <h3 style={{ marginTop: 0, marginBottom: "16px", color: "var(--brand)" }}>Highland Games Competition Events</h3>
          
          <h4 style={{ color: "var(--text)", marginTop: "20px", marginBottom: "12px" }}>🏋️ Heavy Events</h4>
          <ul style={{ lineHeight: "1.8", color: "var(--muted)", marginBottom: "20px" }}>
            <li><strong>Caber Toss:</strong> The most iconic event! Flip a log weighing up to 11 stone so it lands in the 12 o'clock position. Judged on style, not distance. Rumoured to stem from tossing logs over chasms.</li>
            <li><strong>Hammer Throw:</strong> Swing and throw a heavy hammer with wooden handle for maximum distance. This event inspired the modern Olympic hammer throw after Baron de Coubertin witnessed it at the 1889 Paris Exhibition.</li>
            <li><strong>Stone Put:</strong> Similar to shot put, athletes throw a heavy stone for distance using traditional Highland technique.</li>
            <li><strong>Weight for Height:</strong> Throw a weight over a horizontal bar using one hand. Look out for "the handbag technique" - named after the starting position!</li>
            <li><strong>Tug o' War:</strong> Clan teams go head-to-head testing strength and teamwork in fierce competition.</li>
          </ul>

          <h4 style={{ color: "var(--text)", marginTop: "20px", marginBottom: "12px" }}>💃 Highland Dancing</h4>
          <ul style={{ lineHeight: "1.8", color: "var(--muted)", marginBottom: "20px" }}>
            <li><strong>Highland Fling:</strong> The most famous Highland dance, originally an all-male event until the late 19th century.</li>
            <li><strong>Sword Dance:</strong> Dancers perform intricate footwork around crossed swords laid on the ground.</li>
            <li><strong>Seann Triubhas:</strong> A dance celebrating freedom from English rule, pronounced "shawn trews".</li>
          </ul>

          <h4 style={{ color: "var(--text)", marginTop: "20px", marginBottom: "12px" }}>🏃 Field Events</h4>
          <ul style={{ lineHeight: "1.8", color: "var(--muted)", marginBottom: "20px" }}>
            <li><strong>Hill Race:</strong> Dating back to King Malcolm III in the 11th century who raced runners to the summit to find his fastest courier.</li>
            <li><strong>Cycling Competition:</strong> Test your speed and stamina on the Highland course.</li>
          </ul>

          <h4 style={{ color: "var(--text)", marginTop: "20px", marginBottom: "12px" }}>🎵 Music</h4>
          <ul style={{ lineHeight: "1.8", color: "var(--muted)" }}>
            <li><strong>Solo Piping:</strong> Compete in various styles including the Pibroch - the classical music of the bagpipe.</li>
            <li><strong>Massed Bands:</strong> Experience hundreds of pipers and drummers playing together in stunning unison.</li>
          </ul>

          <p style={{ marginTop: "20px", padding: "12px", background: "rgba(107,183,255,0.1)", borderRadius: "6px", fontSize: "14px", fontStyle: "italic", border: "1px solid rgba(107,183,255,0.3)" }}>
            💡 <strong>Did you know?</strong> The Royal Scottish Highland Games Association welcomes competitors of all ages and skill levels. 
            Choose your event during registration and join Scotland's centuries-old tradition!
          </p>
        </div>

        <div className="event-actions">
          <Link to="register" className="register-link">
            Join the Competition →
          </Link>
        </div>

        {registered && (
          <div className="success-message">
            ✅ Your registration has been submitted successfully!
          </div>
        )}
      </div>
    </main>
  );
}

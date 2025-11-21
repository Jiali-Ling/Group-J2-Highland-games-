import { prisma } from "../utils/db.server";
import { json } from "@remix-run/node";
import { useLoaderData, Link, Form } from "@remix-run/react";
import eventsStyles from "../styles/events.css?url";

export const links = () => [{ rel: "stylesheet", href: eventsStyles }];

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim();
  const fromDate = url.searchParams.get("from");
  const toDate = url.searchParams.get("to");
  
  const where = {};
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { location: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } }
    ];
  }
  if (fromDate || toDate) {
    where.date = {};
    if (fromDate) where.date.gte = new Date(fromDate);
    if (toDate) where.date.lte = new Date(toDate);
  }
  
  const events = await prisma.event.findMany({ where, orderBy: { date: "asc" } });
  return json({ events, q: q || "", fromDate: fromDate || "", toDate: toDate || "" });
}

export default function Events() {
  const { events, q, fromDate, toDate } = useLoaderData();
  return (
    <main className="container events-page">
      <h2>Upcoming Events</h2>
      <Form method="get" className="search-form">
        <div className="search-row">
          <div className="search-field">
            <label htmlFor="q">Search</label>
            <input id="q" name="q" placeholder="Name, location, or description" defaultValue={q} />
          </div>
          <div className="search-field">
            <label htmlFor="from">From Date</label>
            <input id="from" name="from" type="date" defaultValue={fromDate} />
          </div>
          <div className="search-field">
            <label htmlFor="to">To Date</label>
            <input id="to" name="to" type="date" defaultValue={toDate} />
          </div>
          <button type="submit" className="btn btn-primary search-btn">Search</button>
        </div>
      </Form>
      
      {events.length === 0 ? (
        <p className="empty-state">No events found. Try adjusting your search.</p>
      ) : (
        <div className="events-grid">
          {events.map(e => (
            <Link key={e.id} to={`/events/${e.id}`} className="event-card">
              <h3>{e.name}</h3>
              <p className="event-desc">{e.description}</p>
              <div className="event-meta">
                <span className="event-date">📅 {new Date(e.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="event-location">📍 {e.location}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

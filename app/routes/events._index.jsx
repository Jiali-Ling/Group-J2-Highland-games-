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
            <input id="from" name="from" type="date" defaultValue={fromDate} lang="en-US" />
          </div>
          <div className="search-field">
            <label htmlFor="to">To Date</label>
            <input id="to" name="to" type="date" defaultValue={toDate} lang="en-US" />
          </div>
          <button type="submit" className="btn btn-primary search-btn">Search</button>
        </div>
      </Form>
      
      {events.length === 0 ? (
        <p className="empty-state">No events found. Try adjusting your search.</p>
      ) : (
        <div className="events-grid">
          {events.map((e, index) => {
            const eventDate = new Date(e.date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            
            const eventImages = [
              '/images/1938ae1dfdf1494b5227a5e724ba7e9.png',
              '/images/45178760afd62401fb4157adb859434.png'
            ];
            const backgroundImage = eventImages[index % eventImages.length];
            
            return (
              <Link key={e.id} to={`/events/${e.id}`} className="event-card">
                <div className="event-card-image" style={{ backgroundImage: `url('${backgroundImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="event-date-badge">
                    <span className="event-date-badge-day">{day}</span>
                    <span className="event-date-badge-month">{month}</span>
                  </div>
                </div>
                <div className="event-card-content">
                  <h3>{e.name}</h3>
                  <p className="event-desc">{e.description}</p>
                  <div className="event-meta">
                    <span className="event-date">📅 {eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="event-location">📍 {e.location}</span>
                  </div>
                  <span className="event-cta">EVENT DETAILS</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}

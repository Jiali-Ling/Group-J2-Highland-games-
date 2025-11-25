import { prisma } from "../utils/db.server";
import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams, Link, Outlet } from "@remix-run/react";
import eventDetailStyles from "../styles/event-detail.css?url";

export const links = () => [{ rel: "stylesheet", href: eventDetailStyles }];

export async function loader({ params }) {
  const event = await prisma.event.findUnique({ where: { id: Number(params.id) } });
  if (!event) throw new Response("Not Found", { status: 404 });
  return json({ event });
}

function formatEventDate(dateString) {
  const date = new Date(dateString);
  const options = { 
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  };
  return date.toLocaleDateString('en-US', options);
}

function formatEventTime(dateString) {
  const date = new Date(dateString);
  const options = { 
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  };
  return date.toLocaleTimeString('en-US', options);
}

export default function EventDetail() {
  const { event } = useLoaderData();
  const [sp] = useSearchParams();
  const registered = sp.get("registered") === "1";
  
  return (
    <>
      <main className="event-detail-page">
        <div className="hero-image-section">
          <div className="hero-overlay"></div>
          <h1 className="hero-title">{event.name}</h1>
        </div>

        <div className="content-container">
          <div className="main-content">
            <section className="map-section">
              <h2>Event Location</h2>
              <div className="map-container">
                <iframe
                  className="google-map"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Paisley,Scotland&zoom=13&language=en`}
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Event Location Map"
                />
                <div className="location-info">
                  <h4>📍 {event.location}</h4>
                  <p>Paisley, Scotland is the historic home of the Royal Scottish Highland Games, featuring scenic landscapes and traditional competition grounds perfect for authentic Highland events.</p>
                </div>
              </div>
            </section>

            <section className="event-description-section">
              <h2>About This Event</h2>
              <p className="event-description">{event.description}</p>
            </section>

            <section className="competition-events">
              <h2>Highland Games Competition Events</h2>
              
              <div className="event-category">
                <h3>🏋️ Heavy Events</h3>
                <ul>
                  <li><strong>Caber Toss:</strong> A truly spectacular Scottish tradition! Athletes must balance and flip a massive tapered pole (caber) made from larch tree, typically 16-20 feet tall and weighing 90-150 pounds. The goal is to make it turn end-over-end, landing at "12 o'clock" position directly away from the thrower. Scoring is based on accuracy of the fall direction rather than distance - perfect execution is when it falls straight ahead!</li>
                  <li><strong>Scottish Hammer Throw:</strong> The precursor to modern Olympic hammer throw! This ancient Highland event uses a round metal ball (16-22 lb for men, 12-16 lb for women) attached to a 4-foot shaft made of wood, bamboo, or rattan. With feet firmly planted, athletes whirl the hammer around their head and release it over the shoulder for maximum distance. Throwers use specially designed footwear with flat blades to dig into turf and resist centrifugal forces.</li>
                  <li><strong>Stone Put (Braemar Stone):</strong> Ancient Highland strength test! Similar to modern shot put but using natural stones (20-30 lb for men, 13-18 lb for women). In the Braemar Stone variant, no run-up is allowed - it's a standing put only. Athletes must keep the stone cradled against their neck until release. This traditional competition predates modern athletics by centuries and requires pure strength and Highland technique.</li>
                  <li><strong>Weight for Height:</strong> A true test of explosive power! Competitors toss a 56 lb weight (42 lb masters, 28 lb women) with an attached handle over a horizontal bar using only one hand. The weight must be kept between the legs before swinging upward in a pendulum motion and releasing at its apex. Each athlete gets three attempts per height, with the bar raised progressively higher. Fewest misses break ties!</li>
                  <li><strong>Maide-Leisg (Lazy Stick):</strong> Traditional Gaelic strength trial! Two competitors sit facing each other with feet pressed together, gripping a stick between them. Each pulls until one is lifted from the ground. This ancient test of core strength and determination dates back centuries in Highland communities. The oldest maide-leisg competition in the world takes place at Carloway on the Isle of Lewis.</li>
                </ul>
              </div>

              <div className="event-category">
                <h3>💃 Highland Dancing</h3>
                <ul>
                  <li><strong>Highland Fling:</strong> Scotland's most iconic dance! Originally performed exclusively by males until the late 19th century, this vigorous dance celebrates victory in battle. Dancers must maintain perfect balance on one spot throughout, with arms raised high mimicking a stag's antlers. The intricate footwork and demanding stamina required make this the ultimate test of Highland dance technique.</li>
                  <li><strong>Sword Dance (Ghillie Callum):</strong> Ancient warrior tradition! Dancers perform precise, intricate footwork over and around crossed swords laid on the ground. Legend says warriors danced over their crossed swords before battle - touching the blades was a bad omen. Today's competition demands perfect technique, stamina, and nerve as dancers leap between and over sharp blades in full Highland dress.</li>
                  <li><strong>Seann Triubhas:</strong> A dance of freedom and defiance! Pronounced "shawn trews", this dance celebrates liberation from the 1746-1782 ban on Highland dress (tartan and kilts). The graceful, flowing leg movements symbolize shaking off the hated trousers (trews) that Highlanders were forced to wear. It tells the story of Scotland's cultural resistance through elegant, dramatic choreography.</li>
                </ul>
              </div>

              <div className="event-category">
                <h3>🏃 Athletic Events</h3>
                <ul>
                  <li><strong>Hill Race:</strong> Royal Scottish tradition dating to King Malcolm III (1031-1093)! The King summoned men to race up Craig Choinnich overlooking Braemar to find the fastest runner in Scotland to serve as his royal messenger. Modern hill races maintain this heritage, challenging competitors to sprint uphill in full Highland dress through demanding Scottish terrain.</li>
                  <li><strong>Highland Sprint:</strong> Traditional Scottish foot race! Competitors dash across the games field in authentic Highland dress including kilt, sporran, and ghillie brogues. This tests pure speed while honoring Scottish heritage. Unlike modern track events, runners must maintain their Highland attire throughout, adding extra challenge and cultural authenticity to the competition.</li>
                </ul>
              </div>

              <div className="event-category">
                <h3>🎵 Piping Competitions</h3>
                <ul>
                  <li><strong>Pibroch (Piobaireachd):</strong> The classical music of the Great Highland Bagpipe! This ancient form of pipe music dates back centuries and consists of a theme with complex variations. Competitors perform in formal dress, judged on technical precision, interpretation, and mastery of this most challenging bagpipe genre. The Royal Scottish Highland Games Association hosts prestigious pibroch competitions attracting world-class pipers.</li>
                  <li><strong>March, Strathspey & Reel:</strong> Light music competition showcasing technical skill and musicality! Pipers perform a set of three contrasting tunes: a march (steady rhythm), strathspey (slower, dotted rhythm), and reel (fast, flowing tempo). Judges evaluate tone quality, finger technique, timing, phrasing, and overall musical expression. This is the bread-and-butter of competitive piping.</li>
                  <li><strong>Massed Bands Display:</strong> A thunderous spectacle of Scottish culture! Up to 20 or more pipe bands march and play together, creating an unforgettable wall of sound. Typically featuring crowd favorites like "Scotland the Brave" and "Amazing Grace", this event is often held during opening and closing ceremonies. The sight and sound of hundreds of pipers and drummers performing in perfect unison embodies the spirit of the Highland Games.</li>
                </ul>
              </div>

              <div className="info-note">
                💡 <strong>Did you know?</strong> The Royal Scottish Highland Games Association welcomes competitors of all ages and skill levels. 
                Choose your event during registration and join Scotland's centuries-old tradition!
              </div>
            </section>
          </div>

          <aside className="sidebar">
            <div className="event-details-card">
              <h3>Event Details</h3>
              
              <div className="detail-item">
                <span className="detail-label">Date:</span>
                <span className="detail-value" suppressHydrationWarning>
                  {formatEventDate(event.date)}
                </span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Start:</span>
                <span className="detail-value" suppressHydrationWarning>
                  {formatEventTime(event.date)}
                </span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{event.location}</span>
              </div>
            </div>

            <div className="contacts-card">
              <h3>Contacts</h3>
              <div className="contact-info">
                <p className="contact-title">Event Organizer</p>
                <p className="contact-detail">📧 info@highlandgames.com</p>
                <p className="contact-detail">📞 +44 123 456 7890</p>
              </div>
            </div>

            <Link
              to={`/events/${event.id}/register`}
              className="register-button"
              prefetch="intent"
              style={{ 
                zIndex: 10000, 
                pointerEvents: 'auto', 
                display: 'block', 
                cursor: 'pointer',
                position: 'relative',
                width: '100%',
                marginTop: '20px',
                border: 'none',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                color: 'white',
                padding: '16px 24px',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
                transition: 'all .3s ease'
              }}
            >
              Register for Event
            </Link>

            {registered && (
              <div className="success-message">
                ✅ Your registration has been submitted successfully!
              </div>
            )}
          </aside>
        </div>
      </main>
      <Outlet />
    </>
  );
}

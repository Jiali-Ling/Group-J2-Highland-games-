import { Link } from "@remix-run/react";
import homeStyles from "../styles/home.css?url";

export const links = () => [{ rel: "stylesheet", href: homeStyles }];

export default function Index() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-copy">
              <h1>Paisley Highland Games</h1>
              <p>Welcome! Browse events, register to compete, and view past winners of Scotland's iconic Highland athletics.</p>
              <div className="actions">
                <Link to="/events" className="btn btn-primary">Browse Events →</Link>
                <Link to="/winners" className="btn">Past Winners →</Link>
                <Link to="/teams" className="btn">Teams →</Link>
                <Link to="/admin" className="btn">Admin →</Link>
              </div>
            </div>
          </div>
        </div>
        <a href="#main" className="scroll-down" aria-label="Scroll to content" />
      </section>

      <main id="main" className="container">
        <section className="about-section" style={{ marginBottom: "48px", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "16px" }}>About Paisley Highland Games</h2>
          <div style={{ maxWidth: "900px", margin: "0 auto", lineHeight: "1.8" }}>
            <p style={{ marginBottom: "16px", fontSize: "16px", color: "var(--muted)" }}>
              Scotland's Highland Games are usually one-day events taking place in outdoor spaces across the country. 
              Dating back to the 11th century when King Malcolm III called a foot race to find his fastest courier, 
              these games have evolved into a spectacular celebration of Scottish culture featuring traditional Highland sports, 
              massed pipe bands, Highland dancing, and community festivities.
            </p>
            <p style={{ marginBottom: "16px", fontSize: "16px", color: "var(--muted)" }}>
              <strong style={{ color: "var(--brand)" }}>What to Expect:</strong> Watch competitors test their strength and stamina 
              in heavy events like the iconic Caber Toss (flipping logs up to 11 stone!), Hammer Throw, Weight for Height, 
              and Stone Put. Marvel at the precision of Highland dancers performing the Sword Dance and Highland Fling. 
              Experience the stirring sound of massed pipe bands with hundreds of pipers playing in unison. Enjoy clan gatherings, 
              tug o' war competitions, hill races, and traditional Scottish food and craft stalls.
            </p>
            <p style={{ fontSize: "16px", color: "var(--muted)" }}>
              <strong style={{ color: "var(--brand)" }}>Our Mission:</strong> The Paisley Highland Games preserves these centuries-old 
              traditions, welcoming athletes and spectators to experience Scotland's heritage, community spirit, and the thrilling 
              spectacle of champions competing in events that have shaped modern Olympic sports like the shot put and hammer throw.
            </p>
          </div>
        </section>

        <div className="grid grid-3">
          <div className="card">
            <h3>🎯 Heavy Events & Athletics</h3>
            <p>Caber Toss, Hammer Throw, Stone Put, Weight for Height, Tug o' War, and Hill Races - test your strength and stamina!</p>
          </div>
          <div className="card">
            <h3>💃 Highland Dancing & Music</h3>
            <p>Watch dazzling Highland Fling and Sword Dance performances. Experience massed pipe bands and solo piping competitions.</p>
          </div>
          <div className="card">
            <h3>🏴󠁧󠁢󠁳󠁣󠁴󠁿 Clan Gatherings & Culture</h3>
            <p>Join clan parades, enjoy Scottish food & craft stalls, and celebrate centuries of Highland tradition with the community.</p>
          </div>
        </div>

        <section style={{ marginTop: "4rem", textAlign: "center", padding: "3rem", background: "#f8f9fa", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Ready to Compete?</h2>
          <p style={{ fontSize: "1.1rem", color: "var(--muted)", marginBottom: "2rem", maxWidth: "700px", margin: "0 auto 2rem" }}>
            Register your account, complete your profile, join or create a team, and sign up for Highland Games events!
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/auth?mode=register" className="btn btn-primary">Create Account →</Link>
            <Link to="/profile" className="btn">Your Profile →</Link>
            <Link to="/teams" className="btn">Manage Teams →</Link>
          </div>
        </section>
      </main>
    </>
  );
}

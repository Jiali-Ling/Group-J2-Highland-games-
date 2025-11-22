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

      <main id="main" className="container" style={{ paddingTop: "48px", paddingBottom: "64px" }}>
        <section style={{ 
          background: "white", 
          borderRadius: "16px", 
          padding: "48px 40px", 
          marginBottom: "48px", 
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)" 
        }}>
          <h2 style={{ 
            fontSize: "36px", 
            marginBottom: "24px", 
            textAlign: "center",
            color: "#1e3a8a",
            fontWeight: "700"
          }}>About Paisley Highland Games</h2>
          <div style={{ maxWidth: "900px", margin: "0 auto", lineHeight: "1.8" }}>
            <p style={{ marginBottom: "20px", fontSize: "16px", color: "#4a5568" }}>
              Scotland's Highland Games are usually one-day events taking place in outdoor spaces across the country. 
              Dating back to the 11th century when King Malcolm III called a foot race to find his fastest courier, 
              these games have evolved into a spectacular celebration of Scottish culture featuring traditional Highland sports, 
              massed pipe bands, Highland dancing, and community festivities.
            </p>
            <p style={{ marginBottom: "20px", fontSize: "16px", color: "#4a5568" }}>
              <strong style={{ color: "#1e3a8a" }}>What to Expect:</strong> Watch competitors test their strength and stamina 
              in heavy events like the iconic Caber Toss (flipping logs up to 11 stone!), Hammer Throw, Weight for Height, 
              and Stone Put. Marvel at the precision of Highland dancers performing the Sword Dance and Highland Fling. 
              Experience the stirring sound of massed pipe bands with hundreds of pipers playing in unison. Enjoy clan gatherings, 
              tug o' war competitions, hill races, and traditional Scottish food and craft stalls.
            </p>
            <p style={{ fontSize: "16px", color: "#4a5568" }}>
              <strong style={{ color: "#1e3a8a" }}>Our Mission:</strong> The Paisley Highland Games preserves these centuries-old 
              traditions, welcoming athletes and spectators to experience Scotland's heritage, community spirit, and the thrilling 
              spectacle of champions competing in events that have shaped modern Olympic sports like the shot put and hammer throw.
            </p>
          </div>
        </section>

        <div className="grid grid-3" style={{ marginBottom: "48px" }}>
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

        <section style={{ 
          textAlign: "center", 
          padding: "48px 40px", 
          background: "white", 
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ 
            fontSize: "32px", 
            marginBottom: "16px",
            color: "#1e3a8a",
            fontWeight: "700"
          }}>Ready to Compete?</h2>
          <p style={{ 
            fontSize: "18px", 
            color: "#4a5568", 
            marginBottom: "32px", 
            maxWidth: "700px", 
            margin: "0 auto 32px",
            lineHeight: "1.6"
          }}>
            Register your account, complete your profile, join or create a team, and sign up for Highland Games events!
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/auth?mode=register" className="btn btn-primary">Create Account →</Link>
            <Link to="/auth?mode=login" className="btn btn-primary" style={{ background: "#059669" }}>Sign In →</Link>
            <Link to="/events" className="btn btn-primary" style={{ background: "#dc2626" }}>Browse Events →</Link>
          </div>
        </section>
      </main>
    </>
  );
}

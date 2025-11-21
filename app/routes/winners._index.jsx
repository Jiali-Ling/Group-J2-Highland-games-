import { prisma } from "../utils/db.server";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import winnersStyles from "../styles/winners.css?url";

export const links = () => [{ rel: "stylesheet", href: winnersStyles }];

export async function loader({ request }) {
  const url = new URL(request.url);
  const year = Number(url.searchParams.get("year")) || undefined;
  const where = year ? { year } : {};
  const winners = await prisma.winner.findMany({
    where,
    orderBy: [{ year: "desc" }, { position: "asc" }]
  });
  const years = await prisma.winner.findMany({ select: { year: true }, distinct: ["year"], orderBy: { year: "desc" } });
  return json({ winners, years: years.map(y => y.year), year: year || "" });
}

export default function Winners() {
  const { winners, years, year } = useLoaderData();
  return (
    <main className="container winners-page">
      <div className="winners-header">
        <h2>Champions of the Highland Games</h2>
      </div>

      <Form method="get" className="winners-filter">
        <label>
          Filter by Year:
          <select name="year" defaultValue={year}>
            <option value="">All Years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <button type="submit">Apply Filter</button>
      </Form>

      {winners.length === 0 ? (
        <div className="no-results">
          <p>No champions found for the selected criteria.</p>
        </div>
      ) : (
        <ul className="winners-list">
          {winners.map(w => (
            <li key={w.id} className="winner-item">
              <div className="winner-info">
                <span className="winner-year">{w.year}</span>
                <span className="winner-category">{w.category}</span>
                <span className="winner-athlete">{w.athlete}</span>
              </div>
              <span className="winner-position">#{w.position}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

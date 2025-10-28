import React, { useEffect, useState } from "react";
import "./products.css"

export default function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:10000/products", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(async (res) => {
        if (!res.ok) {
          const ct = res.headers.get("content-type") || "";
          const body = ct.includes("application/json") ? await res.json() : await res.text();
          throw new Error(typeof body === "string" ? body : body.error || "Unknown error");
        }
        return res.json();
      })
      .then((rows) => {
        if (!Array.isArray(rows)) throw new Error("Expected array from /products");
        setData(rows);
        setError(null);
      })
      .catch((err) => {
        console.error("Products fetch error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false)); 
  }, []);

  if (loading) return <div className="container py-3">Loading...</div>;
  if (error)
    return (
      <div className="container py-3">
        <div className="alert alert-danger">Failed to load products: {error}</div>
      </div>
    );

  return (
    <div className="container py-3">
  <div className="row gx-3 gy-3">
    {data.slice(0, 10).map((p, i) => (
      <div className="col-12 col-md-4" key={p.id ?? i}>
        <div className="card h-100 text-center shadow-sm">
          {p.image && (
            <img
              src={p.image}
              alt={p.title ?? "product"}
              className="card-img-top p-2"
            />
          )}
          <div className="card-body p-3">
            <h6 className="card-title mb-2">{p.title}</h6>
            <p className="card-text mb-0">
              {p.price != null ? `${p.price} €` : "No price"}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
  <footer className="footer mt-5 p-3">
    <p>© 2025 Your Shop. All rights reserved.</p>
  </footer>
</div>
  );
}

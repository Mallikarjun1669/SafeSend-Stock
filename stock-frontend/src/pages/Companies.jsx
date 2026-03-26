// src/pages/Companies.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import "../styles/companies.css";
import { useSelector } from "react-redux";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";

function extractError(e) {
  const data = e?.response?.data;
  if (!data) return e?.message || "Something went wrong.";
  if (data.errors) return Object.values(data.errors).flat().join(" ");
  if (data.detail) return data.detail;
  if (data.title) return data.title;
  if (typeof data === "string") return data;
  return e?.message || "Something went wrong.";
}

function PriceChange({ price, previousPrice }) {
  if (price == null) return <span className="stock-price">-</span>;

  const hasPrev = previousPrice != null;
  const change  = hasPrev ? price - previousPrice : 0;
  const pct     = hasPrev && previousPrice !== 0 ? (change / previousPrice) * 100 : 0;
  const isUp    = change >= 0;
  const color   = !hasPrev ? "#aaa" : isUp ? "#22c55e" : "#ef4444";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
      <span className="stock-price">${Number(price).toFixed(4)}</span>
      {hasPrev && (
        <span style={{ fontSize: 11, color, fontWeight: 600 }}>
          {isUp ? "▲" : "▼"} {isUp ? "+" : ""}{change.toFixed(4)} ({isUp ? "+" : ""}{pct.toFixed(2)}%)
        </span>
      )}
    </div>
  );
}

// ── Custom Tooltip ──
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: "#1a1a2e",
      border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 12,
      color: "#e0e0e0",
    }}>
      <div style={{ fontWeight: 700, marginBottom: 2 }}>{d.label}</div>
      <div style={{ color: "#a78bfa" }}>
        Price: <strong>${Number(d.price).toFixed(4)}</strong>
      </div>
    </div>
  );
}

// ── Stock Price Chart ──
function StockPriceChart({ stocks }) {
  const chartData = [];

  stocks.forEach((s) => {
    const prev = s.previousPrice != null ? s.previousPrice : s.price;
    chartData.push({ label: `${s.symbol} (prev)`, price: prev, symbol: s.symbol });
    chartData.push({ label: s.symbol, price: s.price, symbol: s.symbol });
  });

  if (chartData.length === 0) return null;

  const prices    = chartData.map((d) => d.price);
  const minPrice  = Math.min(...prices);
  const maxPrice  = Math.max(...prices);
  const padding   = (maxPrice - minPrice) * 0.15 || 5;

  const firstPrice = chartData[0].price;
  const lastPrice  = chartData[chartData.length - 1].price;
  const isUp       = lastPrice >= firstPrice;
  const lineColor  = isUp ? "#22c55e" : "#ef4444";
  const gradientId = isUp ? "greenGrad" : "redGrad";

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      borderRadius: 12,
      padding: "16px 8px 8px",
      marginBottom: 20,
      border: "1px solid rgba(255,255,255,0.07)",
    }}>
      <div style={{
        fontSize: 12,
        fontWeight: 600,
        color: "#a78bfa",
        marginBottom: 8,
        paddingLeft: 8,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}>
        📈 Stock Price Overview
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.06)"
            vertical={false}
          />

          <XAxis
            dataKey="label"
            tick={{ fill: "#888", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[minPrice - padding, maxPrice + padding]}
            tick={{ fill: "#888", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v.toFixed(2)}`}
            width={60}
          />

          <Tooltip content={<CustomTooltip />} />

          <ReferenceLine
            y={firstPrice}
            stroke="rgba(255,255,255,0.2)"
            strokeDasharray="4 4"
          />

          <Area
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            strokeWidth={2.5}
            fill={`url(#${gradientId})`}
            dot={{ r: 4, fill: lineColor, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: lineColor, stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Companies() {
  const roles   = useSelector((s) => s.auth.roles);
  const isAdmin = roles.includes("Admin");

  const [companies,   setCompanies]   = useState([]);
  const [selected,    setSelected]    = useState(null);
  const [holdings,    setHoldings]    = useState([]);
  const [watchlist,   setWatchlist]   = useState([]);
  const [err,         setErr]         = useState("");
  const [msg,         setMsg]         = useState("");
  const [tradeState,  setTradeState]  = useState(null);

  const [newCompany, setNewCompany] = useState({
    CompanySymbol: "",
    CompanyName:   "",
    NumberOfStock: 0,
    PricePerStock: 0,
  });

  const [updateStock, setUpdateStock] = useState({
    companyName:       "",
    SharesOutstanding: 0,
    Price:             0,
  });

  async function loadCompanies() {
    try {
      const res = await api.get("/api/companies");
      setCompanies(res.data || []);
    } catch (e) {
      setErr(extractError(e));
    }
  }

  async function loadHoldings() {
    try {
      const res = await api.get("/api/portfolio/me");
      setHoldings(res.data?.items || []);
    } catch {
      setHoldings([]);
    }
  }

  async function loadWatchlist() {
  try {
    const res = await api.get("/api/watchlist");
    setWatchlist(res.data || []);
  } catch (e) {
    // If endpoint doesn't exist or returns 404, just set empty — don't crash
    setWatchlist([]);
  }
}

  async function loadCompanyStocks(companyId) {
    try {
      setErr("");
      const res = await api.get(`/api/companies/${companyId}/stocks`);
      setSelected(res.data);
      await loadHoldings();
    } catch (e) {
      setErr(extractError(e));
    }
  }

  function getHeldQuantity(symbol) {
    if (!Array.isArray(holdings)) return 0;
    const h = holdings.find(
      (h) => h.symbol?.toUpperCase() === symbol?.toUpperCase()
    );
    return h?.quantity ?? 0;
  }

  // Check if a symbol is already in the watchlist
  function isInWatchlist(symbol) {
    return watchlist.some(
      (w) => w.symbol?.toUpperCase() === symbol?.toUpperCase()
    );
  }

  async function handleWatchlist(symbol) {
  setErr(""); setMsg("");
  try {
    if (isInWatchlist(symbol)) {
      await api.delete(`/api/watchlist/${symbol}`);  
      setMsg(`${symbol} removed from watchlist.`);
    } else {
      await api.post(`/api/watchlist/${symbol}`);
      setMsg(`${symbol} added to watchlist.`);
    }
    await loadWatchlist();
  } catch (e) {
    setErr(extractError(e));
  }
}

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        await loadCompanies();
        await loadHoldings();
        await loadWatchlist();
      } catch (e) {
        setErr(extractError(e));
      }
    })();
  }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    try {
      setErr(""); setMsg("");
      await api.post("/api/companies", newCompany);
      setMsg("Company created.");
      setNewCompany({ CompanySymbol: "", CompanyName: "", NumberOfStock: 0, PricePerStock: 0 });
      await loadCompanies();
    } catch (e2) {
      setErr(extractError(e2));
    }
  };

  const onUpdateByName = async (e) => {
    e.preventDefault();
    try {
      setErr(""); setMsg("");
      const name = updateStock.companyName.trim();
      await api.put(
        `/api/companies/by-name/${encodeURIComponent(name)}/stocks`,
        {
          SharesOutstanding: Number(updateStock.SharesOutstanding),
          Price:             Number(updateStock.Price),
        }
      );
      setMsg("Stock updated.");
      if (selected?.name?.toLowerCase() === name.toLowerCase()) {
        await loadCompanyStocks(selected.id);
      }
    } catch (e2) {
      setErr(extractError(e2));
    }
  };

  function openTrade(symbol, side) {
    setTradeState({ symbol, side, quantity: 1, loading: false });
    setErr(""); setMsg("");
  }

  function cancelTrade() {
    setTradeState(null);
  }

  const onExecuteTrade = async () => {
    if (!tradeState) return;
    const { symbol, side, quantity } = tradeState;

    if (!quantity || quantity < 1) {
      setErr("Quantity must be at least 1.");
      return;
    }

    setTradeState((prev) => ({ ...prev, loading: true }));
    setErr(""); setMsg("");

    try {
      const endpoint = side === "Buy" ? "/api/trades/buy" : "/api/trades/sell";
      await api.post(endpoint, { symbol, quantity: Number(quantity) });
      setMsg(`${side} order for ${quantity}x ${symbol} executed successfully!`);
      setTradeState(null);
      await loadHoldings();
      if (selected) await loadCompanyStocks(selected.id);
    } catch (e) {
      setErr(extractError(e));
      setTradeState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="companies-container">
      <h3 className="companies-title">🏢 Companies & Stocks</h3>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      {/* Trade Bar */}
      {tradeState && (
        <div className="alert alert-info d-flex align-items-center gap-3 flex-wrap">
          <span>
            <strong>{tradeState.side}</strong> —{" "}
            <span className="stock-symbol">{tradeState.symbol}</span>
          </span>
          <input
            type="number"
            min={1}
            className="form-control"
            style={{ width: "100px" }}
            value={tradeState.quantity}
            onChange={(e) =>
              setTradeState((prev) => ({ ...prev, quantity: e.target.value }))
            }
            placeholder="Qty"
          />
          <button
            className={`btn btn-sm ${tradeState.side === "Buy" ? "btn-success" : "btn-danger"}`}
            onClick={onExecuteTrade}
            disabled={tradeState.loading}
          >
            {tradeState.loading ? "Processing..." : `Confirm ${tradeState.side}`}
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={cancelTrade}
            disabled={tradeState.loading}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="row g-3">
        {/* Company List */}
        <div className="col-md-5">
          <div className="card">
            <div className="card-header">Company List</div>
            <div className="card-body p-0">
              {companies.length === 0 ? (
                <div className="text-muted p-3">
                  No companies found. Admin can create new ones below.
                </div>
              ) : (
                <div className="companies-list">
                  {companies.map((c) => (
                    <div key={c.id} className="companies-list .list-group-item">
                      <div className="company-item-content">
                        <h6 className="company-name">{c.name}</h6>
                        <p className="company-id">ID: {c.id}</p>
                      </div>
                      <button
                        className="btn btn-primary company-view-btn"
                        onClick={() => loadCompanyStocks(c.id)}
                      >
                        View Stocks
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Company Stocks */}
        <div className="col-md-7">
          <div className="card">
            <div className="card-header">Selected Company</div>
            <div className="card-body">
              {!selected ? (
                <div className="stocks-empty">
                  <p>👈 Select a company from the left to view stock details.</p>
                </div>
              ) : (
                <>
                  {/* Company Header */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}>
                    <span className="holding-symbol">{selected.symbol}</span>
                    <div>
                      <h5 style={{ margin: 0, color: "var(--text)" }}>{selected.name}</h5>
                      <small className="text-muted">ID: {selected.id}</small>
                    </div>
                  </div>

                  {/* ── Price Chart ── */}
                  {(selected.stocks || []).length > 0 && (
                    <StockPriceChart stocks={selected.stocks} />
                  )}

                  {/* Stocks Table */}
                  {(selected.stocks || []).length === 0 ? (
                    <div className="stocks-empty">
                      <p>No stocks for this company.</p>
                    </div>
                  ) : (
                    <div className="stocks-table">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th className="text-end">Stocks Left</th>
                            <th className="text-end">Price</th>
                            <th className="text-end">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(selected.stocks || []).map((s) => {
                            const held        = getHeldQuantity(s.symbol);
                            const isTrading   = tradeState?.symbol === s.symbol;
                            const inWatchlist = isInWatchlist(s.symbol);

                            return (
                              <tr key={s.id}>
                                <td>
                                  <span className="stock-symbol">{s.symbol}</span>
                                </td>
                                <td>{s.name}</td>
                                <td className="text-end">
                                  <span className="stock-shares">{s.availableStocks}</span>
                                </td>
                                <td className="text-end">
                                  <PriceChange
                                    price={s.price}
                                    previousPrice={s.previousPrice}
                                  />
                                </td>
                                <td className="text-end">
                                  <div className="d-flex gap-2 justify-content-end align-items-center flex-wrap">

                                    {/* ── Watchlist Button ── */}
                                    <button
                                      className={`btn btn-sm ${inWatchlist ? "btn-warning" : "btn-outline-warning"}`}
                                      onClick={() => handleWatchlist(s.symbol)}
                                      title={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                                      style={{ minWidth: 36, padding: "4px 8px" }}
                                    >
                                      {inWatchlist ? (
                                        // Filled star — already in watchlist
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                        </svg>
                                      ) : (
                                        // Outline star — not in watchlist
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                        </svg>
                                      )}
                                    </button>

                                    {/* ── Buy Button ── */}
                                    {s.availableStocks > 0 && (
                                      <button
                                        className={`btn btn-sm ${
                                          isTrading && tradeState.side === "Buy"
                                            ? "btn-success"
                                            : "btn-outline-success"
                                        }`}
                                        onClick={() =>
                                          isTrading && tradeState.side === "Buy"
                                            ? cancelTrade()
                                            : openTrade(s.symbol, "Buy")
                                        }
                                      >
                                        Buy
                                      </button>
                                    )}

                                    {/* ── Sell Button ── */}
                                    {held > 0 && (
                                      <button
                                        className={`btn btn-sm ${
                                          isTrading && tradeState.side === "Sell"
                                            ? "btn-danger"
                                            : "btn-outline-danger"
                                        }`}
                                        onClick={() =>
                                          isTrading && tradeState.side === "Sell"
                                            ? cancelTrade()
                                            : openTrade(s.symbol, "Sell")
                                        }
                                      >
                                        Sell ({held})
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="admin-section">
          <h4 className="admin-section-title">⚙️ Admin Controls</h4>
          <div className="row g-3">

            {/* Create Company */}
            <div className="col-md-6">
              <div className="admin-form-card">
                <div className="card-header">Create Company</div>
                <div className="card-body">
                  <form onSubmit={onCreate}>
                    <div className="mb-2">
                      <label className="form-label">Company Symbol</label>
                      <input
                        className="form-control admin-form-input"
                        value={newCompany.CompanySymbol}
                        onChange={(e) =>
                          setNewCompany((p) => ({ ...p, CompanySymbol: e.target.value }))
                        }
                        placeholder="e.g., AAPL"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Company Name</label>
                      <input
                        className="form-control admin-form-input"
                        value={newCompany.CompanyName}
                        onChange={(e) =>
                          setNewCompany((p) => ({ ...p, CompanyName: e.target.value }))
                        }
                        placeholder="e.g., Apple Inc."
                      />
                    </div>
                    <div className="row">
                      <div className="col">
                        <label className="form-label">Number Of Stock</label>
                        <input
                          type="number"
                          className="form-control admin-form-input"
                          value={newCompany.NumberOfStock}
                          onChange={(e) =>
                            setNewCompany((p) => ({ ...p, NumberOfStock: e.target.value }))
                          }
                        />
                      </div>
                      <div className="col">
                        <label className="form-label">Price Per Stock</label>
                        <input
                          type="number"
                          className="form-control admin-form-input"
                          value={newCompany.PricePerStock}
                          onChange={(e) =>
                            setNewCompany((p) => ({ ...p, PricePerStock: e.target.value }))
                          }
                        />
                      </div>
                    </div>
                    <button className="btn btn-warning mt-3" type="submit">
                      Create Company
                    </button>
                  </form>
                  <div className="form-hint">
                    Creates the initial Stock + StockPrice in one transaction.
                  </div>
                </div>
              </div>
            </div>

            {/* Update Stock */}
            <div className="col-md-6">
              <div className="admin-form-card">
                <div className="card-header">Update Stock (by Company Name)</div>
                <div className="card-body">
                  <form onSubmit={onUpdateByName}>
                    <div className="mb-2">
                      <label className="form-label">Company Name</label>
                      <input
                        className="form-control admin-form-input"
                        value={updateStock.companyName}
                        onChange={(e) =>
                          setUpdateStock((p) => ({ ...p, companyName: e.target.value }))
                        }
                        placeholder="e.g., Apple Inc."
                      />
                    </div>
                    <div className="row">
                      <div className="col">
                        <label className="form-label">Shares Outstanding</label>
                        <input
                          type="number"
                          className="form-control admin-form-input"
                          value={updateStock.SharesOutstanding}
                          onChange={(e) =>
                            setUpdateStock((p) => ({ ...p, SharesOutstanding: e.target.value }))
                          }
                        />
                      </div>
                      <div className="col">
                        <label className="form-label">Price</label>
                        <input
                          type="number"
                          className="form-control admin-form-input"
                          value={updateStock.Price}
                          onChange={(e) =>
                            setUpdateStock((p) => ({ ...p, Price: e.target.value }))
                          }
                        />
                      </div>
                    </div>
                    <button className="btn btn-warning mt-3" type="submit">
                      Update Stock
                    </button>
                  </form>
                  <div className="form-hint">
                    Calls <code>PUT /api/companies/by-name/&lt;name&gt;/stocks</code>.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
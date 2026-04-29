import React, { useState, useEffect } from 'react';
import { fetchLostItems } from '../../../lib/firebase';

export default function LfBrowse() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchLostItems();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredItems = items.filter(item => {
    if (status && item.status !== status) return false;
    if (category && item.category !== category) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!item.title?.toLowerCase().includes(q) && !item.location?.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="lf-container">
      <div className="lf-page-header">
        <h2>Items Directory</h2>
        <p>Browse recently lost and found items across the campus.</p>
      </div>

      <div className="lf-search-panel">
        <div className="lf-search-row">
          <label className="lf-field-label">Search</label>
          <input 
            type="text" 
            className="lf-input" 
            placeholder="Search by title, location..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="lf-filter-row">
          <div className="lf-field">
            <label className="lf-field-label">Status</label>
            <select className="lf-input" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">All</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          <div className="lf-field">
            <label className="lf-field-label">Category</label>
            <select className="lf-input" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Keys">Keys</option>
              <option value="Wallet">Wallet / ID</option>
              <option value="Clothing">Clothing</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="lf-empty-state"><p>Loading items...</p></div>
      ) : filteredItems.length === 0 ? (
        <div className="lf-empty-state"><p>No items match your criteria.</p></div>
      ) : (
        <div className="lf-items-grid">
          {filteredItems.map(item => (
            <div className="lf-card" key={item.id}>
              <div className="lf-card-header">
                <h3>{item.title}</h3>
                <span className="lf-badge" data-status={item.status}>{item.status}</span>
              </div>
              <div className="lf-card-image">
                {item.imageUrl ? <img src={item.imageUrl} alt={item.title}/> : "No image"}
              </div>
              <div className="lf-card-meta">
                <div><strong>Category:</strong> {item.category}</div>
                <div><strong>Location:</strong> {item.location}</div>
                <div><strong>Date:</strong> {item.date}</div>
              </div>
              <div style={{marginTop: 'auto', paddingTop: '0.6rem', borderTop: '1px solid var(--gray-100)', fontSize: '0.8rem'}}>
                <strong>Contact:</strong> {item.contactName} ({item.contactPhone || item.contactEmail})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

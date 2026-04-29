import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchHostelItems } from '../../../lib/firebase';

export default function HmBrowse() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortParam, setSortParam] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchHostelItems();
        setItems(data);
      } catch (e) {
        console.error("Failed to load hostel items", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredItems = items.filter(item => {
    if (search && !item.title?.toLowerCase().includes(search.toLowerCase())) return false;
    if (category && item.category !== category) return false;
    return true;
  }).sort((a, b) => {
    if (sortParam === "low") return Number(a.price) - Number(b.price);
    if (sortParam === "high") return Number(b.price) - Number(a.price);
    return 0; // maintain original created-at desc order
  });

  return (
    <div className="hm-container">
      <h1 className="hm-section-title">Browse Items</h1>
      
      <div className="hm-toolbar">
        <div className="hm-search-controls">
          <input 
            type="text" 
            placeholder="Search items..." 
            className="hm-input-field" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="hm-filter-controls">
          <select className="hm-select-field" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Stationery">Stationery</option>
            <option value="Snacks">Snacks</option>
            <option value="Room Essentials">Room Essentials</option>
            <option value="Others">Others</option>
          </select>
          <select className="hm-select-field" value={sortParam} onChange={e => setSortParam(e.target.value)}>
            <option value="">Sort By: Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="hm-empty-state">
          <h3>Loading items...</h3>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="hm-empty-state">
          <h3>No items found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="hm-grid">
          {filteredItems.map(item => (
            <div className="hm-card" key={item.id}>
              <img src={item.image || 'https://via.placeholder.com/400x300/f9fafb/6b7280?text=No+Image'} alt={item.title} />
              <div className="hm-card-body">
                <div className="hm-card-title">{item.title}</div>
                <div className="hm-card-cat">{item.category}</div>
                <div className="hm-card-price">₹{item.price}</div>
                <Link to={`/hostel-mart/details/${item.id}`} className="hm-btn hm-btn-block">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

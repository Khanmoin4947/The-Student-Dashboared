import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function HmDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItem() {
      try {
        const docRef = doc(db, "hostel_items", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadItem();
  }, [id]);

  if (loading) {
    return (
      <div className="hm-container">
        <div className="hm-empty-state"><h3>Loading...</h3></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="hm-container">
        <div className="hm-empty-state">
          <h3>Item Not Found</h3>
          <Link to="/hostel-mart/browse" className="hm-back-link">
            <ArrowLeft size={16} /> Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="hm-container">
      <Link to="/hostel-mart/browse" className="hm-back-link">
        <ArrowLeft size={16} /> Back to Browse
      </Link>
      
      <div className="hm-details-wrapper">
        <div className="hm-details-image">
          {item.image ? (
            <img src={item.image} alt={item.title} />
          ) : (
            <div className="hm-no-image" style={{padding: '2rem', color: '#6b7280'}}>No Image Available</div>
          )}
        </div>
        <div className="hm-details-info">
          <h1>{item.title}</h1>
          <div className="hm-category">{item.category}</div>
          <div className="hm-price">₹{item.price}</div>
          <p className="hm-description">{item.desc}</p>
          <button className="hm-btn" onClick={() => alert(`Contact the seller at:\n${item.contact}`)}>
            📞 Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
}

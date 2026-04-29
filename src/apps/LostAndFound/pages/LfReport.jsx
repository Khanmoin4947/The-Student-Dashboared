import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addLostItem } from '../../../lib/firebase';
import { useAuth } from '../../../contexts/AuthContext';

export default function LfReport() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    status: 'lost',
    title: '',
    category: 'Electronics',
    description: '',
    date: '',
    location: '',
    contactName: currentUser?.displayName || '',
    contactEmail: currentUser?.email || '',
    contactPhone: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addLostItem(formData, file);
      alert("Report submitted successfully!");
      navigate('/lost-and-found/items');
    } catch (err) {
      console.error(err);
      alert("Error submitting report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lf-container" style={{maxWidth: '700px'}}>
      <div className="lf-page-header">
        <h2>Report an Item</h2>
        <p>Please provide as much detail as possible to help identify the item.</p>
      </div>

      <div className="lf-toggle-group">
        <button 
          type="button" 
          className={`lf-toggle ${formData.status === 'lost' ? 'is-active' : ''}`}
          onClick={() => setFormData({...formData, status: 'lost'})}
        >
          Lost Item
        </button>
        <button 
          type="button" 
          className={`lf-toggle ${formData.status === 'found' ? 'is-active' : ''}`}
          onClick={() => setFormData({...formData, status: 'found'})}
        >
          Found Item
        </button>
      </div>

      <form className="lf-form" onSubmit={handleSubmit}>
        <div className="lf-field">
          <label className="lf-field-label">Title / Short Description</label>
          <input type="text" name="title" className="lf-input" required value={formData.title} onChange={handleInput} />
        </div>

        <div className="lf-form-grid">
          <div className="lf-field">
            <label className="lf-field-label">Category</label>
            <select name="category" className="lf-input" required value={formData.category} onChange={handleInput}>
              <option value="Electronics">Electronics</option>
              <option value="Keys">Keys</option>
              <option value="Wallet">Wallet / ID</option>
              <option value="Clothing">Clothing</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="lf-field">
            <label className="lf-field-label">Date (When was it {formData.status}?)</label>
            <input type="date" name="date" className="lf-input" required value={formData.date} onChange={handleInput} />
          </div>
        </div>

        <div className="lf-field">
          <label className="lf-field-label">Location (Where was it {formData.status}?)</label>
          <input type="text" name="location" className="lf-input" required value={formData.location} onChange={handleInput} />
        </div>

        <div className="lf-field">
          <label className="lf-field-label">Detailed Description</label>
          <textarea name="description" className="lf-input" required value={formData.description} onChange={handleInput}></textarea>
        </div>

        <h3 style={{fontSize: '1.1rem', marginTop: '1rem'}}>Contact Information</h3>
        <div className="lf-form-grid">
          <div className="lf-field">
            <label className="lf-field-label">Your Name</label>
            <input type="text" name="contactName" className="lf-input" required value={formData.contactName} onChange={handleInput} />
          </div>
          <div className="lf-field">
            <label className="lf-field-label">Email Address</label>
            <input type="email" name="contactEmail" className="lf-input" value={formData.contactEmail} onChange={handleInput} />
          </div>
        </div>
        <div className="lf-field">
          <label className="lf-field-label">Phone Number (Optional)</label>
          <input type="text" name="contactPhone" className="lf-input" value={formData.contactPhone} onChange={handleInput} />
        </div>

        <div className="lf-field">
          <label className="lf-field-label">Upload Image (Optional but recommended)</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <div className="lf-form-actions">
          <button type="submit" className="lf-btn lf-btn-primary" disabled={loading}>
            {loading ? "Submitting..." : `Submit ${formData.status} Report`}
          </button>
        </div>
      </form>
    </div>
  );
}

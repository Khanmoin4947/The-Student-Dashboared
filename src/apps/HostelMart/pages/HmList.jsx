import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHostelItem } from '../../../lib/firebase';
import { useAuth } from '../../../contexts/AuthContext';

export default function HmList() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Electronics',
    price: '',
    desc: '',
    contact: currentUser?.email || ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => setFormData({...formData, [e.target.name]: e.target.value});
  const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addHostelItem({
        title: formData.title,
        category: formData.category,
        price: Number(formData.price),
        desc: formData.desc,
        contact: formData.contact
      }, imageFile);
      alert("Item Listed Successfully!");
      navigate('/hostel-mart/browse');
    } catch (err) {
      console.error(err);
      alert("Error listing item. Details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hm-container hm-container-sm">
      <h1 className="hm-section-title">List an Item</h1>
      
      <div className="hm-form-card">
        <form onSubmit={handleSubmit}>
          <div className="hm-form-group">
            <label>Item Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleInput} />
          </div>

          <div className="hm-form-group">
            <label>Category</label>
            <select name="category" required value={formData.category} onChange={handleInput}>
                 <option value="Electronics">Electronics</option>
                 <option value="Stationery">Stationery</option>
                 <option value="Snacks">Snacks</option>
                 <option value="Room Essentials">Room Essentials</option>
                 <option value="Others">Others</option>
            </select>
          </div>

          <div className="hm-form-group">
            <label>Price (₹)</label>
            <input type="number" name="price" min="0" required value={formData.price} onChange={handleInput} />
          </div>

          <div className="hm-form-group">
            <label>Description</label>
            <textarea name="desc" rows="4" required value={formData.desc} onChange={handleInput}></textarea>
          </div>

          <div className="hm-form-group">
            <label>Contact Info (Email/Phone)</label>
            <input type="text" name="contact" required value={formData.contact} onChange={handleInput} />
          </div>

          <div className="hm-form-group">
            <label>Item Image (Optional)</label>
            <input type="file" accept="image/*" onChange={handleImage} />
            {imageFile && (
              <div className="hm-image-preview">
                 <img src={URL.createObjectURL(imageFile)} alt="Preview" />
              </div>
            )}
          </div>

          <button type="submit" className="hm-btn hm-btn-block" disabled={loading}>
            {loading ? "Listing Item..." : "List Item"}
          </button>
        </form>
      </div>
    </div>
  );
}

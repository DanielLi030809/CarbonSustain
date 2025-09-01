import { useState } from "react";

export default function ActionForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    action: "",
    date: "",
    points: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.action.trim()) {
      alert("Please enter an action description");
      return;
    }
    if (!formData.date) {
      alert("Please select a date");
      return;
    }
    if (!formData.points || formData.points < 1) {
      alert("Please enter points (minimum 1)");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="dim-background" onClick={onClose}>
      <div className="action-form" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Action</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="action">Action Description</label>
            <input
              id="action"
              name="action"
              type="text"
              placeholder="e.g., Used public transportation..."
              value={formData.action}
              onChange={handleChange}
            />
          </div>
          <div className="lower-form-group">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="points">Points</label>
              <input
                id="points"
                name="points"
                type="number"
                onChange={handleChange}
                value={formData.points}
                placeholder="25"
                min="0"
                max="1000"
                required
              />
            </div>
          </div>
          <div className="button-group">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import toast from "react-hot-toast";
import { actionsAPI } from "../api/actions";

export default function ActionTable({
  setEditingAction,
  setShowForm,
  actions,
  setActions,
}) {
  if (!actions || actions.length == 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🌱</div>
        <h3>No actions yet!</h3>
        <p>Start your sustainability journey by adding your first action.</p>
      </div>
    );
  }

  function handleEdit(action) {
    setEditingAction(action);
    setShowForm(true);
  }

  async function handleDelete(actionId) {
    if (!confirm("Are you sure you want to delete this action?")) {
      return;
    }

    const loadingToast = toast.loading("Deleting action...");

    try {
      await actionsAPI.delete(actionId);

      // Refresh actions list
      const response = await actionsAPI.getAll();
      setActions(response.data.fetched_actions);

      toast.success("Action deleted successfully!", {
        id: loadingToast,
        icon: "🗑️",
      });
    } catch (err) {
      toast.error(
        "Error deleting action: " +
          (err.response?.data?.message || err.message),
        {
          id: loadingToast,
          icon: "❌",
        }
      );
    }
  }

  return (
    <table className="action-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Action Description</th>
          <th>Date</th>
          <th>Points</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {actions.map((action) => (
          <tr key={action.id}>
            <td>
              <span className="action-id">{action.id}</span>
            </td>
            <td>
              <span className="action-name">{action.action}</span>
            </td>
            <td>
              <span className="action-date">{action.date}</span>
            </td>
            <td>
              <span className="action-points">{action.points}</span>
            </td>
            <td className="options-btn-group">
              <button
                className="edit-btn"
                onClick={() => handleEdit(action)}
                title="Edit action"></button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(action.id)}
                title="Delete action"></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

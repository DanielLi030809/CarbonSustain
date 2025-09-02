import "./ActionForm.css";
import "./main.css";
import "./ActionTable.css";
import ActionForm from "./components/ActionForm";
import ActionTable from "./components/ActionTable";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAction, setEditingAction] = useState(null);

  function handleClick() {
    setShowForm(true);
    setEditingAction(null);
  }

  useEffect(() => {
    async function fetchActions() {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/actions", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch actions");
        }
        const data = await response.json();
        setActions(data.fetched_actions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchActions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">
          <span className="brand-icon">🌱</span>
          CarbonSustain
          <span className="subtitle">Sustainability Actions Tracker</span>
        </h1>
      </header>
      <div className="create-action-btn-container">
        <button className="create-action-btn" onClick={handleClick}>
          Add New Action
        </button>
      </div>
      <ActionTable
        setEditingAction={setEditingAction}
        setShowForm={setShowForm}
        actions={actions}
        setActions={setActions}></ActionTable>
      {showForm && (
        <ActionForm
          setShowForm={setShowForm}
          setActions={setActions}
          editingAction={editingAction}></ActionForm>
      )}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4CAF50",
              secondary: "#fff",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "#f44336",
              secondary: "#fff",
            },
          },
        }}></Toaster>
    </>
  );
}

export default App;

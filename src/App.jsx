import "./ActionForm.css";
import "./main.css";
import ActionForm from "./components/ActionForm";
import ActionTable from "./components/ActionTable";
import CreateActionButton from "./components/CreateActionButton";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleOpenForm() {
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
  }

  async function handleFormSubmit(formData) {
    try {
      setSubmitting(true);
      const response = await fetch("http://127.0.0.1:8000/api/actions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: formData.action,
          date: formData.date,
          points: parseInt(formData.points),
        }),
      });
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Failed to create new action");
      }
      const data = await response.json();
      console.log("Action created:", data);

      const updatedResponse = await fetch(
        "http://127.0.0.1:8000/api/actions/",
        {
          method: "GET",
        }
      );
      const updatedData = await updatedResponse.json();
      setActions(updatedData.fetched_actions);
      setShowForm(false);
      alert("Action created successfully!");
    } catch (err) {
      alert("Error creating action: " + err.message);
    } finally {
      setSubmitting(false);
    }
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
      <CreateActionButton onOpenForm={handleOpenForm}></CreateActionButton>
      <ActionTable actions={actions}></ActionTable>
      {showForm && (
        <ActionForm
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}></ActionForm>
      )}
    </>
  );
}

export default App;

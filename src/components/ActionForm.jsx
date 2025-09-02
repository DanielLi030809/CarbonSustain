import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast"

const actionSchema = z.object({
  action: z
    .string()
    .min(3, "Action description must have at least 3 characters")
    .max(255, "Action description must be less than 255 characters"),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((date) => {
      // Get today's date in the user's local timezone
      const today = new Date();
      const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
      );
      const todayStr = localDate.toISOString().split("T")[0]; // "2025-08-31"
      return date <= todayStr; // lexicographic works because format is YYYY-MM-DD
    }, "Date cannot be in the future"),
  points: z
    .number({
      required_error: "Points are required",
      invalid_type_error: "Points must be a number",
    })
    .min(1, "Points must be at least 1")
    .max(1000, "Points can not exceed 1000"),
});

export default function ActionForm({ setShowForm, setActions, editingAction }) {
  const isEditing = editingAction !== null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(actionSchema),
    defaultValues: {
      action: editingAction?.action || "",
      date: editingAction?.date || "",
      points: editingAction?.points || "",
    },
  });

  async function handleFormSubmit(formData) {
    try {
      if (isEditing) {
        const response = await fetch(`http://127.0.0.1:8000/api/actions/${editingAction.id}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: formData.action,
            date: formData.date,
            points: parseInt(formData.points),
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to update action");
        }
        const data = await response.json();
        console.log("Action updated:", data);
        toast.success("Action updated successfully!", {
          icon: "🌱",
        });
      } else {
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
        if (!response.ok) {
          throw new Error("Failed to create new action");
        }
        const data = await response.json();
        console.log("Action created:", data);
        toast.success("Action created successfully!", {
          icon: "🌱",
        });
      }

      const updatedResponse = await fetch(
        "http://127.0.0.1:8000/api/actions/",
        {
          method: "GET",
        }
      );
      const updatedData = await updatedResponse.json();
      setActions(updatedData.fetched_actions);
      setShowForm(false);
    } catch (err) {
      toast.error(err.message, {
        icon: "❌",
      });
    }
  }

  return (
    <div className="dim-background" onClick={() => {setShowForm(false)}}>
      <div className="action-form" onClick={(e) => e.stopPropagation()}>
        <h2>{isEditing ? "Edit Action" : "Add New Action"}</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-group">
            <label htmlFor="action">Action Description</label>
            <input
              id="action"
              type="text"
              placeholder="e.g., Used public transportation..."
              {...register("action")}
            />
            {errors.action && (
              <span className="error-message">{errors.action.message}</span>
            )}
          </div>
          <div className="lower-form-group">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input id="date" type="date" {...register("date")} />
              {errors.date && (
                <span className="error-message">{errors.date.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="points">Points</label>
              <input
                id="points"
                type="number"
                placeholder="25"
                {...register("points", { valueAsNumber: true })}
              />
              {errors.points && (
                <span className="error-message">{errors.points.message}</span>
              )}
            </div>
          </div>
          <div className="button-group">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEditing ? "Update Action" : "Save Action"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} disabled={isSubmitting}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

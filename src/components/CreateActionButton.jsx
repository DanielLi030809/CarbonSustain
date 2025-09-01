export default function CreateActionButton({ onOpenForm }) {
  function handleClick() {
    onOpenForm();
  }
  return <button
            className="create-action-btn"
            onClick={handleClick}
        >
            Add New Action
        </button>;
}

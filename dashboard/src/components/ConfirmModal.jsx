export default function ConfirmModal({ title, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-slate-900 p-6 rounded-xl w-80">
        <h3 className="font-bold mb-4">{title}</h3>

        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

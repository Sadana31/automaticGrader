export default function ProgressBar({ label, value, colorClass }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-end mb-1.5">
        <span className="text-sm font-bold text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{value}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full ${colorClass} transition-all duration-1000 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

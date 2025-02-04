export default function LoadingComponent() {
  return (
    <div className="fixed inset-0 bg-[var(--accent-color)]  flex items-center justify-center z-50 opacity-75">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500"></div>
    </div>
  );
}

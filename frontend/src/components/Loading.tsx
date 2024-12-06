export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
      <p className="text-xl font-semibold text-gray-700">Carregando...</p>
    </div>
  );
}
  
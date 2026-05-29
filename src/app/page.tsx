import CreateWishlistForm from "@/components/CreateWishlistForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Список желаний</h1>
          <p className="mt-2 text-gray-500 text-sm">
            Создайте свой вишлист и поделитесь им с близкими
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <CreateWishlistForm />
        </div>
      </div>
    </main>
  );
}

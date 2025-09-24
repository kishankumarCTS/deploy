export default function Banner() {
  return (
    <div className="p-6 rounded-2xl text-white bg-gradient-to-r from-blue-600 to-indigo-700 shadow">
      <p className="text-lg font-medium">Hello!</p>

      <div className="flex items-center gap-3 mt-1">
        <h3 className="text-2xl font-semibold">Ayush Singh</h3>
        <button className="px-3 py-1 text-xs rounded-full bg-white text-blue-700 font-medium">
          Verified
        </button>
      </div>

      <p className="mt-2 text-base">
        Welcome you Cloud Flex, your gateway to seamless cloud solutions
      </p>

      <div className="mt-4 px-4 py-2 rounded-full bg-white text-gray-800 inline-flex items-center gap-4">
        <p className="text-sm text-gray-600">
          Welcome to Cloud Flex! Complete your KYC for a secure, personalized
          cloud experience.
        </p>
        <button className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
          Complete KYC
        </button>
      </div>
    </div>
  );
}

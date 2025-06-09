export default function ErrorLoading({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <p className="text-lg font-medium text-red-500">
          Error loading {message}
        </p>
        <p className="mt-2 text-gray-600">Please try again later</p>
      </div>
    </div>
  );
}

const NotFound = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <p className="text-lg font-medium text-gray-500">No {message} found</p>
        <p className="mt-2 text-gray-400">There are no {message} to display</p>
      </div>
    </div>
  );
};

export default NotFound;

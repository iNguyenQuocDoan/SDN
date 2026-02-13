const Collectors = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Members</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">YOB</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Gender</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">John Doe</td>
              <td className="px-6 py-4 text-gray-500">john@email.com</td>
              <td className="px-6 py-4">2000</td>
              <td className="px-6 py-4">Male</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">Member</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Collectors;

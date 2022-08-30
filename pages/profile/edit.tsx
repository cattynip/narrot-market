import type { NextPage } from 'next';

const ProfileEdit: NextPage = () => {
  return (
    <div className="py-10 px-4 space-y-4">
      <div className="flex justify-start items-center space-x-3">
        <div className="w-20 h-20 bg-gray-500 rounded-full" />
        <label htmlFor="change" className="font-bold text-2xl cursor-pointer">
          Change Photo
        </label>
        <input className="hidden" type="file" id="change" accept="image/*" />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-500">
          Email address
        </label>
        <input
          type="email"
          className="transition-colors placeholder:transition placeholder:focus:text-transparent appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-600 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          placeholder="Your Email Address"
          id="email"
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-500">
          Phone Number
        </label>
        <div className="mt-3">
          <div className="flex rounded-md shadow-md">
            <span className="flex items-center justify-center px-4  rounded-l-md border-r-2">
              +1
            </span>
            <input
              type="number"
              className="transition border-none placeholder:transition placeholder:focus:text-transparent w-full focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none rounded-r-md"
              placeholder="Your Phone Address"
              required
            />
          </div>
        </div>
      </div>
      <button className="bg-orange-400 transition-colors hover:bg-orange-600 focus:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md mt-5 shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none w-full">
        Update Profile
      </button>
    </div>
  );
};

export default ProfileEdit;

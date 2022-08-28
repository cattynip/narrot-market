import type { NextPage } from 'next';

const ItemDetail: NextPage = () => {
  return (
    <div>
      <div>
        <div className="relative">
          <div className="h-96 bg-slate-300 bg-gradient-to-b from-transparent to-gray-500" />
          <div className="absolute w-full bottom-6 px-7 font-extrabold text-white text-5xl flex justify-between">
            <h1>Galaxy S50</h1>
            <p>$140</p>
          </div>
        </div>
        <div className="px-5">
          <div className="flex flex-col pt-7 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-full bg-gray-500" />
                <p className="text-lg font-medium">Steve Jebs</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">View profile &rarr;</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-500 font-medium text-lg leading-5 tracking-wide">
                My money&apos;s in that office, right? If she start giving me
                some bullshit about it ain&apos;t there, and we got to go
                someplace else and get it, I&apos;m gonna shoot you in the head
                then and there. Then I&apos;m gonna shoot that bitch in the
                kneecaps, find out where my goddamn money is. She gonna tell me
                too. Hey, look at me when I&apos;m talking to you, motherfucker.
                You listen: we go in there, and that ni**a Winston or anybody
                else is in there, you the first motherfucker to get shot. You
                understand?
              </p>
              <div className="flex items-center justify-between mt-5 space-x-4">
                <button className="transition-colors ease-in-out bg-orange-400 p-3 w-full text-white rounded-md hover:bg-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-lg">
                  Talk to seller
                </button>
                <button className="transition-colors p-3 shadow-lg rounded-md">
                  <svg
                    className="h-7 w-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#f97316"
                    viewBox="0 0 24 24"
                    stroke="#f97316"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-extrabold text-2xl pb-3">Similar Items</h2>
            <div className="border-t-2 border-t-gray-300 pt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {[...Array(50)].map((value, idx) => (
                <div key={idx}>
                  <div className="w-full aspect-square bg-slate-500 rounded-md" />
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-slate-500" />
                      <h3 className="font-bold">Galaxy S60</h3>
                    </div>
                    <p className="text-gray-500">$6</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

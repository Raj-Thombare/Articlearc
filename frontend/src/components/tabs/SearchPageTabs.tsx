interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SearchPageTabs = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className='w-full text-sm font-medium text-center border-b text-gray-500 border-gray-200'>
      <ul className='flex flex-wrap text-lg font-bold text-center border-gray-200'>
        <li>
          <button
            onClick={() => setActiveTab("articles")}
            className={`inline-block p-4 text-base font-medium w-full rounded-t-lg focus:outline-none ${
              activeTab === "articles"
                ? "text-black border-b font-bold border-black"
                : "hover:text-gray-600 hover:border-gray-300"
            }`}>
            Articles
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("people")}
            className={`inline-block w-full font-medium text-base p-4 rounded-t-lg focus:outline-none ${
              activeTab === "people"
                ? "text-black border-b font-bold border-black"
                : "hover:text-gray-600 hover:border-gray-300"
            }`}>
            People
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SearchPageTabs;

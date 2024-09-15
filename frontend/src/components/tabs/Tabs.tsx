import React from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOwner: boolean;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, isOwner }) => {
  return (
    <div className='w-full text-sm mb-4 font-medium text-center border-b text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-700'>
      <ul className='flex flex-wrap text-base font-bold text-center border-gray-200 dark:border-gray-700 dark:text-gray-400'>
        <li className='w-[50%] grow'>
          <button
            onClick={() => setActiveTab("profile")}
            className={`inline-block p-4 w-full rounded-t-lg focus:outline-none ${
              activeTab === "profile"
                ? "text-black border-b font-bold border-black"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }`}>
            Profile
          </button>
        </li>
        {isOwner && (
          <li className='w-[50%] grow'>
            <button
              onClick={() => setActiveTab("settings")}
              className={`inline-block w-full p-4 rounded-t-lg focus:outline-none ${
                activeTab === "settings"
                  ? "text-black border-b font-bold border-black"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}>
              Settings
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Tabs;

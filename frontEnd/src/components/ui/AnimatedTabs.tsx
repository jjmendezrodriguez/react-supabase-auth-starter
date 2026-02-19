// AnimatedTabs component
// Animated tab switcher with smooth transitions

import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

/**
 * AnimatedTabs component
 * Displays animated tabs with smooth transitions
 * @param tabs - Array of tab objects with id, label, and content
 * @param defaultTab - Optional default active tab ID
 */
export default function AnimatedTabs({ tabs, defaultTab }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="w-full">
      {/* Tab buttons */}
      <div className="mb-6 flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative cursor-pointer px-6 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            } `}
          >
            {tab.label}

            {/* Active indicator */}
            {activeTab === tab.id && (
              <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content with fade animation */}
      <div className="animate-fadeIn">{activeTabContent}</div>
    </div>
  );
}

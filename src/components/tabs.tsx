'use client'

import { useRouter } from 'next/navigation'

export default function Tabs() {
  const router = useRouter()

  function goToEndpoint(endpoint: string) {
    router.push(`/${endpoint}`)
  }

  const tabs: {name: string, endpoint: string}[] = [
    {
      name: 'Home',
      endpoint: ''
    },
    {
      name: 'Articles',
      endpoint: 'article'
    },
    {
      name: 'Lesson',
      endpoint: 'lesson'
    },
    {
      name: 'Checking Learning',
      endpoint: 'checking_learning'
    },
    {
      name: 'Worksheets',
      endpoint: 'worksheet'
    }
  ]

  return (
    <div className="border-b border-gray-300 my-2">
      <div className="container mx-auto">
        {/* Tab Buttons */}
        <div className="flex justify-center space-x-4 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.endpoint}
              onClick={() => goToEndpoint(tab.endpoint)}
              className="px-4 py-4 font-bold cursor-pointer text-gray-600 border-transparent border-b-2 hover:text-blue-500 hover:border-b-2 hover:border-blue-500"
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

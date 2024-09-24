"use client";

import { useState } from "react";
import Image from "next/image";
import JsonViewer from "./JsonViewer";

export default function Dashboard() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ingestorData, setInjestorData] = useState<any | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [jsonData, setJsonData] = useState<any>([
        {
          "id": 1,
          "name": "Alice",
          "details": {
            "age": 30,
            "address": {
              "street": "123 Main St",
              "city": "Anytown",
              "coordinates": {
                "latitude": 40.7128,
                "longitude": -74.0060
              }
            },
            "data": [
              42,
              "text",
              false,
              null,
              {
                "key": "value",
                "nestedArray": [
                  {
                    "item": "item1",
                    "attributes": {
                      "color": "red",
                      "size": "large"
                    }
                  },
                  {
                    "item": "item2",
                    "attributes": {
                      "color": "blue",
                      "size": "medium"
                    }
                  }
                ]
              }
            ]
          }
        },
        {
          "id": 2,
          "name": "Bob",
          "details": {
            "age": 25,
            "address": {
              "street": "456 Elm St",
              "city": "Othertown",
              "coordinates": {
                "latitude": 34.0522,
                "longitude": -118.2437
              }
            },
            "data": [
              "another string",
              3.14,
              true
            ]
          }
        }
    ])

    const generateJsonTree = () => {
        setLoading(true)

        if(ingestorData || ingestorData.length > 0) {
            setTimeout(() => {
                setJsonData(JSON.parse(ingestorData))
                setLoading(false)
                setError(null)
            }, 1000)
        }
        else {
            setError("Please provide a valid JSON data")
            setLoading(false)
        }
    }

    return (
        <section className="h-full w-full grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* EMPTY LAYOUT */}
            <div className="h-full w-full"></div>
            
            {/* JSON Ingestor */}
            <div className="h-auto w-full rounded-lg bg-white shadow-lg flex flex-col items-center justify-start">
                <header className="h-auto w-full border-b border-gray-200 p-4 flex items-center justify-between">
                    <div className="flex items-center justify-start space-x-3">
                        <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center position relative overflow-hidden flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 text-gray-800">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                            </svg>
                        </div>
                        <p className="text-xl font-medium">JSON Ingestor</p>
                    </div>
                </header>

                <main className="h-auto w-full flex flex-col items-start justify-start p-4 overflow-y-auto space-y-2">
                    <textarea
                    onChange={e => setInjestorData(e.target.value)} 
                    defaultValue={"Paste your JSON data here"}
                    className="h-96 w-full border border-gray-400 rounded-md text-sm text-gray-500 p-3"></textarea>
                    <button 
                    onClick={generateJsonTree}
                    className="w-full py-4 px-3 rounded-md bg-blue-800 text-sm text-white font-semibold">Generate</button>
                </main>
            </div>

            {/* TREE Viewer */}
            <div className="h-[40rem] w-full rounded-lg bg-white shadow-lg flex flex-col items-center justify-start">
                <header className="h-auto w-full border-b border-gray-200 p-4 flex items-center justify-between">
                    <div className="flex items-center justify-start space-x-3">
                        <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center position relative overflow-hidden flex items-center justify-center">
                            <Image
                            alt="list details icon"
                            src="/assets/icons/list-details.svg"
                            width={25}
                            height={25}
                            />
                        </div>
                        <p className="text-xl font-medium">Cell details</p>
                    </div>

                    {/* close drawer */}
                    <div className="h-5 w-5 bg-transparent flex items-center justify-center position relative overflow-hidden flex items-center justify-center cursor-pointer">
                        <Image
                        fill
                        className="h-full w-full object-cover"
                        alt="cancel icon"
                        src="/assets/icons/x.svg"
                        />
                    </div>
                </header>

                <main className="h-full w-full flex items-start justify-start p-4 overflow-auto">
                    {/* TREE UI */}
                    {
                        !error && !loading && <JsonViewer data={jsonData} />
                    }

                    {/* Error UI */}
                    {!loading && error && error.length > 1 ? <div className="text-red-500 text-sm">{error}</div> : null}

                    {/* loading UI */}
                    {loading ? <div className="flex items-center justify-center space-x-2">
                        <div className="text-gray-500 text-sm font-medium">Loading...</div>
                        <div className="h-5 w-5 rounded-full border-2 border-gray-100 border-t-blue-500 animate-spin"></div>
                    </div> : null}
                </main>
            </div>
        </section>
    );
}
"use client"
import FaviconGenerator from "@/components/favicon-generator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function FaviconDemo() {
  const downloadSVG = () => {
    const svgData = document.getElementById("favicon-svg")?.outerHTML
    if (!svgData) return

    const blob = new Blob([svgData], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "eg-favicon.svg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">EG Web Solutions Favicon</h1>

        <Card>
          <CardHeader>
            <CardTitle>Favicon Preview</CardTitle>
            <CardDescription>
              A simplified version of your logo optimized for browser tabs and bookmarks
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-8">
            <div className="bg-gray-100 p-8 rounded-lg">
              <div id="favicon-svg" className="w-64 h-64">
                <FaviconGenerator />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 w-full">
              <div className="flex flex-col items-center">
                <div className="bg-white p-2 rounded-lg shadow-sm mb-2">
                  <div className="w-8 h-8">
                    <FaviconGenerator />
                  </div>
                </div>
                <span className="text-sm text-gray-500">16x16</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-white p-2 rounded-lg shadow-sm mb-2">
                  <div className="w-12 h-12">
                    <FaviconGenerator />
                  </div>
                </div>
                <span className="text-sm text-gray-500">32x32</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-white p-2 rounded-lg shadow-sm mb-2">
                  <div className="w-16 h-16">
                    <FaviconGenerator />
                  </div>
                </div>
                <span className="text-sm text-gray-500">64x64</span>
              </div>
            </div>

            <div className="w-full">
              <h3 className="font-medium mb-4">Browser Tab Preview</h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-200 p-2 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1"></div>
                </div>
                <div className="bg-white p-2 border-t flex items-center">
                  <div className="flex items-center bg-gray-100 rounded px-3 py-1 mr-2">
                    <div className="w-4 h-4 mr-2">
                      <FaviconGenerator />
                    </div>
                    <span className="text-xs truncate">EG Web Solutions | Premium Web Development & Design</span>
                  </div>
                  <div className="flex-1 bg-gray-100 h-6 rounded"></div>
                </div>
                <div className="h-32 bg-white flex items-center justify-center text-gray-400 text-sm">
                  Browser Content
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={downloadSVG}>
              <Download className="w-4 h-4 mr-2" />
              Download SVG
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            The favicon has been automatically generated and configured for your website.
            <br />
            It will appear in browser tabs, bookmarks, and other places where your site is referenced.
          </p>
        </div>
      </div>
    </div>
  )
}

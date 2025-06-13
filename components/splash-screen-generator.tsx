"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EGLogo from "@/components/eg-logo"

export default function SplashScreenGenerator() {
  const [backgroundColor, setBackgroundColor] = useState("#1a1a1a")
  const [textColor, setTextColor] = useState("#ffffff")
  const [accentColor, setAccentColor] = useState("#d4af37")

  const splashScreenSizes = [
    { name: "iPhone X", width: 1125, height: 2436 },
    { name: "iPhone 8, 7, 6s, 6", width: 750, height: 1334 },
    { name: "iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus", width: 1242, height: 2208 },
    { name: 'iPad Pro 12.9"', width: 2048, height: 2732 },
    { name: 'iPad Pro 11"', width: 1668, height: 2388 },
    { name: "iPad Mini, Air", width: 1536, height: 2048 },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">EG Web Solutions Splash Screens</h1>

        <Tabs defaultValue="preview">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="sizes">Device Sizes</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Splash Screen Preview</CardTitle>
                <CardDescription>This is how your splash screen will appear when users launch your PWA</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="flex flex-col items-center justify-center p-12 rounded-lg mb-6"
                  style={{ backgroundColor }}
                >
                  <div className="mb-6">
                    <EGLogo variant="light" size="xl" showText={false} />
                  </div>
                  <h1 className="text-2xl font-bold" style={{ color: textColor }}>
                    EG Web Solutions
                  </h1>
                  <p className="mt-2" style={{ color: `${textColor}99` }}>
                    Premium Digital Experiences
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Background Color</label>
                    <div className="flex">
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-10 h-10 rounded-l-md border border-gray-300"
                      />
                      <input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-r-md border border-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Text Color</label>
                    <div className="flex">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-10 h-10 rounded-l-md border border-gray-300"
                      />
                      <input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-r-md border border-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Accent Color</label>
                    <div className="flex">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-10 h-10 rounded-l-md border border-gray-300"
                      />
                      <input
                        type="text"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-r-md border border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Generate Splash Screens</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="sizes">
            <Card>
              <CardHeader>
                <CardTitle>Required Splash Screen Sizes</CardTitle>
                <CardDescription>These are the splash screen sizes needed for various Apple devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {splashScreenSizes.map((size, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-medium">{size.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {size.width} × {size.height} pixels
                      </p>
                      <div className="mt-3 bg-gray-100 rounded p-2 text-xs font-mono">
                        /splash/apple-splash-{size.width}-{size.height}.png
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Splash screens are displayed when users launch your PWA from their home screen.
            <br />
            They provide a smooth transition and reinforce your brand identity.
          </p>
        </div>
      </div>
    </div>
  )
}

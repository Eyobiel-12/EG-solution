"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Smartphone, Wifi, WifiOff, Bell, RefreshCw } from "lucide-react"
import EGLogo from "@/components/eg-logo"
import SplashScreenGenerator from "@/components/splash-screen-generator"

export default function PWAFeaturesPage() {
  const [isOnline, setIsOnline] = useState(true)

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline)
  }

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications")
      return
    }

    const permission = await Notification.requestPermission()

    if (permission === "granted") {
      new Notification("EG Web Solutions", {
        body: "Thank you for enabling notifications!",
        icon: "/icon-192.png",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <EGLogo size="md" />
        </div>

        <h1 className="text-3xl font-bold mb-2 text-center">Progressive Web App Features</h1>
        <p className="text-center text-gray-600 mb-8">Explore the PWA capabilities of the EG Web Solutions website</p>

        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="install">Installation</TabsTrigger>
            <TabsTrigger value="offline">Offline Support</TabsTrigger>
            <TabsTrigger value="splash">Splash Screens</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>PWA Features Overview</CardTitle>
                <CardDescription>The EG Web Solutions website is now a full Progressive Web App</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <Smartphone className="h-6 w-6 mr-3 text-gray-600" />
                      <h3 className="font-medium text-lg">Installable</h3>
                    </div>
                    <p className="text-gray-600">
                      Users can install the website to their home screen for quick access, just like a native app.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <WifiOff className="h-6 w-6 mr-3 text-gray-600" />
                      <h3 className="font-medium text-lg">Works Offline</h3>
                    </div>
                    <p className="text-gray-600">
                      The app continues to function even when users are offline or have poor connectivity.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <Bell className="h-6 w-6 mr-3 text-gray-600" />
                      <h3 className="font-medium text-lg">Push Notifications</h3>
                    </div>
                    <p className="text-gray-600">
                      Engage users with timely updates and information through push notifications.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <RefreshCw className="h-6 w-6 mr-3 text-gray-600" />
                      <h3 className="font-medium text-lg">Background Sync</h3>
                    </div>
                    <p className="text-gray-600">
                      Forms and data submissions work even offline, syncing automatically when connection is restored.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">PWA Benefits</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Faster loading times and smoother performance</li>
                    <li>Reduced data usage through efficient caching</li>
                    <li>App-like experience without app store approval process</li>
                    <li>Automatic updates without user intervention</li>
                    <li>Better engagement through home screen presence</li>
                    <li>Cross-platform compatibility (iOS, Android, desktop)</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => (window.location.href = "/#")} className="ml-auto">
                  Back to Home
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="install">
            <Card>
              <CardHeader>
                <CardTitle>Install EG Web Solutions</CardTitle>
                <CardDescription>Add our website to your home screen for quick access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium text-lg mb-4">Installation Steps</h3>

                    <div className="space-y-6">
                      <div className="flex">
                        <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-medium">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Visit the website</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Open EG Web Solutions in a supported browser (Chrome, Safari, Edge, etc.)
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-medium">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Open browser menu</h4>
                          <p className="text-sm text-gray-600 mt-1">Tap the menu button (three dots or share icon)</p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-medium">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Select "Add to Home Screen"</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            The option may be called "Install App" or similar depending on your browser
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-medium">4</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Confirm installation</h4>
                          <p className="text-sm text-gray-600 mt-1">Tap "Add" or "Install" to complete the process</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6 flex flex-col items-center justify-center">
                    <div className="mb-6">
                      <EGLogo size="lg" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Install Now</h3>
                    <p className="text-center text-gray-600 mb-6">
                      Add EG Web Solutions to your home screen for quick access
                    </p>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Install App
                    </Button>
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      This button will appear automatically when installation is available
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offline">
            <Card>
              <CardHeader>
                <CardTitle>Offline Capabilities</CardTitle>
                <CardDescription>EG Web Solutions works even when you're offline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-6">
                  <div className={`h-4 w-4 rounded-full mr-2 ${isOnline ? "bg-green-500" : "bg-red-500"}`}></div>
                  <span className="font-medium">{isOnline ? "Online" : "Offline"}</span>
                  <Button variant="outline" size="sm" className="ml-auto" onClick={toggleOnlineStatus}>
                    {isOnline ? <WifiOff className="h-4 w-4 mr-2" /> : <Wifi className="h-4 w-4 mr-2" />}
                    {isOnline ? "Simulate Offline" : "Go Online"}
                  </Button>
                </div>

                <div className="border rounded-lg p-6 mb-6">
                  <h3 className="font-medium text-lg mb-4">Offline Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>Browse previously visited pages</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>View cached images and content</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>Submit forms (will sync when back online)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>Access critical information</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6">
                    <h3 className="font-medium text-lg mb-4">How It Works</h3>
                    <p className="text-gray-600 mb-4">
                      Our PWA uses a service worker to cache important assets and content when you're online. When you
                      lose connection, the service worker serves these cached resources instead.
                    </p>
                    <p className="text-gray-600">
                      Any actions you take while offline (like submitting a contact form) are stored locally and
                      automatically synchronized when your connection is restored.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="font-medium text-lg mb-4">Test Offline Mode</h3>
                    <p className="text-gray-600 mb-4">To test the offline capabilities:</p>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                      <li>Install the PWA to your device</li>
                      <li>Browse several pages to cache content</li>
                      <li>Enable airplane mode or disconnect from the internet</li>
                      <li>Open the app and navigate through previously visited pages</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="splash">
            <SplashScreenGenerator />
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-center">
          <Button onClick={requestNotificationPermission} variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Enable Notifications
          </Button>
        </div>
      </div>
    </div>
  )
}

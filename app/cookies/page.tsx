"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="mb-8">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2 border-blue-300 text-blue-500">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="prose prose-blue max-w-none">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-500">Cookie Policy</h1>

            <p className="text-gray-600 mb-6">Last updated: April 20, 2025</p>

            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored
              in your web browser and allows the service or a third-party to recognize you and make your next visit
              easier and the service more useful to you.
            </p>

            <h2>2. How We Use Cookies</h2>
            <p>
              When you use and access our website, we may place a number of cookie files in your web browser. We use
              cookies for the following purposes:
            </p>
            <ul>
              <li>To enable certain functions of the website</li>
              <li>To provide analytics</li>
              <li>To store your preferences</li>
              <li>To enable advertisements delivery, including behavioral advertising</li>
            </ul>
            <p>
              We use both session and persistent cookies on the website and we use different types of cookies to run the
              website:
            </p>
            <ul>
              <li>
                Essential cookies. We may use essential cookies to authenticate users and prevent fraudulent use of user
                accounts.
              </li>
              <li>
                Preferences cookies. We may use preferences cookies to remember information that changes the way the
                website behaves or looks, such as the "remember me" functionality.
              </li>
              <li>
                Statistics cookies. We may use statistics cookies to track information how the website is used so that
                we can make improvements. We may also use statistics cookies to test new advertisements, pages, features
                or new functionality of the website to see how our users react to them.
              </li>
              <li>
                Marketing cookies. These cookies are used to track advertising effectiveness to provide a more relevant
                service and deliver better ads to suit your interests.
              </li>
            </ul>

            <h2>3. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of
              the website, deliver advertisements on and through the website, and so on.
            </p>

            <h2>4. What Are Your Choices Regarding Cookies</h2>
            <p>
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the
              help pages of your web browser.
            </p>
            <p>
              Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use
              all of the features we offer, you may not be able to store your preferences, and some of our pages might
              not display properly.
            </p>

            <h2>5. Where Can You Find More Information About Cookies</h2>
            <p>You can learn more about cookies at the following third-party websites:</p>
            <ul>
              <li>
                AllAboutCookies:{" "}
                <a href="http://www.allaboutcookies.org/" className="text-blue-500">
                  http://www.allaboutcookies.org/
                </a>
              </li>
              <li>
                Network Advertising Initiative:{" "}
                <a href="http://www.networkadvertising.org/" className="text-blue-500">
                  http://www.networkadvertising.org/
                </a>
              </li>
            </ul>

            <h2>6. Contact Us</h2>
            <p>If you have any questions about our Cookie Policy, please contact us at:</p>
            <p>
              Email: privacy@egwebsolutions.com
              <br />
              Postal address: Zweedsestraat 8a, 16, 7418 BG Deventer, Netherlands
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

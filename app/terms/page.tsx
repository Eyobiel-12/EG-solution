"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-500">Terms of Service</h1>

            <p className="text-gray-600 mb-6">Last updated: April 20, 2025</p>

            <h2>1. Introduction</h2>
            <p>
              These terms and conditions outline the rules and regulations for the use of EG Web Solutions' website. By
              accessing this website, we assume you accept these terms and conditions in full. Do not continue to use EG
              Web Solutions' website if you do not accept all of the terms and conditions stated on this page.
            </p>

            <h2>2. License</h2>
            <p>
              Unless otherwise stated, EG Web Solutions and/or its licensors own the intellectual property rights for
              all material on this website. All intellectual property rights are reserved. You may view and/or print
              pages from the website for your own personal use subject to restrictions set in these terms and
              conditions.
            </p>
            <p>You must not:</p>
            <ul>
              <li>Republish material from this website</li>
              <li>Sell, rent or sub-license material from this website</li>
              <li>Reproduce, duplicate or copy material from this website</li>
              <li>
                Redistribute content from EG Web Solutions (unless content is specifically made for redistribution)
              </li>
            </ul>

            <h2>3. User Comments</h2>
            <p>
              Certain parts of this website offer the opportunity for users to post and exchange opinions, information,
              material and data. EG Web Solutions does not screen, edit, publish or review Comments prior to their
              appearance on the website and Comments do not reflect the views or opinions of EG Web Solutions, its
              agents or affiliates. Comments reflect the view and opinion of the person who posts such view or opinion.
            </p>

            <h2>4. Hyperlinking to our Content</h2>
            <p>The following organizations may link to our website without prior written approval:</p>
            <ul>
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>
                Online directory distributors when they list us in the directory may link to our website in the same
                manner as they hyperlink to the websites of other listed businesses;
              </li>
            </ul>

            <h2>5. Reservation of Rights</h2>
            <p>
              We reserve the right at any time and in its sole discretion to request that you remove all links or any
              particular link to our website. You agree to immediately remove all links to our website upon such
              request. We also reserve the right to amend these terms and conditions and its linking policy at any time.
              By continuing to link to our website, you agree to be bound to and abide by these linking terms and
              conditions.
            </p>

            <h2>6. Disclaimer</h2>
            <p>
              To the maximum extent permitted by applicable law, we exclude all representations, warranties and
              conditions relating to our website and the use of this website. Nothing in this disclaimer will:
            </p>
            <ul>
              <li>Limit or exclude our or your liability for death or personal injury;</li>
              <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
              <li>Limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
              <li>Exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>

            <h2>7. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>
              Email: legal@egwebsolutions.com
              <br />
              Postal address: Zweedsestraat 8a, 16, 7418 BG Deventer, Netherlands
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

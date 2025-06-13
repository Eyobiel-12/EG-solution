// This is a Node.js script that would generate splash screens for various device sizes
// In a real implementation, this would use a library like sharp to create the images

const fs = require("fs")
const path = require("path")
const { createCanvas, loadImage } = require("canvas")

// Define splash screen sizes for different devices
const splashScreenSizes = [
  { name: "iPhone X", width: 1125, height: 2436 },
  { name: "iPhone 8, 7, 6s, 6", width: 750, height: 1334 },
  { name: "iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus", width: 1242, height: 2208 },
  { name: "iPhone 5", width: 640, height: 1136 },
  { name: 'iPad Pro 12.9"', width: 2048, height: 2732 },
  { name: 'iPad Pro 11"', width: 1668, height: 2388 },
  { name: 'iPad Pro 10.5"', width: 1668, height: 2224 },
  { name: "iPad Mini, Air", width: 1536, height: 2048 },
]

// Configuration
const config = {
  backgroundColor: "#1a1a1a",
  logoPath: "../icon-512.png",
  outputDir: "./",
  text: "EG Web Solutions",
  subText: "Premium Digital Experiences",
  textColor: "#ffffff",
  subTextColor: "#ffffff99",
}

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true })
}

// Generate splash screens
async function generateSplashScreens() {
  try {
    const logo = await loadImage(config.logoPath)

    for (const size of splashScreenSizes) {
      console.log(`Generating splash screen for ${size.name} (${size.width}x${size.height})...`)

      // Create canvas with device dimensions
      const canvas = createCanvas(size.width, size.height)
      const ctx = canvas.getContext("2d")

      // Fill background
      ctx.fillStyle = config.backgroundColor
      ctx.fillRect(0, 0, size.width, size.height)

      // Calculate logo size (40% of the smaller dimension)
      const logoSize = Math.min(size.width, size.height) * 0.4

      // Draw logo centered
      ctx.drawImage(
        logo,
        (size.width - logoSize) / 2,
        (size.height - logoSize) / 2 - logoSize * 0.2,
        logoSize,
        logoSize,
      )

      // Draw text
      ctx.fillStyle = config.textColor
      ctx.font = `bold ${logoSize * 0.15}px sans-serif`
      ctx.textAlign = "center"
      ctx.fillText(config.text, size.width / 2, (size.height + logoSize) / 2 + logoSize * 0.1)

      // Draw subtext
      ctx.fillStyle = config.subTextColor
      ctx.font = `${logoSize * 0.1}px sans-serif`
      ctx.fillText(config.subText, size.width / 2, (size.height + logoSize) / 2 + logoSize * 0.3)

      // Save the image
      const outputPath = path.join(config.outputDir, `apple-splash-${size.width}-${size.height}.png`)
      const buffer = canvas.toBuffer("image/png")
      fs.writeFileSync(outputPath, buffer)
    }

    console.log("All splash screens generated successfully!")
  } catch (error) {
    console.error("Error generating splash screens:", error)
  }
}

generateSplashScreens()

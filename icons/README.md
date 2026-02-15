# App Icons

You need to create app icons for your PWA. Here's what you need:

## Required Icon Sizes:
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

## How to Create Icons:

### Option 1: Use an Online Tool
1. Go to https://realfavicongenerator.net/ or https://www.pwabuilder.com/imageGenerator
2. Upload a square image (at least 512x512 pixels)
3. Download the generated icons
4. Place them in this `icons/` folder

### Option 2: Use a Design Tool
1. Create a 512x512 image with your app logo
2. Use a tool like:
   - Photoshop/GIMP: Resize for each size
   - ImageMagick: `convert icon.png -resize 192x192 icon-192x192.png`
   - Online tools: Favicon.io, PWA Icon Generator

### Design Tips:
- Use a simple, recognizable design
- Make sure it looks good on both light and dark backgrounds
- Center the main content with some padding
- Use the brand color (#667eea) as the background
- Add a white or contrasting icon symbol in the center

### Quick SVG Template:
You can use this SVG and convert it to PNG at different sizes:

```svg
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#667eea" rx="80"/>
  <text x="256" y="340" font-size="280" text-anchor="middle" fill="white" font-family="Arial, sans-serif">📝</text>
</svg>
```

Save this as `icon.svg` and use a converter like https://cloudconvert.com/svg-to-png to create PNGs.

## Naming Convention:
All files should be named: `icon-{width}x{height}.png`
Example: `icon-192x192.png`

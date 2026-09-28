# Validation report — updated portrait and licence version

## Checks actually performed in this update

- Node.js 22.16.0: `npm test` — 8/8 pure contact-validation tests passed.
- 14 JavaScript/JSX files parsed and transpiled for syntax using the available TypeScript compiler; no syntax diagnostics. This is not a React dependency/type compatibility check.
- 19 relative import targets found on the case-sensitive local filesystem.
- CSS parsed with PostCSS; the three SVG assets parsed as XML.
- All configured portrait, project-image and resume paths point to existing public files.
- The portrait file is byte-for-byte identical to the user upload (SHA-256 comparison). Original image size: 1200 × 1500 pixels. No image generation, retouching or crop was applied.
- The updated resume PDF has one page. Text checks confirm the South Korea / 2022 licence and expected December 2028 graduation; the rendered page was visually inspected.

## Not verified

A normal `npm install` failed because registry.npmjs.org could not be resolved (EAI_AGAIN). An offline attempt also failed because the required packages were not cached. Therefore a full React browser run and Vite build were NOT performed. There is no claim of an end-to-end browser pass or successful cloud deployment. No fabricated package-lock.json or prebuilt dist is included.

No GitHub repository was created or pushed and no public URL was created. No development commits were fabricated. The source, supplied portrait and confirmed licence year are updated; actual local installation, browser checks, GitHub history and deployment remain user-side steps.

## Reproduce on your computer

Run `npm install`, `npm test`, `npm run dev` and `npm run build` inside client. Test six-route navigation, About portrait, the PDF link, project images, invalid input, valid capture and all five fields on Home, clearing the receipt and narrow-screen layout. Repeat direct-route reloads and assets/form checks on the real public host.

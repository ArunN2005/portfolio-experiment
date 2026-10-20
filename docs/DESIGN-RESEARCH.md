# Design research and original direction

Research performed on 20 October 2026. This is a documented reference review, not an exhaustive ranking of the latest portfolios. Direct requests to Awwwards, brittanychiang.com, paco.me, bruno-simon.com, and rauno.me were blocked by this environment's network policy. Public GitHub sources and repository-hosted preview images were accessible and were inspected instead. No browser experience on a blocked live site is claimed.

## Sources actually reviewed

| Reference                                                               | Material inspected                                                                | Useful lesson                                                                                                                                                                         | Application here                                                                                                                                                         |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Bruno Simon, Folio 2025](https://github.com/brunosimon/folio-2025)     | Current repository README, package manifest, and repository-hosted social preview | A memorable, interactive identity can make a portfolio itself demonstrate the author's interests. The source documents a full game loop with inputs, physics, weather, and rendering. | One original, lightweight canvas sculpture and three project-specific experiments. The work remains immediately accessible without navigating a game.                    |
| [Brittany Chiang, v4](https://github.com/bchiang7/v4)                   | README, preview image, and project-section source                                 | Clear project hierarchy, consistent typography, readable technical context, and explicit reduced-motion handling. This is an older reference, not presented as a new 2026 design.     | A short curated project list, honest technology tags, reduced-motion controls, and a readable experience section. Palette, layout, illustrations, and code are original. |
| [Lee Robinson's public site repository](https://github.com/leerob/site) | README describing the Next.js/MDX blog template                                   | A content-oriented personal site can stay restrained and easy to maintain. The README alone does not establish the appearance of the current live website.                            | Keep content in a small typed data file and make the site's core information usable without extra visual navigation.                                                     |
| [Arun's GitHub profile](https://github.com/ArunN2005)                   | Public profile links; read-only Git verification of LAZARUS-V2                    | Verify real destinations before putting project links on the site.                                                                                                                    | The Lazarus case study links to the confirmed repository. Other projects receive no guessed “live” URLs.                                                                 |

Public profiles for Paco Coursey and Rauno Freiberg were accessible, but guessed portfolio source paths were not. No design conclusions are attributed to files that could not be retrieved. No code, screenshots, or visual assets from the references are shipped in this portfolio.

## Design concept: an engineering notebook

The personal link is **connecting the dots**. The resume repeatedly connects interface, model, backend, and cloud. A connected wire sculpture expresses that idea without relying on generic code screenshots, giant gradients, stock images, or a simulated desktop.

The layout combines warm ivory, dark olive ink, a burnt-orange accent, precise ruled dividers, and small figure labels. DM Sans supplies clear interface typography; Instrument Serif supplies a warmer, editorial voice in headlines. Both are served locally so font loading requires no third-party requests.

The system has deliberate contrast in scale: a large opening statement, generous space around a single interactive object, then compact, structured detail. The map, migration diagram, and solar pipeline are custom CSS/SVG compositions tied to the projects. The color differences help visitors distinguish work without fragmenting the overall design.

## Interaction decisions

- **Sculpture:** three shapes, drag rotation, keyboard arrow controls, offscreen rendering suppression, bounded pixel density, and reduced-motion support. It communicates curiosity but blocks no content.
- **Projects:** category filters and native modal dialogs with problem, approach, role, and takeaway. Escape closes dialogs and focus returns to the trigger.
- **Command menu:** Ctrl/Cmd+K, search, arrow-key selection, Enter, and Escape. Accessible from a visible header button on touch devices.
- **Playground:** a staged migration walkthrough, a solar validation sandbox with failure states, and a civic priority model. Each is labeled as a concept with sample data.
- **Experience and skills:** progressive disclosure to keep the initial page calm without deleting technical detail.
- **Appearance:** locally persisted light/dark mode; system reduced-motion preference plus an explicit motion control.
- **Contact:** copyable email, real profile links, downloadable source PDF, and a form that opens an email draft with user-entered context.

## Smoothness and accessibility

Use native scrolling rather than scroll interception. Use transform/opacity transitions for feedback, and retain full content when animation is reduced. The sculpture does not draw when offscreen or the document is hidden. Avoid network-dependent demonstrations, autoplay audio, cursor replacement, and expensive 3D assets.

The site uses semantic landmarks, native dialog focus containment, descriptive button names, visible keyboard focus, labeled inputs, status announcements, arrow-key tab navigation, and a skip link. Automated checks cover desktop and mobile layouts, color contrast, dialogs, keyboard navigation, and functional changes in the experiments. Automated scans complement the visual and keyboard review; they are not a claim of complete accessibility certification.

## Known boundaries

This is a complete static portfolio frontend. Its project visuals and experiments are explanatory, not live integrations with AWS, Google Maps, Roboflow, or smart contracts. Contact uses the visitor's email application. Following the explicit hosting request, the site was deployed to GitHub Pages. A custom domain and email delivery infrastructure are not configured.

# GitHub Pages deployment

The public destination is `https://arunn2005.github.io/portfolio-experiment/` once Pages is enabled and its deployment completes. The presence of the branch does not establish that the website is live.

## Build

```sh
npm ci
npm run build -- --base=/portfolio-experiment/
```

This sets the correct prefix for JavaScript, styles, fonts, the favicon, and resume links. Upload the contents of `dist/` to the root of the `gh-pages` branch, including an empty `.nojekyll` file.

## Activate hosting

In the repository's Settings → Pages, choose **Deploy from a branch**, then select **gh-pages** and **/ (root)**. Save. A maintainer with repository administration access can alternatively enable the same configuration through the GitHub Pages API.

Wait for the Pages deployment to finish, then verify the public homepage, the `/portfolio-experiment/Arun-N-Resume.pdf` download, and a project dialog in a browser. The Pages deployment may take several minutes after activation.

GitHub Pages hosts a static application. The playground uses sample data, and the contact form opens the visitor's email client; no backend secrets are required.

## Environment connectivity

Enabling and checking the site from this cloud machine requires HTTPS access to `api.github.com` and `arunn2005.github.io`. A saved environment configuration draft alone does not apply those network rules to the running machine.

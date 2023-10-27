---
title: 'Universal Links and Github Pages'
date: '2023-10-26'
author: "nezaj"
---

I made Stroopwafel, a casual brain game using React Native and InstantDB and wanted to get Universal links working for apple devices. This requires hosting `/.well-known/apple-app-site-association` at the root of a domain. Kind of annoying needing to set up a domain but figured I could use the domain for hosting a landing page for the app itself.


I’ve used Github Pages for free hosting and wanted to do so again. Getting universal links working though had some gotchas and after some sleuthing via StackOverflow, ChatGPT, and articles was able to get it working. Here’s how I did it, maybe you’ll find it useful too.

**Make a Github Repo + Buy a Custom Domain**

- Make a new hello world repo using `create-react-app` and publish it with `gh-pages`
- Buy a domain on namecheap, hook it up to your github repo [with this article](https://www.namecheap.com/support/knowledgebase/article.aspx/9645/2208/how-do-i-link-my-domain-to-github-pages/). Verify you see hello world when you go to your custom domain.

**Repo Structure**

Add some files to your `public` directory

```bash
echo stroopwafel.app > public/CNAME
touch public/.nojekyll
mkdir public/.well-known
```

When using `create-react-app` files/folders put under the `public` directly will be copied as-is into the build folder. `CNAME` ensures your custom domain persists across deploys, `.nojekyll` ensures dotfiles will be served, and the  `.well-known` directory will house your `apple-app-site-association` config. Here’s how it looks for Stroopwafel.


```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "F7UXG9KL42.com.jsventures.stroopwafel",
        "paths": ["/join/*"]
      }
    ]
  }
}
```

Put this in _/public/.well-known/apple-app-site-association_ Notice how the file doesn't have an extension? That's important.

Adjust your `package.json` to ensure dotfiles are uploaded to the `gh-pages` branch.


```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build --dotfiles",
```

And now you should be ready to deploy!


```bash
npm run deploy
```

You can test everything works via [Branch’s  AASA validator](https://branch.io/resources/aasa-validator/)

Big thanks [to this article](https://realfiction.net/posts/serving-the-well-known-webfinger-from-github-pages/) for the hint about including the `--dotfiles` flag for gh-pages. I noticed the dotfiles weren’t being copied over and wasn’t sure why, happy this article existed and hope others find this quick write up useful as well.

Example Repo: https://github.com/nezaj/stroop-web/tree/main



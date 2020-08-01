# Official Love & Tolerance Resource Pack site source code
This is the source code of the site. The site is built with [Gulp](https://github.com/gulpjs/gulp) using [Pug](https://github.com/pugjs/pug), [Sass](https://github.com/sass/sass) and [TypeScript](https://github.com/microsoft/typescript).

## Prerequisites
- Unix-based OS, e.g. Ubuntu (recommended but not required)
- Node JS v13.9.x
- NPM v6.14.x

## Development
### Installing Node
[NodeJS](http://nodejs.org/) is required to develop this site. Go to [downloads](https://nodejs.org/en/download/current/) page and download binaries for your OS (you can use installer, but this guide doesn't cover it. Though, it should do all the process automatically).

Extract `node` and `npm` binaries to your binaries folder. If you haven't created it yet you may want to add it's path to environment variable `PATH`. Also add this path to `PATH`: `./node_modules/.bin`.

Check the setup by typing `node -v` and `npm -v`. This should print versions of installed binaries (check Prerequisites).

[NPM team installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### NPM permission issues
It is recommended to install global modules to a directory which doesn't require superuser to write. To make modules be installed in that folder automatically run this in your terminal: `npm config set prefix "/home/PUT_USERNAME_HERE/.npm-global"` (you can use different folder).
NPM shouldn't have this issue on Windows.

[NPM team guide on this issue](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

### Cloning the repo
Open terminal, go to your projects folder and clone this repo with `git clone https://github.com/keupoz/love-tolerance-site-dev`. Go to the downloaded folder and type `npm i` to install dependencies.

Now you are ready to run the site! Type `npm run dev` to start dev server or `npm run build` to build the site to `dist` folder.

## Data files
Data files are written in JSON format. They are usually used in Pug templates. You can change the files while dev server is running and after a change the site will be automatically rebuilt.

The data is accessed via `data` Pug local. The `data` object respects ierarchy structure of files. Some files have their own global definition.

Also there can be files and folders with the same name (e.g. `cards.json` and `cards/` folder). They are just merged in one object (e.g. `data.cards` will have properties of `cards.json` and files from `cards/` folder).

### Site information
Accessed via `site` Pug local.

```jsonc
{
    // Title pattern for pages. Can be seen in tab name
    "title": "%s - Love & Tolerance",
    // Site name. Can be seen in preview embeds like those ones when you share a link in Discord
    "name": "Love & Tolerance Official site",
    // Canonical URL. For OpenGraph
    "url": "https://love-tolerance.com",
    // Site description. Used for embeds if a page doesn't provide it's own description
    "description": "Hello, and welcome to the home of Love and Tolerance, a My Little Pony: Friendship is Magic-inspired resource pack!",
    // Links to use in templates globally
    "links": {
        // Main GitHub repo of the resource pack
        "githubRepo": "https://github.com/Love-and-Tolerance/Love-and-Tolerance",
        // Google archive of old versions of the resource pack
        "googleArchive": "https://drive.google.com/drive/folders/1Tz9zB1VWenbSsVrwjBYRs4gwy28sHU5P?usp=sharing",
        // The Discord invite
        "discordInvite": "https://discord.gg/fxNMGvm"
    }
}
```

### Site menu
Use `getMenuList()` to get an array of entry names. Use `getMenuEntry(name)` to get the path of menu entry (must be used for dev server support)

```jsonc
{
    // Paths must end with /
    "Home": "/",
    "Page 1": "/path/to/page/1/",
    "Page 2": "/path/to/page/2/"
}
```

### Cards
Cards are accessed via `data.cards`.

#### Regular cards
Pass these cards to `card` or `cards-container` Pug mixins:
```pug
+card(data.cards.features[0])
+cards-container(data.cards.features)
```

```jsonc
[
    {
        "title": "Title of the card",
        "description": "Description of the card",
        // Image of the card. Images are stored in src/assets/cards/${path}.png
        "image": "type/name"
    }
]
```

#### Team cards
Pass these cards to `team-card` or `team-cards-container` Pug mixins:
```pug
+team-card(data.cards.team[0])
+team-cards-container(data.cards.team)
```

```jsonc
[
    {
        "name": "Member name",
        "description": "Member role",
        // Optional
        "nickname": "Member Minecraft nickname",
        // src/assets/cards/${path}
        "avatar": "team/avatar.ext",
        // Social links. Optional
        "social": {
            "discord": "User Name#0000",
            "email": "username@example.com",
            "github": "username",
            "twitter": "username",
            "vk": "username"
        }
    },
]
```

## Pug templates
TODO Complete README

# Official Love & Tolerance Resource Pack site source code
This is the source code of the site. The site is built with [Parcel 2](https://github.com/parcel-bundler/parcel) using [Pug](https://github.com/pugjs/pug), [Sass](https://github.com/sass/sass) and [TypeScript](https://github.com/microsoft/typescript).

## Recommendations
Recommended OS is Unix-based one (preferably latest Ubuntu release). Used NodeJS version while development is v13.9.x and NPM is v6.14.x (just always use updated software).

## Development
To make changes to the site you'll need [NodeJS](http://nodejs.org/) and NPM. Download the binaries, extract `node` executive to wherever you want and add it to your `PATH` environment variable. Then run `npm i -g npm` using NPM binary shipped with NodeJS to install latest NPM version globally.

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
        // Google archive of old versions of the resource pack
        "googleArchive": "https://drive.google.com/drive/folders/1Tz9zB1VWenbSsVrwjBYRs4gwy28sHU5P?usp=sharing",
        // The Discord invite
        "discordInvite": "https://discord.gg/fxNMGvm"
    }
}
```

### Site menu
Accessed via `site.menu`. Use `getMenuPath(name)` to get the path of menu entry (must be used for dev server support)

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

#### Icon cards
Pass these cards to `icon-card` Pug mixin:
```pug
+card(data.cards.features[0])
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
Pass these cards to `team-card` Pug mixin:
```pug
+team-card(data.cards.team[0])
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

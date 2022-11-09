import type { Endpoints } from "@octokit/types";

function isEmpty(value: string | undefined): value is undefined {
  return value === undefined || value === "";
}

function parseProtocol(url: string): string {
  if (url.startsWith("https://github.com/")) {
    return url.replace("https://github.com/", "");
  }

  if (url.startsWith("git@github.com:")) {
    return url.replace("git@github.com:", "");
  }

  throw new Error(`Only SSH- and HTTPS-like GitHub URLs are supported (${url})`);
}

function normalizeName(name: string, type: string | undefined): string {
  return isEmpty(type) ? name.replace(/\.git$/, "") : name;
}

export class GitHubRepo {
  public readonly owner: string;
  public readonly name: string;

  public readonly branch?: string;

  constructor(owner: string, name: string, branch?: string) {
    this.owner = owner;
    this.name = name;

    if (branch !== undefined) {
      this.branch = branch;
    }
  }

  public static fromUrl(url: string, branch?: string): GitHubRepo {
    const [owner, name, type] = parseProtocol(url).split("/");

    if (isEmpty(owner) || isEmpty(name)) {
      throw new Error(`GitHub URL must contain repo's owner and name (${url})`);
    }

    return new GitHubRepo(owner, normalizeName(name, type), branch);
  }

  public getBranch(): string {
    return this.branch ?? "HEAD";
  }

  public rawContentUrl(filename: string): string {
    return `https://raw.githubusercontent.com/${this.owner}/${this.name}/${this.getBranch()}/${filename}`;
  }

  public getUrl(type?: string, path?: string): string {
    let result = `https://github.com/${this.owner}/${this.name}/`;

    if (type !== undefined) {
      result += `${type}/${this.getBranch()}/`;

      if (path !== undefined) {
        result += path;
      }
    }

    return result;
  }

  public async fetchInfo(): Promise<Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]> {
    const r = await fetch(`https://api.github.com/repos/${this.owner}/${this.name}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (r.status !== 200) {
      throw new Error(`Failed to fetch repo info: ${r.status}`);
    }

    return await r.json();
  }
}

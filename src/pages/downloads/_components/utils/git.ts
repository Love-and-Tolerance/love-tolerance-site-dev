import { Endpoints } from "@octokit/types";

export type RepoTuple = [owner: string, name: string];

export const GITHUB_REGEX = /^https:\/\/github\.com\/([\w+-_]+)\/([\w+-_]+)$/;

export function parseGitHubUrl(url: string): RepoTuple {
  const match = url.match(GITHUB_REGEX);

  if (match === null) {
    throw new Error(`Failed to parse GitHub url: "${url}"`);
  }

  const [, owner, name] = match;

  if (owner === undefined || name === undefined) {
    throw new Error("Repo owner or name is undefined");
  }

  return [owner, name];
}

export async function fetchRepoInfo(owner: string, name: string): Promise<Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]> {
  const r = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
    cache: "force-cache",
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (r.status !== 200) {
    throw new Error(`Failed to fetch repo info: ${r.status}`);
  }

  return await r.json();
}

export function getRawContentUrl(owner: string, name: string, branch: string, path: string): string {
  return `https://raw.githubusercontent.com/${owner}/${name}/${branch}/${path}`;
}

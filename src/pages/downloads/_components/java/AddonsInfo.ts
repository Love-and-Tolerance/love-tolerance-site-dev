import { GitHubRepo } from "../GitHubRepo";
import { RawBaseRepo } from "../schemas";
import { AddonInfo } from "./AddonInfo";
import { RawAssets } from "./schemas";

export class AddonsInfo {
  public readonly base: BaseRepoInfo;
  public readonly addons: AddonInfo[] = [];

  constructor(raw: RawAssets) {
    this.base = new BaseRepoInfo(raw.repos.base);

    for (const rawAddon of raw.repos.addons) {
      const addon = new AddonInfo(rawAddon);

      this.addons[addon.idPos - 1] = addon;
    }
  }
}

export class BaseRepoInfo {
  public readonly repo: GitHubRepo;
  public readonly mcVersions: string;
  public readonly version: string;

  public readonly image: string;

  private readonly tag: string;
  private readonly releaseUrl: string;
  private readonly filename: string;

  constructor(raw: RawBaseRepo) {
    this.repo = GitHubRepo.fromUrl(raw.url, raw.tag);
    this.mcVersions = raw.mc_versions;
    this.version = raw.version;

    this.image = this.repo.rawContentUrl("pack.png");

    this.tag = raw.tag;
    this.releaseUrl = raw.release_url;
    this.filename = raw.filename;
  }

  public getFilename(variants: string[]): string {
    const ids = variants.join("");
    const filename = this.filename.replace("{version}", this.version).replace("{ids}", ids);

    return this.releaseUrl.replace("{tag}", this.tag).replace("{filename}", filename);
  }
}

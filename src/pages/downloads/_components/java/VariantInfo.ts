import { GitHubRepo } from "../GitHubRepo";
import { RawVariant } from "./schemas";

export class VariantInfo {
  public readonly id: string;
  public readonly name: string;
  public readonly repo?: GitHubRepo;
  public readonly image?: string;

  private description?: string | null;

  constructor(raw: RawVariant) {
    this.id = raw.id;
    this.name = raw.name;

    if (raw.url !== undefined) {
      this.repo = GitHubRepo.fromUrl(raw.url, raw.branch);
    }

    if (raw["pack.png"] !== undefined) {
      this.image = raw["pack.png"];
    } else if (this.repo !== undefined) {
      this.image = this.repo.rawContentUrl("pack.png");
    }
  }

  public async getDescription(): Promise<string | null> {
    if (this.description === undefined && this.repo !== undefined) {
      const info = await this.repo.fetchInfo();

      this.description = info.description;
    }

    return this.description ?? null;
  }
}

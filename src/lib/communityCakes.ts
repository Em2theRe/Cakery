import { readdirSync } from "node:fs";
import path from "node:path";

const CAKES_DIR = path.join(process.cwd(), "public", "cakes");
const SUPPORTED_IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

export function getCommunityCakePaths(): string[] {
  try {
    return readdirSync(CAKES_DIR, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => SUPPORTED_IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, "de"))
      .map((fileName) => `/cakes/${fileName}`);
  } catch {
    return [];
  }
}

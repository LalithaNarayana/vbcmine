// Regenerates src/constants/lucideIconNames.ts directly from the
// installed lucide-react package's own dynamic-icon import map, so the
// list can never silently drift out of sync with (or be truncated
// relative to) the version actually in node_modules.
//
// Run manually after bumping the lucide-react dependency:
//   node scripts/generateLucideIconNames.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import dynamicIconImports from "lucide-react/dynamicIconImports.mjs";
import pkg from "lucide-react/package.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "src", "constants", "lucideIconNames.ts");

const names = Object.keys(dynamicIconImports).sort();

const header = `// Auto-generated from lucide-react v${pkg.version} dynamicIconImports.
// Full list of every valid kebab-case icon name usable with lucide-react/dynamic
// (DynamicIcon / IconName) — powers the admin IconPicker search-and-save flow
// and the /api/icons/search endpoint.
//
// Regenerate with: node scripts/generateLucideIconNames.mjs
// (do this after every lucide-react version bump — do not hand-edit)
export const LUCIDE_ICON_NAMES: string[] = [
${names.map((n) => `  "${n}",`).join("\n")}
];
`;

writeFileSync(outPath, header, "utf8");
console.log(`Wrote ${names.length} icon names to ${path.relative(process.cwd(), outPath)}`);

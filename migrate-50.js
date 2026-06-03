const fs = require("fs");

const dataFile = fs.readFileSync("lib/new-components-data.js", "utf8");

let NEW_COMPONENTS = [];
const arrayMatch = dataFile.match(/export const NEW_COMPONENTS = (\[[\s\S]*?\]);/);
if (arrayMatch) {
  try {
    NEW_COMPONENTS = eval(arrayMatch[1]);
  } catch (e) {
    console.error("Failed to eval NEW_COMPONENTS", e);
    process.exit(1);
  }
}

const CATEGORY_MAP = {
  navigation: "navbar",
  forms: "forms",
  display: "cards",
  interaction: "buttons",
  registry: "modals",
  utility: "tooltips",
};

const toCamelCase = (str) => {
  return str.split("-").map(part => part.charAt(0).toUpperCase() + part.slice(1)).join("");
};

let promptsData = fs.readFileSync("lib/prompts-data.js", "utf8");
let previewsData = fs.readFileSync("components/previews-marketing.js", "utf8");

let newPreviews = "\n\n// --- MIGRATED 50 PREVIEWS ---\n";
newPreviews += "import { Code2 } from \"lucide-react\";\n";
newPreviews += "export function GenericComponentPreview({ name }) {\n" +
"  return (\n" +
"    <div className=\"w-full h-full flex flex-col items-center justify-center bg-muted/20 border border-dashed border-muted-foreground/30 rounded-xl\">\n" +
"      <div className=\"w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3\">\n" +
"        <Code2 className=\"w-6 h-6 text-primary\" />\n" +
"      </div>\n" +
"      <h3 className=\"text-sm font-medium text-foreground\">{name}</h3>\n" +
"      <p className=\"text-xs text-muted-foreground mt-1\">Preview not available</p>\n" +
"    </div>\n" +
"  );\n" +
"}\n\n";

NEW_COMPONENTS.forEach(comp => {
  const targetCategory = CATEGORY_MAP[comp.category] || "cards";
  const previewName = toCamelCase(comp.id) + "Preview";
  
  newPreviews += "export function " + previewName + "() { return <GenericComponentPreview name=\"" + comp.name + "\" />; }\n";
  
  const regexStr = targetCategory + ": \\\[";
  const regex = new RegExp("(" + regexStr + ")");
  const promptSafe = comp.prompt.replace(/`/g, "\\`").replace(/\$/g, "\\$");
  
  const componentStr = "\n    {\n" +
    "      id: '" + comp.id + "',\n" +
    "      name: '" + comp.name + "',\n" +
    "      tagline: '" + comp.tagline.replace(/'/g, "\\'") + "',\n" +
    "      preview: '" + previewName + "',\n" +
    "      prompt: `" + promptSafe + "`,\n" +
    "    },";
  
  promptsData = promptsData.replace(regex, "$1" + componentStr);
});

fs.writeFileSync("components/previews-marketing.js", previewsData + newPreviews);
fs.writeFileSync("lib/prompts-data.js", promptsData);
console.log("Migration complete!");

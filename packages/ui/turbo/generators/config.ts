import type { PlopTypes } from "@turbo/gen";

// Learn more about Turborepo Generators at https://turborepo.com/docs/guides/generating-code

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("cli", {
    description: "Creates a new CLI tool",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the CLI tool?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/{{kebabCase name}}/index.ts",
        templateFile: "templates/cli.hbs",
      },
      {
        type: "modify",
        path: "package.json",
        pattern: /"bin":\s*\{[\s\S]*?\}/,
        template: `"bin": {
  "{{kebabCase name}}": "./src/{{kebabCase name}}/index.ts"
}`,
      },
    ],
  });
}

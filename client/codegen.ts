import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "http://localhost:3010",
    documents: ["src/**/*.ts"],
    generates: {
      "./src/__generated__/graphql.ts": {
        plugins: [
          "typescript",
          "typescript-operations",
          "typescript-react-apollo",
        ],
        config: {
          withHooks: true,
        },
      },
    },
  };
  

export default config;

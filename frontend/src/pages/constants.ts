
interface Languages {
    [key: string]: string;
}

export const LANGUAGE_VERSIONS: Languages = {
    python: "3.10.0",
    java: "15.0.2",
    javascript: "18.15.0",
    typescript: "5.0.3",
};

export const CODE_SNIPPETS: Languages = {
    python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")`,
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World!");\n\t}\n}\n`,
    javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
    typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex"});\n`,
}
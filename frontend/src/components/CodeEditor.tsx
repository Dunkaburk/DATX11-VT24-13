import { Box, HStack } from "@chakra-ui/react"
import { Editor } from "@monaco-editor/react"
import { useRef, useState } from "react"
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../pages/constants";
import Output from "./Output";

const CodeEditor = () => {
    const editorRef = useRef();
    const [value, setValue] = useState("");
    const language: string = "python";

    const onMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus();
    }


    return (
        <HStack spacing={4}>
            <Box w="50%">
                <LanguageSelector language={language} />
                <div style={{ border: "1px solid black" }}> {/* Wrapper div with black border */}
                    <Editor 
                        height="75vh" 
                        theme="vs-light" 
                        language={language} 
                        defaultValue={CODE_SNIPPETS[language]}
                        onMount={onMount}
                        value={value}
                        onChange={(value) => setValue(value || "")}
                        options={{ minimap: { enabled: false } }}
                    />
                </div>
            </Box>
            <Output editorRef={editorRef} language={language}/>
        </HStack>
    )
}

export default CodeEditor
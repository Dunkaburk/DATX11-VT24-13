import { Box, Text, Button, useToast } from "@chakra-ui/react"
import { FC, MutableRefObject, useState } from "react";
import { executeCode } from "../hooks/api";


interface OutputProps {
    language: string;
    editorRef: MutableRefObject<any>;
}

const Output: FC<OutputProps> = ({editorRef, language}) => {
    const [output, setOutput] = useState<string[]>()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const toast = useToast()

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return
        try {
            setIsLoading(true)
            const {run:result} = await executeCode({language, sourceCode});
            setOutput(result.output.split("\n"))
            result.stderr ? setIsError(true) : setIsError(false)
        } catch (error: any) {
            console.log(error)
            toast({
                title: "An erro occurred.",
                description: error.message || "Unable to run code",
                status: "error",
                duration: 6000,
            });
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <Box w="50%">
            <Text mb={2} fontSize="lg" color={"black"}>
                Output:
            </Text> 
            <Button colorScheme="blue" mb={4} isLoading={isLoading} onClick={runCode}>
                Run Code
            </Button>
            <Box 
                height="75vh"
                p={2}
                color={isError ? "red.400" : ""}
                border="1px solid"
                borderRadius={4}
                borderColor={isError ? "red.500" : "#333"}
            >
                {output 
                    ? output.map((line: string, i: number) => <Text key={i}>{line}</Text>) 
                    : 'Click "Run Code" to see the output here'}
            </Box>
        </Box>
    )
}

export default Output

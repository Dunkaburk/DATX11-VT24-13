import axios from "axios";
import { LANGUAGE_VERSIONS } from "../pages/constants";

interface executeCodeProps {
    language: string;
    sourceCode: string;
}

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
}) 

export const executeCode = async (props: executeCodeProps) => {
    const response = await API.post('/execute', {
        "language": props.language,
        "version": LANGUAGE_VERSIONS[props.language],
        "files": [
            {
                "content": props.sourceCode,
            }
        ],
    });
    return response.data;
}
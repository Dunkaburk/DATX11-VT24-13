import { Box, Button, Menu, MenuButton, Text, Textarea } from "@chakra-ui/react"
import { LANGUAGE_VERSIONS } from "../pages/constants"

type LanguageSelectorProps = {
    language: string;
};
  
const LanguageSelector = ({language}: LanguageSelectorProps) => {
    return (
        <Box ml={2} mb={4}>
            <Text mb={2} fontSize='lg' color={"black"}>Language: </Text>
            <Button variant={"outline"} sx={{ cursor: "not-allowed", pointerEvents: "none" }} isActive={false} colorScheme={"blue"}>
                {language}
            </Button>
        </Box>
    )
}

export default LanguageSelector
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { LANGUAGE_VERSIONS } from "../constants"
import { FC } from "react";

const Languages = Object.entries(LANGUAGE_VERSIONS)

interface LanguageSelectorProps {
    language: string;
    onSelect: (language: string) => void;
}

const ACTIVE_COLOR = "blue.400";
  
const LanguageSelector: FC<LanguageSelectorProps> = ({ language, onSelect }) => {
    return (
        <Box ml={2} mb={4}>
            <Text mb={2} fontSize='lg'>Language: </Text>
            <Menu isLazy>
                <MenuButton as={Button} >
                    {language}
                </MenuButton>
                <MenuList bg="#110c1b">
                    {
                        Languages.map(([lang, version]) => (
                            <MenuItem key={lang}
                                color = {
                                    lang === language ? ACTIVE_COLOR : ""
                                }
                                bg = {
                                    lang === language ? "grey.900" : "transparent"
                                }
                                _hover = {{
                                    color:ACTIVE_COLOR,
                                    bg:"grey.900"

                                }}
                            onClick={() => onSelect(lang)}
                            >{lang}
                                &nbsp;
                                <Text as="span" color="grey.600" fontSize="sm">
                                    ({version})
                                </Text>
                            </MenuItem>
                        ))
                    }
                </MenuList>
            </Menu>
        </Box>
    )
}

export default LanguageSelector
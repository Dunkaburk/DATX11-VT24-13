import { Box } from '@chakra-ui/react';
import CodeEditor from '../../components/CodeEditor';

function CodeEditorBox() {
    return (
      <Box minH="100vh" bg="#ffffff" color="black" px={6} py={8}>
        <CodeEditor />
      </Box>
    );
  }
  
  export default CodeEditorBox;
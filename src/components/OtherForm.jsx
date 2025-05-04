// components/OtherForm.jsx
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const OtherForm = () => {
  return (
    <Box bg="white" p="20px" borderRadius="lg" boxShadow="sm">
      <FormControl mb="15px">
        <FormLabel>Judul</FormLabel>
        <Input />
      </FormControl>
      <FormControl mb="15px">
        <FormLabel>Deskripsi</FormLabel>
        <Input />
      </FormControl>
      <Button colorScheme="teal">Simpan</Button>
    </Box>
  );
};

export default OtherForm;

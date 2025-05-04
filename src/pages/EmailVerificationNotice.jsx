// src/pages/EmailVerificationNotice.jsx
import { Box, Text, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function EmailVerificationNotice() {
  return (
    <Box textAlign="center" mt={20} p={5}>
      <Heading color={"gray.600"} mb={4}>Verifikasi Email Diperlukan</Heading>
      <Text fontSize="lg" mb={4} color={"gray.600"}>
        Kami telah mengirimkan email verifikasi ke alamat email Anda.
        Silakan cek inbox atau folder spam Anda.
      </Text>
      <Text fontSize="md" mb={6} color={"gray.600"}>
        Setelah verifikasi, Anda bisa login menggunakan akun yang baru dibuat.
      </Text>
      <Button colorScheme="teal" as={Link} to="/login">
        Kembali ke Login
      </Button>
    </Box>
  );
}

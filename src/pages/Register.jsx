import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const { registerWithEmail } = UserAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async () => {
    if (!email || !password || !displayName) {
      toast({
        title: "Semua field wajib diisi",
        status: "warning",
        position: "top",
      });
      return;
    }
    setIsLoading(true);
    const { data, error } = await registerWithEmail(email, password, displayName);
    // Lakukan registrasi dengan Supabase
    if (error) {
      toast({
        title: "Gagal registrasi",
        description: error.message,
        status: "error",
        position: "top",
      });
      return;
    }

    const userId = data?.user?.id;

    // Tambahkan display name dan phone ke profil user di Supabase
    if (userId) {
      await supabase
        .from("profiles")
        .upsert({ id: userId, full_name: displayName });

      toast({
        title: "Registrasi berhasil",
        status: "success",
        position: "top",
      });
      setIsLoading(false);
      navigate("/verify-email");
    }
  };

  return (
    <Center w="100%" h="100dvh" px="10px">
      <Box
        w="100%"
        maxW="400px"
        p="6"
        boxShadow="md"
        borderRadius="md"
        bg="white"
        border="1px solid #ccc"
      >
        <Flex flexDir="column" gap="20px">
          <Text fontSize="2xl" textAlign="center" color={"gray.600"}>
            Register Akun
          </Text>

          <Input
            placeholder="Nama Lengkap"
            value={displayName}
            color={"black"}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            color={"black"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            color={"black"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button colorScheme="teal" onClick={handleRegister} isLoading={isLoading}>
            Register
          </Button>

          <Text color={"gray.600"}>
            Sudah punya akun?{" "}
            <a href="/login" style={{ color: "blue" }}>
              Login
            </a>
          </Text>
        </Flex>
      </Box>
    </Center>
  );
}

export default Register;

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { UserAuth } from "../context/AuthContext";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { signInWithEmail, signInWithOAuth, currentUser } = UserAuth();
  

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleLoginWithEmail = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const token = data.session.access_token;
      localStorage.setItem("access_token", token);
      toast({
        title: "Login berhasil",
        status: "success",
        position: "top",
      });
    } catch (err) {
      toast({
        title: "Login gagal",
        description: err.message,
        status: "error",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center w="100%" h="100dvh" bg="gray.50" px="10px">
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="md"
        w="100%"
        maxW="400px"
      >
        <Flex flexDir="column" gap="20px">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="gray.700">
            Login
          </Text>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            color="black"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            color="black"
          />
          <Button
            isLoading={loading}
            onClick={handleLoginWithEmail}
            colorScheme="teal"
          >
            Login
          </Button>
          <Text fontSize="sm" textAlign="right" color="gray.600">
            Lupa Kata Sandi?{" "}
            <a href="/reset-password" style={{ color: "blue" }}>
              Reset Password
            </a>
          </Text>
          <Flex my="1px" align="center">
            <Divider />
            <Text px="10px" fontSize="sm" color="gray.500">
              OR
            </Text>
            <Divider />
          </Flex>

          <Flex gap={3}>
          <Button
            flex={1}
            leftIcon={<i class="ci ci-google"></i>}
            boxShadow="md"
            bg="white"
            color="black"
            border="1px solid #ccc"
            _hover={{ bg: "gray.100" }}
            onClick={() => signInWithOAuth("google")}
          >
            Google
          </Button>

          <Button
            flex={1}
            leftIcon={<i class="ci ci-facebook"></i>}
            boxShadow="md"
            bg="#1877F2"
            color="white"
            border="1px solid #ccc"
            _hover={{ bg: "#1877F2" }}
            onClick={() => signInWithOAuth("facebook")}
          >
            Facebook
          </Button>
        </Flex>
          

          <Text fontSize="sm" textAlign="center" color="gray.600">
            Belum punya akun?{" "}
            <a href="/register" style={{ color: "blue" }}>
              Daftar
            </a>
          </Text>

       

          
        </Flex>
      </Box>
    </Center>
  );
}

export default Login;

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
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
  console.log(import.meta.env);
  const { signInWithEmail, signInWithOAuth, currentUser } = UserAuth();
 
  //auth kuhusus google dan facebook
  useEffect(() => {
    if (currentUser) {
      navigate("/"); // redirect ke dashboard jika sudah login
    }
  }, [currentUser, navigate]);

  const handleLoginWithEmail = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      const token = data.session.access_token;
      localStorage.setItem("access_token", token);
      toast({
        title: "Login berhasil",
        status: "success",
        position: "top",
      });
      // navigate("/"); // arahkan ke halaman utama atau dashboard
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
    <Center w="100%" h="100dvh" px="10px">
      <Flex flexDir="column" maxW="400px" w="100%" gap="20px">
        <Text fontSize="2xl" textAlign="center" color={"gray.600"}>
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
        <Text mt={2}color={"gray.600"}>
        Lupa Kata Sandi?{" "}
  <a href="/reset-password" style={{ color: "blue" }}>
    klik disini
  </a>
</Text>
        <Text color={"gray.600"}>
          Don&apos;t have an account?{" "}
          <a href="/register" style={{ color: "blue" }}>
            Register
          </a>
        </Text>
        <Flex my="25px" align="center" px="10%">
          <Divider />
          <Text px="15px" color={"gray.600"}>OR</Text>
          <Divider />
        </Flex>
        <Button
  w="100%"
  colorScheme="red"
  onClick={() => signInWithOAuth("google")}
>
  Login with Google
</Button>

<Button
  w="100%"
  colorScheme="blue"
  onClick={() => signInWithOAuth("facebook")}
>
  Login with Facebook
</Button>

      </Flex>
      

    </Center>
  );
}

export default Login;

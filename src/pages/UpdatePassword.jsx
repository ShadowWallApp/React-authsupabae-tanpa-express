import { Button, Center, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast({
        title: "Gagal update password",
        description: error.message,
        status: "error",
        position: "top",
      });
    } else {
      toast({
        title: "Password berhasil diperbarui",
        status: "success",
        position: "top",
      });
      navigate("/login");
    }
  };

  return (
    <Center w="100%" h="100vh">
      <Flex direction="column" w="300px" gap={4}>
        <Text fontSize="xl" fontWeight="bold" color={"teal.500"}>Masukkan Password Baru</Text>
        <Input
          placeholder="Password Baru"
          type="password"
          value={newPassword}
          color={"black"}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleUpdatePassword}>
          Update Password
        </Button>
      </Flex>
    </Center>
  );
};

export default UpdatePassword;

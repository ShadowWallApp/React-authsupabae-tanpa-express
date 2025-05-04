// components/Topbar.jsx
import {
  Flex,
  IconButton,
  Text,
  Avatar,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { UserAuth } from "../context/AuthContext";

const Topbar = ({ user, onOpenSidebar, onLogout }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { currentUser } = UserAuth();
  
  return (
    <Flex
      justify="space-between"
      align="center"
      mb={4}
      px={4}
      py={3}
      bg="white"
      borderRadius="lg"
      boxShadow="sm"
      w="100%"
    >
      {/* Left: Logo or Menu */}
      <Flex align="center" gap={3}>
        {isMobile && (
          <IconButton
            icon={<FiMenu />}
            onClick={onOpenSidebar}
            aria-label="Open Menu"
            colorScheme="teal"
            variant="ghost"
            size="sm"
          />
        )}
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold"
          color="teal.600"
        >
          My Dashboard
        </Text>
      </Flex>

      {/* Right: User Info */}
      <Flex align="center" gap={{ base: 2, md: 3 }}>
        {!isMobile && (
          <Text color="gray.600">{user?.displayName || currentUser?.user_metadata?.display_name ||currentUser?.user_metadata?.full_name||"User"}</Text>
        )}
        {/* <Avatar size="sm" name={user?.displayName} src={user?.photoURL}/> */}
        <Avatar
  size="sm"
  name={user?.displayName || currentUser?.user_metadata?.full_name}
  src={user?.photoURL || currentUser?.user_metadata?.avatar_url}
/>
        <Button
          colorScheme="red"
          size="sm"
          onClick={onLogout}
          variant="outline"
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Topbar;

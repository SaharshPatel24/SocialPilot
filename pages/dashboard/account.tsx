import type { NextPage } from 'next'
import { Avatar, Box, Drawer, DrawerContent, DrawerOverlay, Flex, Icon, IconButton, Input, InputGroup, InputLeftElement, Image, useDisclosure, useToast, Text, useBreakpointValue, TabPanels, TabPanel, Tabs, TabList, Tab, Card, CardHeader, Heading, CardBody, CardFooter, Button, FormLabel, FormControl, chakra, VisuallyHidden, Stack, FormHelperText, Textarea } from '@chakra-ui/react'
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { storeFiles, retrieveFiles } from '../../helpers/web3storage'
import { ABI } from '../../constants/abi-constant'
import Web3 from 'web3'
import { useAuth } from '../../context/AuthProvider'
import { usePostContext } from '../../context/PostProvider'
import PostCard from '../../components/PostCard/postCard'
import CreatePost from '../../components/CreatePost/createPost'

declare let window: any;

const Dashboard: NextPage = () => {

  const [description, setDescription] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<{ imageBlob: string, fileDetails: Record<never, string> }>();
  const [preview, setPreview] = useState<boolean>(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  }

  const posts = usePostContext();

  const toast = useToast();

  const margins = useBreakpointValue({
    base: 4,
    md: 4,
    lg: 4,
    xl: 8,
  });

  const sidebar = useDisclosure();

  const NavItem = (props: any) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        color="whiteAlpha.700"
        _hover={{
          bg: "blackAlpha.300",
          color: "whiteAlpha.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: "gray.300",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props: any) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="brand.600"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Text fontSize="2xl" ml="2" color="white" fontWeight="semibold">
          Social Pilot
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem ><Tab px={0} pr={200}>Home</Tab></NavItem>
        <NavItem ><Tab px={0} pr={105}>Create Post</Tab></NavItem>
      </Flex>
    </Box>
  );

  return (
    <Tabs isLazy variant="unstyled">
      <Box
        as="section"
        bg="gray.50"
        _dark={{
          bg: "gray.700",
        }}
        minH="100vh"
      >
        <SidebarContent
          display={{
            base: "none",
            md: "unset",
          }}
        />
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
        <Box
          ml={{
            base: 0,
            md: 60,
          }}
          transition=".3s ease"
        >
          <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="4"
            bg="white"
            _dark={{
              bg: "gray.800",
            }}
            borderBottomWidth="1px"
            borderColor="blackAlpha.300"
            h="14"
          >
            <IconButton
              aria-label="Menu"
              display={{
                base: "inline-flex",
                md: "none",
              }}
              onClick={sidebar.onOpen}
              icon={<HamburgerIcon />}
              size="sm"
            />
            <InputGroup
              w="46"
              display={{
                base: "none",
                md: "flex",
              }}
            >
              <InputLeftElement color="gray.500">
                <SearchIcon />
              </InputLeftElement>
              <Input placeholder="Search for posts..." />
            </InputGroup>

            <Avatar
              ml="4"
              size="sm"
              name="anubra266"
              src="https://avatars.githubusercontent.com/u/30869823?v=4"
              cursor="pointer"
              onClick={handleLogout}
            />
          </Flex>
          <TabPanels>
            <TabPanel>
                {posts?.map((post: any, index: any) => {
                  return (
                    <PostCard image={post.image} key={index} note={post.note} author={post.author}></PostCard>
                  )
                })}
            </TabPanel>
            <TabPanel>
                <CreatePost></CreatePost>
            </TabPanel>
          </TabPanels>
        </Box>
      </Box>
    </Tabs>
  )
}

export default Dashboard
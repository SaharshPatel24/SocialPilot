import type { NextPage } from 'next'
import { Avatar, Box, Drawer, DrawerContent, DrawerOverlay, Flex, Icon, IconButton, Input, InputGroup, InputLeftElement, Image, useDisclosure, useToast, Text, useBreakpointValue, TabPanels, TabPanel, Tabs, TabList, Tab, Card, CardHeader, Heading, CardBody, CardFooter, Button, FormLabel, FormControl, chakra, VisuallyHidden, Stack, FormHelperText, Textarea } from '@chakra-ui/react'
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { storeFiles, retrieveFiles } from '../../helpers/web3storage'
import { ABI } from '../../constants/abi-constant'
import Web3 from 'web3'
import { useAuth } from '../../context/AuthProvider'

declare let window: any;

const Dashboard: NextPage = () => {
  const [note, setNote] = useState<string>();
  const [allPost, setAllPost] = useState<any[]>();
  const [description, setDescription] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<{imageBlob: string, fileDetails: Record<never,string>}>();
  const [preview, setPreview] = useState<boolean>(false);
  const { logout } = useAuth();

  const handleLogout = async() => {
    await logout();
  }

  const toast = useToast();

  const margins = useBreakpointValue({
    base: 4,
    md: 4,
    lg: 4,
    xl: 8,
  });

  const getAllPostFromChain = async () => {
    try {
      if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
        const web3 = new Web3(window.ethereum || window.web3.currentProvider);
        const socialPilotContract = new web3.eth.Contract(ABI as any, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!);
        const posts = await socialPilotContract.methods.getAllPosts().call();
        let allPosts: any[] = [];
        await Promise.all(
          posts.map(async (post: any) => {
            allPosts.push({ image: await retrieveFiles(post.imageHash), note: post.note, author: post.author });
          })
        );
        setAllPost(allPosts);
      } else {
        console.log('No wallet found!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCreatePost = async (cid: string) => {
    try{
      const { ethereum } = window as any;
      if (ethereum) {
        const web3 = new Web3(window.ethereum || window.web3.currentProvider);
        const socialPilotContract = new web3.eth.Contract(ABI as any, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!);
        const createPostTxn = await socialPilotContract.methods.newPost(description, cid).call();
        await createPostTxn.wait();
        toast({
          title: "Post created!",
        });
      } else {
        toast({ title: "No wallet found", });
      }
      getAllPostFromChain();
      
    } catch (error) {
      console.log(error)
    }
  };

  const handleUpload = async () => {
    if(!selectedFile?.fileDetails){
      toast({
        title: "No Image has been added for post",
      })
      return false;
    }
    const cid = await storeFiles(selectedFile.fileDetails);
    await onCreatePost(cid);
  };

  const handleFileChange = (e: any) => {
    const fileInput : any = document.getElementById("file-upload");
    setSelectedFile({imageBlob: URL.createObjectURL(e.target.files[0]) , fileDetails: fileInput.files });
  };

  useEffect(() => {
    getAllPostFromChain();
  }, [])

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
              <Box as="main" p="4">
                {allPost?.map((post, index) => {
                  return (
                    <Card maxW='full' margin={margins} key={post.imageHash} bgColor="white" color="black">
                      <CardHeader>
                        <Flex>
                          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                            <Box>
                              <Heading size='sm'>Segun Adebayo</Heading>
                              <Text>{post.author}</Text>
                            </Box>
                          </Flex>
                        </Flex>
                      </CardHeader>
                      <CardBody>
                        <Text>
                          {post.note}
                        </Text>
                        <Image border="solid 1px" mt={5} w="full" key={index} src={post.image}></Image>
                      </CardBody>


                      {/* <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
    <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
      Like
    </Button>
    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
      Comment
    </Button>
    <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
      Share
    </Button>
  </CardFooter> */}
                    </Card>
                  )
                })}
              </Box>
            </TabPanel>
            <TabPanel>

              <FormControl>
                <Flex
                  justifyContent="space-between"
                >
                  <FormLabel
                    fontSize="4xl"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    New Post
                  </FormLabel>
                  <Box
                    px={{
                      base: 4,
                      sm: 6,
                    }}
                    py={3}
                    textAlign="right"
                  >
                    <Button
                      type="reset"
                      bg="gray.50"
                      colorScheme="brand"
                      fontWeight="md"
                      mr={2}
                      onClick={handleUpload}
                    >
                      Save
                    </Button>
                    {!preview ?
                      <Button
                        type="submit"
                        bg="gray.50"
                        colorScheme="brand"
                        fontWeight="md"
                        onClick={(e) => { setPreview(true) }}
                      >
                        Preview
                      </Button> :
                      <Button
                        type="submit"
                        bg="gray.50"
                        colorScheme="brand"
                        fontWeight="md"
                        onClick={(e) => setPreview(false)}
                      >
                        Cancel
                      </Button>
                    }
                  </Box>
                </Flex>
                {!preview ?
                  <><Textarea
                    placeholder="Brief description for your Post."
                    required
                    mt={1}
                    mb={2}
                    rows={3}
                    borderWidth={2}
                    borderStyle="dashed"
                    shadow="sm"
                    focusBorderColor="brand.900"
                    onChange={(e) => setDescription(e.target.value)}
                    fontSize={{
                      sm: "sm",
                    }} /><Flex
                      mt={1}
                      justify="center"
                      px={6}
                      pt={5}
                      pb={6}
                      borderWidth={2}
                      _dark={{
                        color: "gray.500",
                      }}
                      borderStyle="dashed"
                      rounded="md"
                    >
                      <Stack spacing={1} textAlign="center" >
                        <Icon
                          mx="auto"
                          boxSize={12}
                          color="gray.400"
                          _dark={{
                            color: "gray.500",
                          }}
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                        </Icon>
                        <Flex
                          fontSize="sm"
                          color="gray.600"
                          _dark={{
                            color: "gray.400",
                          }}
                          alignItems="center"
                        >
                          <chakra.label
                            htmlFor="file-upload"
                            cursor="pointer"
                            rounded="md"
                            fontSize="md"
                            color="brand.700"
                            _dark={{
                              color: "brand.200",
                            }}
                            ml={20}
                            pos="relative"
                            _hover={{
                              color: "brand.900",
                              _dark: {
                                color: "brand.300",
                              },
                            }}
                          >
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              required />
                          </chakra.label>
                        </Flex>
                      </Stack>
                    </Flex></> :
                  <Card maxW='full' margin={margins} bgColor="white" color="black">
                    <CardBody>
                      <Text>
                        {description}
                      </Text>
                      <Image border="solid 1px" mt={5} w="full" alt={selectedFile?.imageBlob} src={selectedFile?.imageBlob}></Image>
                    </CardBody>


                    {/* <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
    <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
      Like
    </Button>
    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
      Comment
    </Button>
    <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
      Share
    </Button>
  </CardFooter> */}
                  </Card>
                }
              </FormControl>
            </TabPanel>
          </TabPanels>
        </Box>
      </Box>
    </Tabs>
  )
}

export default Dashboard
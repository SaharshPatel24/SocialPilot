import { Box, Button, Flex, FormControl, FormLabel, Icon, Stack, Textarea, chakra } from "@chakra-ui/react";
import React, { useState } from "react";
import { storeFiles } from "../../helpers/web3storage";
import Web3 from "web3";

const CreatePost = () => {
    const [description, setDescription] = useState<string>();
    const [selectedFile, setSelectedFile] = useState<{ imageBlob: string, fileDetails: Record<never, string> }>();

    // const onCreatePost = async (cid: string) => {
    //     try {
    //       const { ethereum } = window as any;
    //       if (ethereum) {
    //         const web3 = new Web3(window.ethereum || window.web3.currentProvider);
    //         const socialPilotContract = new web3.eth.Contract(ABI as any, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!);
    //         const createPostTxn = await socialPilotContract.methods.newPost(description, cid).call();
    //         await createPostTxn.wait();
    //         toast({
    //           title: "Post created!",
    //         });
    //       } else {
    //         toast({ title: "No wallet found", });
    //       }
    //     } catch (error) {
    //       console.log(error)
    //     }
    // };
    
    const handleUpload = async () => {
        console.log(selectedFile?.fileDetails, selectedFile?.imageBlob);
        // if (!selectedFile?.fileDetails) {
        //   toast({
        //     title: "No Image has been added for post",
        //   })
        //   return false;
        // }
        // const cid = await storeFiles(selectedFile.fileDetails);
        // await onCreatePost(cid);
    };

    const handleFileChange = (e: any) => {
        const fileInput: any = document.getElementById("file-upload");
        setSelectedFile({ imageBlob: URL.createObjectURL(e.target.files[0]), fileDetails: fileInput.files });
      };

    return (
        
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
          </Box>
        </Flex>
        <Textarea
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
        </Flex>
      </FormControl>
    )
}

export default CreatePost;
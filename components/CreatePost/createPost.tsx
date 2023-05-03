import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Icon, Stack, Textarea, chakra, useToast } from "@chakra-ui/react";
import PostCard from "../PostCard/postCard";
import { useAuth } from "../../context/AuthProvider";
import { createPost } from "../../requests/requests"

const CreatePost = () => {
    const [preview, setPreview] = useState<boolean>(false);
    const [description, setDescription] = useState<string>();
    const [selectedFile, setSelectedFile] = useState<{ imageBlob: string, fileDetails: Record<never, string> }>();
    const toast = useToast();
    const { account } = useAuth();
    
    const handleUpload = async () => {
      const msg = await createPost(selectedFile?.fileDetails!, description!);

      if(msg.status){
        toast({
          title: msg.messaga,
          status: 'success',
          duration: 6000,
          isClosable: true,
        })
      } else {
        toast({
          title: msg.messaga,
          status: 'success',
          duration: 6000,
          isClosable: true,
        })
      }
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
          { preview ?
            <><Button
                type="reset"
                bg="gray.50"
                colorScheme="brand"
                fontWeight="md"
                mr={2}
                onClick={()=>setPreview(false)}
              >
                Cancel
              </Button><Button
                type="reset"
                bg="gray.50"
                colorScheme="brand"
                fontWeight="md"
                mr={2}
                onClick={handleUpload}
              >
                  Save
                </Button></>
            :
            <Button
              type="reset"
              bg="gray.50"
              colorScheme="brand"
              fontWeight="md"
              mr={2}
              onClick={()=>setPreview(true)}
            >
              Preview
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
              <Stack spacing={1} textAlign="center">
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
            </Flex></>
      :
      <PostCard image={selectedFile?.imageBlob!} note={description!} author={account}></PostCard>
      }
      </FormControl>
    )
}

export default CreatePost;
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";

const PostCard = (post: { image: string | null; note: string | null; author: string | null }) => {
    const margins = useBreakpointValue({
        base: 4,
        md: 4,
        lg: 4,
        xl: 8,
    });

    return (
        <Card maxW='full' margin={margins} key={post.image} bgColor="white" color="black">
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
                <Image border="solid 1px" mt={5} w="full" src={post.image!}></Image>
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
}

export default PostCard;
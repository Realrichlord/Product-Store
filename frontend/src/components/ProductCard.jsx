import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  Button,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import { useRef, useState } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.700");

  const { deleteProduct } = useProductStore();

  const [isOpen, setIsOpen] = useState(false);

  const cancelRef = useRef();

  const handleDelete = async () => {
    const result = await deleteProduct(product._id);

    if (result.success) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Box
        bg={bg}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{
          transform: "translateY(-5px)",
          shadow: "xl",
        }}
      >
        {/* PRODUCT */}
        <Link to={`/product/${product._id}`}>
          <Box cursor="pointer">
            {/* IMAGE */}
            <Box overflow="hidden">
              <Image
                src={product.image}
                alt={product.name}
                w="full"
                h="220px"
                objectFit="cover"
                transition="transform 0.3s"
                _hover={{
                  transform: "scale(1.05)",
                }}
              />
            </Box>

            {/* PRODUCT INFO */}
            <Box p={4}>
              <Heading
                as="h3"
                size="md"
                mb={2}
                noOfLines={1}
              >
                {product.name}
              </Heading>

              <Text
                color={textColor}
                fontSize="xl"
                fontWeight="bold"
              >
                ${Number(product.price).toFixed(2)}
              </Text>
            </Box>
          </Box>
        </Link>

        {/* ACTIONS */}
        <Box px={4} pb={4}>
          <HStack spacing={2}>
            {/* VIEW */}
            <Link to={`/product/${product._id}`}>
              <Button
                size="sm"
                colorScheme="blue"
              >
                View Details
              </Button>
            </Link>

            {/* EDIT */}
            <Link to={`/edit/${product._id}`}>
              <IconButton
                size="sm"
                icon={<EditIcon />}
                colorScheme="blue"
                aria-label="Edit product"
              />
            </Link>

            {/* DELETE */}
            <IconButton
              size="sm"
              icon={<DeleteIcon />}
              colorScheme="red"
              aria-label="Delete product"
              onClick={() => setIsOpen(true)}
            />
          </HStack>
        </Box>
      </Box>

      {/* DELETE CONFIRMATION */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
            >
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete{" "}
              <strong>{product.name}</strong>?

              <br />

              This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>

              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ProductCard;
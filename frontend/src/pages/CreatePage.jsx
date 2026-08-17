import {
  Heading,
  Container,
  Box,
  VStack,
  Input,
  Button,
  Textarea,
  useColorModeValue,
  Text,
  Image,
} from "@chakra-ui/react";

import { useState } from "react";
import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const { createProduct } = useProductStore();

  const bg = useColorModeValue("white", "gray.700");

  const validateForm = () => {
    const newErrors = {};

    if (!newProduct.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (newProduct.name.trim().length < 2) {
      newErrors.name = "Product name must be at least 2 characters";
    } else if (newProduct.name.trim().length > 100) {
      newErrors.name = "Product name must be less than 100 characters";
    }

    if (!newProduct.price) {
      newErrors.price = "Price is required";
    } else if (Number(newProduct.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!newProduct.image.trim()) {
      newErrors.image = "Image URL is required";
    }

    if (!newProduct.description.trim()) {
      newErrors.description = "Description is required";
    } else if (newProduct.description.trim().length < 10) {
      newErrors.description =
        "Description must be at least 10 characters";
    } else if (newProduct.description.trim().length > 1000) {
      newErrors.description =
        "Description must be less than 1000 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const { success, message } = await createProduct({
      ...newProduct,
      name: newProduct.name.trim(),
      image: newProduct.image.trim(),
      description: newProduct.description.trim(),
    });

    setIsSubmitting(false);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });

      return;
    }

    toast({
      title: "Success",
      description: message,
      status: "success",
      isClosable: true,
    });

    setNewProduct({
      name: "",
      price: "",
      image: "",
      description: "",
    });

    setErrors({});
  };

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={8}>
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          mb={8}
        >
          Create New Product
        </Heading>

        <Box
          w="full"
          bg={bg}
          p={8}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            {/* PRODUCT NAME */}
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  name: e.target.value,
                })
              }
            />

            {errors.name && (
              <Text
                color="red.500"
                fontSize="sm"
                alignSelf="flex-start"
              >
                {errors.name}
              </Text>
            )}

            {/* PRICE */}
            <Input
              placeholder="Price"
              type="number"
              min="0"
              step="0.01"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: e.target.value,
                })
              }
            />

            {errors.price && (
              <Text
                color="red.500"
                fontSize="sm"
                alignSelf="flex-start"
              >
                {errors.price}
              </Text>
            )}

            {/* IMAGE URL */}
            <Input
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  image: e.target.value,
                })
              }
            />

            {errors.image && (
              <Text
                color="red.500"
                fontSize="sm"
                alignSelf="flex-start"
              >
                {errors.image}
              </Text>
            )}

            {/* IMAGE PREVIEW */}
            {newProduct.image.trim() && (
              <Box w="full">
                <Text
                  fontSize="sm"
                  mb={2}
                  fontWeight="medium"
                >
                  Image Preview
                </Text>

                <Image
                  src={newProduct.image.trim()}
                  alt="Product preview"
                  w="full"
                  h="200px"
                  objectFit="cover"
                  rounded="md"
                />
              </Box>
            )}

            {/* DESCRIPTION */}
            <Textarea
              placeholder="Description"
              value={newProduct.description}
              rows={5}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: e.target.value,
                })
              }
            />

            {errors.description && (
              <Text
                color="red.500"
                fontSize="sm"
                alignSelf="flex-start"
              >
                {errors.description}
              </Text>
            )}

            {/* BUTTON */}
            <Button
              colorScheme="blue"
              w="full"
              onClick={handleAddProduct}
              isLoading={isSubmitting}
              loadingText="Creating..."
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
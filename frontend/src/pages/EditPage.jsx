import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  Button,
  Textarea,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, updateProduct } = useProductStore();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const existingProduct = products.find(
      (product) => product._id === id
    );

    if (existingProduct) {
      setProduct({
        name: existingProduct.name,
        price: existingProduct.price,
        image: existingProduct.image,
        description: existingProduct.description,
      });
    }
  }, [id, products]);

  // VALIDATE FORM
  const validateForm = () => {
    const newErrors = {};

    if (!product.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!product.price) {
      newErrors.price = "Price is required";
    } else if (Number(product.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!product.image.trim()) {
      newErrors.image = "Image URL is required";
    }

    if (!product.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const { success, message } = await updateProduct(id, product);

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

    navigate("/");
  };

  return (
    <Container maxW="container.sm" py={12}>
      <VStack spacing={8}>

        <Heading
          size="2xl"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          Edit Product
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue("white", "gray.700")}
          p={8}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>

            {/* NAME */}
            <Input
              placeholder="Product Name"
              value={product.name}
              onChange={(e) =>
                setProduct({
                  ...product,
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
              value={product.price}
              onChange={(e) =>
                setProduct({
                  ...product,
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

            {/* IMAGE */}
            <Input
              placeholder="Image URL"
              value={product.image}
              onChange={(e) =>
                setProduct({
                  ...product,
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

            {/* DESCRIPTION */}
            <Textarea
              placeholder="Description"
              value={product.description}
              onChange={(e) =>
                setProduct({
                  ...product,
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

            {/* UPDATE BUTTON */}
            <Button
              colorScheme="blue"
              w="full"
              onClick={handleUpdate}
              isLoading={isSubmitting}
              loadingText="Updating..."
            >
              Update Product
            </Button>

          </VStack>
        </Box>

      </VStack>
    </Container>
  );
};

export default EditPage;
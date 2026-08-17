import {
  Container,
  VStack,
  Box,
  Image,
  Heading,
  Text,
  Button,
  HStack,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useProductStore } from "../store/product";

const ProductPage = () => {
  const { id } = useParams();

  const { fetchProduct, loading } = useProductStore();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const bg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue(
    "gray.600",
    "gray.200"
  );

  useEffect(() => {
    const loadProduct = async () => {
      const result = await fetchProduct(id);

      if (result.success) {
        setProduct(result.product);
      } else {
        setError(result.message);
      }
    };

    loadProduct();
  }, [id, fetchProduct]);

  // LOADING
  if (loading) {
    return (
      <Container maxW="container.sm" py={12}>
        <VStack spacing={6}>
          <Spinner size="xl" color="blue.500" />

          <Text>
            Loading product...
          </Text>
        </VStack>
      </Container>
    );
  }

  // ERROR
  if (error || !product) {
    return (
      <Container maxW="container.sm" py={12}>
        <VStack spacing={6}>
          <Heading>
            Product Not Found
          </Heading>

          <Text
            color="gray.500"
            textAlign="center"
          >
            {error ||
              "This product does not exist or has been deleted."}
          </Text>

          <Link to="/">
            <Button colorScheme="blue">
              Back to Products
            </Button>
          </Link>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={12}>
      <Box
        bg={bg}
        rounded="lg"
        shadow="lg"
        overflow="hidden"
      >
        {/* PRODUCT IMAGE */}
        <Image
          src={product.image}
          alt={product.name}
          w="full"
          h="400px"
          objectFit="cover"
        />

        <VStack
          align="stretch"
          spacing={4}
          p={8}
        >
          {/* NAME */}
          <Heading>
            {product.name}
          </Heading>

          {/* PRICE */}
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="blue.500"
          >
            ${product.price}
          </Text>

          {/* DESCRIPTION */}
          <Text
            fontSize="lg"
            color={textColor}
          >
            {product.description}
          </Text>

          {/* BUTTONS */}
          <HStack
            spacing={4}
            pt={4}
            flexWrap="wrap"
          >
            <Link to={`/edit/${product._id}`}>
              <Button colorScheme="blue">
                Edit Product
              </Button>
            </Link>

            <Link to="/">
              <Button variant="outline">
                Back to Products
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default ProductPage;
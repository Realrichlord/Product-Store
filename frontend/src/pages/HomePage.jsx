import {
  Container,
  VStack,
  Text,
  SimpleGrid,
  Skeleton,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";

import { SearchIcon, CloseIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const {
    fetchProducts,
    products,
    loading,
    error,
  } = useProductStore();

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // FILTER PRODUCTS
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>

        {/* TITLE */}
        <Text
          fontSize="30px"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Current Products
        </Text>

        {/* SEARCH */}
        {!loading && !error && products.length > 0 && (
          <InputGroup maxW="500px">

            {/* SEARCH ICON */}
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>

            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              pl="40px"
              pr="40px"
            />

            {/* CLEAR BUTTON */}
            {search && (
              <InputRightElement>
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label="Clear search"
                  icon={<CloseIcon />}
                  onClick={() => setSearch("")}
                />
              </InputRightElement>
            )}

          </InputGroup>
        )}

        {/* LOADING */}
        {loading && (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w="full"
          >
            {[1, 2, 3].map((item) => (
              <Skeleton
                key={item}
                height="300px"
                rounded="lg"
              />
            ))}
          </SimpleGrid>
        )}

        {/* ERROR */}
        {!loading && error && (
          <VStack spacing={4}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="red.500"
              textAlign="center"
            >
              {error}
            </Text>

            <Button
              colorScheme="blue"
              onClick={fetchProducts}
            >
              Try Again
            </Button>
          </VStack>
        )}

        {/* PRODUCTS */}
        {!loading && !error && filteredProducts.length > 0 && (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w="full"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </SimpleGrid>
        )}

        {/* SEARCH HAS NO MATCHES */}
        {!loading &&
          !error &&
          products.length > 0 &&
          filteredProducts.length === 0 && (
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.500"
              textAlign="center"
            >
              No products match "{search}"
            </Text>
          )}

        {/* DATABASE HAS NO PRODUCTS */}
        {!loading &&
          !error &&
          products.length === 0 && (
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.500"
              textAlign="center"
            >
              No products found here{" "}

              <Link to="/create">
                <Text
                  as="span"
                  color="blue.500"
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  Create Product
                </Text>
              </Link>
            </Text>
          )}

      </VStack>
    </Container>
  );
};

export default HomePage;
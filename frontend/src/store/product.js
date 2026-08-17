import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),

  // CREATE PRODUCT
  createProduct: async (newProduct) => {
    const payload = {
      name: newProduct.name?.trim(),
      price: Number(newProduct.price),
      image: newProduct.image?.trim(),
      description: newProduct.description?.trim(),
    };

    if (
      !payload.name ||
      Number.isNaN(payload.price) ||
      !payload.image ||
      !payload.description
    ) {
      return {
        success: false,
        message: "Please fill in all fields with valid values.",
      };
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to create product.",
        };
      }

      set((state) => ({
        products: [...state.products, data.data],
      }));

      return {
        success: true,
        message: data.message || "Product created successfully.",
      };
    } catch {
      return {
        success: false,
        message: "Something went wrong while creating the product.",
      };
    }
  },

  // FETCH ALL PRODUCTS
  fetchProducts: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();

      set({
        products: data.data || [],
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching products:", error);

      set({
        products: [],
        loading: false,
        error: "Failed to load products. Please try again.",
      });
    }
  },

  // FETCH SINGLE PRODUCT
  fetchProduct: async (productId) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await fetch(
        `/api/products/${productId}`
      );

      const data = await response.json();

      if (!response.ok) {
        set({
          loading: false,
          error: data.message || "Product not found.",
        });

        return {
          success: false,
          message: data.message || "Product not found.",
        };
      }

      set({
        loading: false,
        error: null,
      });

      return {
        success: true,
        product: data.data,
      };
    } catch (error) {
      console.error("Error fetching product:", error);

      set({
        loading: false,
        error: "Something went wrong while fetching the product.",
      });

      return {
        success: false,
        message: "Something went wrong while fetching the product.",
      };
    }
  },

  // DELETE PRODUCT
  deleteProduct: async (productId) => {
    try {
      const response = await fetch(
        `/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message:
            data.message || "Failed to delete product.",
        };
      }

      set((state) => ({
        products: state.products.filter(
          (product) => product._id !== productId
        ),
      }));

      return {
        success: true,
        message: "Product deleted successfully.",
      };
    } catch (error) {
      console.error("Error deleting product:", error);

      return {
        success: false,
        message:
          "Something went wrong while deleting the product.",
      };
    }
  },

  // UPDATE PRODUCT
  updateProduct: async (productId, updatedProduct) => {
    try {
      const response = await fetch(
        `/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message:
            data.message || "Failed to update product.",
        };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId
            ? data.data
            : product
        ),
      }));

      return {
        success: true,
        message: "Product updated successfully.",
      };
    } catch (error) {
      console.error("Error updating product:", error);

      return {
        success: false,
        message:
          "Something went wrong while updating the product.",
      };
    }
  },
}));
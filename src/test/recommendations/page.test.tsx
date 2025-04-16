import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RestaurantList from "./page";
import { getRestaurants } from "@/lib/firebase";

// Mock the getRestaurants function
jest.mock("@/lib/firebase");

const mockedGetRestaurants = getRestaurants as jest.MockedFunction<
  typeof getRestaurants
>;

describe("RestaurantList", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockedGetRestaurants.mockClear();
  });
  it("renders loading state initially", () => {
    mockedGetRestaurants.mockResolvedValue([]);
    render(<RestaurantList />);
    expect(screen.getByText("Loading restaurants...")).toBeInTheDocument();
  });

  it("renders restaurants after loading", async () => {
    const mockRestaurants = [
      { id: "1", name: "Restaurant 1" },
      { id: "2", name: "Restaurant 2" },
    ];
    mockedGetRestaurants.mockResolvedValue(mockRestaurants);

    render(<RestaurantList />);

    // Wait for the restaurants to be loaded and rendered
    await waitFor(() => {
      mockRestaurants.forEach((restaurant) => {
        expect(screen.getByText(restaurant.name)).toBeInTheDocument();
      });
    });
  });

  it("renders error message when fetching restaurants fails", async () => {
    mockedGetRestaurants.mockRejectedValue(new Error("Failed to fetch"));

    render(<RestaurantList />);

    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to load restaurants."),
      ).toBeInTheDocument();
    });
  });
});

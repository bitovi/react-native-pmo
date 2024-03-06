import { render, screen } from "@testing-library/react-native";
import { Restaurant } from "../../services/restaurant/interfaces";
import RestaurantHeader from "./RestaurantHeader";

describe("RestaurantHeader component", () => {
  const restaurantWithoutAddress: Restaurant = {
    _id: "3ZOZyTY1LH26LnVw",
    images: {
      banner: "banner-image.jpg",
      owner: "owner-image.jpg",
      thumbnail: "thumbnail-image.jpg",
    },
    menu: {
      lunch: [
        {
          name: "Crab Pancakes with Sorrel Syrup",
          price: 35.99,
        },
        {
          name: "Steamed Mussels",
          price: 21.99,
        },
        {
          name: "Spinach Fennel Watercress Ravioli",
          price: 35.99,
        },
      ],
      dinner: [
        {
          name: "Gunthorp Chicken",
          price: 21.99,
        },
        {
          name: "Herring in Lavender Dill Reduction",
          price: 45.99,
        },
        {
          name: "Chicken with Tomato Carrot Chutney Sauce",
          price: 45.99,
        },
      ],
    },
    name: "Test Restaurant",
    slug: "poutine-palace",
  };
  const restaurantWithAddress = {
    ...restaurantWithoutAddress,
    address: {
      street: "123 Test St",
      city: "Testville",
      state: "TS",
      zip: "12345",
    },
  };

  it("renders the restaurant name", () => {
    render(<RestaurantHeader restaurant={restaurantWithAddress} />);
    expect(screen.getByText(/Test Restaurant/)).toBeOnTheScreen();
  });

  it("renders the restaurant address when provided", () => {
    render(<RestaurantHeader restaurant={restaurantWithAddress} />);

    expect(
      screen.getByText(/123 Test St/i, { exact: false })
    ).toBeOnTheScreen();
    expect(
      screen.getByText(restaurantWithAddress.address.street, { exact: false })
    ).toBeOnTheScreen();
    expect(
      screen.getByText(
        `${restaurantWithAddress.address.city}, ${restaurantWithAddress.address.state} ${restaurantWithAddress.address.zip}`,
        { exact: false }
      )
    ).toBeOnTheScreen();
  });

  it("does not render an address when not provided", () => {
    render(<RestaurantHeader restaurant={restaurantWithoutAddress} />);
    expect(
      screen.queryByText(restaurantWithAddress.address.street)
    ).not.toBeOnTheScreen();
  });

  it("renders static details like price and hours", () => {
    render(<RestaurantHeader restaurant={restaurantWithAddress} />);

    expect(screen.getByText(/\$\$\$/i)).toBeOnTheScreen();
    expect(screen.getByText("$$$", { exact: false })).toBeOnTheScreen();
    expect(
      screen.getByText("Hours: M-F 10am-11pm", { exact: false })
    ).toBeOnTheScreen();
  });

  it('renders the "Open Now" text', () => {
    render(<RestaurantHeader restaurant={restaurantWithAddress} />);
    expect(screen.getByText("Open Now")).toBeOnTheScreen();
  });
});

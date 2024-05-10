import { render } from "@/utils/testing";
import CardItemList from "./CardItemList";
import { Product } from "@/types/meli.types";
import "@testing-library/jest-dom";

describe("CardItemList", () => {
  const product: Product = {
    _id: "",
    title: "Product name",
    thumbnail: "",
    thumbnail_id: "",
    pictures: [],
    price: 100,
  };

  it("should render correctly", () => {
    const result = render(<CardItemList item={product} />);

    expect(result).toMatchSnapshot();
  });

  it("should show correct title", () => {
    const { getByText } = render(<CardItemList item={product} />);

    expect(getByText(/Product name/)).toBeInTheDocument();
  });
});

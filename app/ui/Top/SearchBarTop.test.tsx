import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBarTop from "./SearchBarTop";

jest.mock('next/router', () => ({ useRouter: jest.fn() }))

const user = userEvent.setup();

const setup = () => {
  const mockRouter = {
    push: jest.fn()
  }
  
  const { getByRole } = render(<SearchBarTop />);
  const searchWord = getByRole("textbox", { name: "検索バー" });

  const typeSearchWord = (text: string) => user.type(searchWord, text);

  return { typeSearchWord }
};

test("ユーザーは検索バーに'abc'とタイプすると、検索バーに'abc'と表示される", async () => {

  const { typeSearchWord } = setup();
  expect(screen.getByPlaceholderText("Input Paper title or Keyword")).toBeInTheDocument();
  await typeSearchWord("abc");
  expect(screen.getByText("abc")).toBeInTheDocument();
});
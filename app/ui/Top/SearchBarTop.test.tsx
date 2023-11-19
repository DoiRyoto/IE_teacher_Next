import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBarTop from "./SearchBarTop";
import { AppRouterContextProviderMock } from "@/tests/jest";

const user = userEvent.setup();

const setup = () => {
  const push = jest.fn()
  const { getByRole } = render(<AppRouterContextProviderMock router={ {push} }><SearchBarTop /></AppRouterContextProviderMock>);
  const searchWord = getByRole("textbox", { name: "検索バー" });

  const typeSearchWord = (text: string) => user.type(searchWord, text);
  const typeEnterOnSearchBar = () => user.type(searchWord, "{enter}");

  const searchButton = getByRole("button", { name: "検索ボタン" });
  const clickSearchButton = () => user.click(searchButton)

  return { typeSearchWord, typeEnterOnSearchBar, clickSearchButton }
};

test("検索バーに'abc'とタイプすると、検索バーに'abc'と表示される", async () => {
  const { typeSearchWord } = setup();
  expect(screen.getByPlaceholderText("Input Paper title or Keyword")).toBeInTheDocument();
  await typeSearchWord("abc");
  expect(screen.getByDisplayValue("abc")).toBeInTheDocument();
});

describe("バリデーション", () => {
  test("検索バーに何も入力せず検索ボタンを押すと、'Please enter at least one character'が表示される", async () => {
    const { clickSearchButton } = setup();
    expect(screen.getByPlaceholderText("Input Paper title or Keyword")).toBeInTheDocument();
    await clickSearchButton();
    expect(screen.getByText("Please enter at least one character.")).toBeInTheDocument();
  });
  test("検索バーに何も入力せず検索バーで'enterキー'を押すと、'Please enter at least one character'が表示される", async () => {
    const { typeEnterOnSearchBar } = setup();
    expect(screen.getByPlaceholderText("Input Paper title or Keyword")).toBeInTheDocument();
    await typeEnterOnSearchBar();
    expect(screen.getByText("Please enter at least one character.")).toBeInTheDocument();
  });
  test("検索バーに1文字以上入力して検索ボタンを押すと、'Please enter at least one character'が表示されない", async () => {
    const {typeSearchWord, clickSearchButton } = setup();
    expect(screen.getByPlaceholderText("Input Paper title or Keyword")).toBeInTheDocument();
    await typeSearchWord("a")
    await clickSearchButton();
    expect(screen.queryByText("Please enter at least one character.")).toBeNull();
  });
  test("検索バーに1文字以上入力して'enterキー'を押すと、'Please enter at least one character'が表示されない", async () => {
    const {typeSearchWord, typeEnterOnSearchBar } = setup();
    expect(screen.getByPlaceholderText("Input Paper title or Keyword")).toBeInTheDocument();
    await typeSearchWord("a")
    await typeEnterOnSearchBar();
    expect(screen.queryByText("Please enter at least one character.")).toBeNull();
  });
})
import { expect, test } from "@playwright/test";
import { url } from "./util";

test("ロゴをクリックすると、Topページに遷移する", async ({ page }) => {
  await page.goto(url('/'));

  await page.getByRole("link").click();
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(url("/"));
});

test("入力フォームに'test'と入力し、検索ボタンを押すと'/search?q=test'に遷移する'", async ({ page }) => {
  await page.goto(url('/'));

  await page.getByRole("textbox", { name: "検索バー" }).fill("test");
  await page.getByRole("button", {name: "検索ボタン"}).click();
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(url("/search?q=test"));
});
test("入力フォームに'test'と入力し、'enterキー'を押すと'/search?q=test'に遷移する'", async ({ page }) => {
  await page.goto(url('/'));

  await page.getByRole("textbox", { name: "検索バー" }).fill("test");
  await page.getByRole("textbox", { name: "検索バー" }).press("Enter");
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(url("/search?q=test"));
});
test("入力フォームに何も入力せず検索ボタンを押すと、ページ遷移しない", async ({ page }) => {
  await page.goto(url('/'));

  await page.getByRole("button", {name: "検索ボタン"}).click();
  await expect(page).toHaveURL(url("/"));
});
test("入力フォームに何も入力せず'enterキー'を押すと、ページ遷移しない", async ({ page }) => {
  await page.goto(url('/'));
  
  await page.getByRole("textbox", { name: "検索バー" }).press("Enter");
  await expect(page).toHaveURL(url("/"));
});
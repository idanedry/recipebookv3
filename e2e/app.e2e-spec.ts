import { RecipeBookv3Page } from './app.po';

describe('recipe-bookv3 App', () => {
  let page: RecipeBookv3Page;

  beforeEach(() => {
    page = new RecipeBookv3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('rb works!');
  });
});

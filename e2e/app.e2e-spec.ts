import { TrelloPage } from './app.po';

describe('trello App', () => {
  let page: TrelloPage;

  beforeEach(() => {
    page = new TrelloPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

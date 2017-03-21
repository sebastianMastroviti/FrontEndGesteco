import { GestecoDirectotyPage } from './app.po';

describe('gesteco-directoty App', function() {
  let page: GestecoDirectotyPage;

  beforeEach(() => {
    page = new GestecoDirectotyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { LetdoPage } from './app.po';

describe('letdo App', () => {
  let page: LetdoPage;

  beforeEach(() => {
    page = new LetdoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

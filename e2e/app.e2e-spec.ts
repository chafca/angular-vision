import { AngularVisionPage } from './app.po';

describe('angular-vision App', () => {
  let page: AngularVisionPage;

  beforeEach(() => {
    page = new AngularVisionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

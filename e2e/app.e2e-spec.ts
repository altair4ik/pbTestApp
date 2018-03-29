import { AppPage } from './app.po';

describe('privat App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('all members. /');
  });

  it('should display about button add', () => {
    page.navigateTo();
    expect(page.getAboutAddNewButton().getText()).toEqual('+ add new');
  });

  it('should display add modal window', () => {
    page.navigateTo();
    page.getAboutAddNewButton().click();
    expect(page.getModalTitleAddNew().getText()).toEqual('Add new Photo.');
  });
});

import {browser, by, element, ExpectedConditions} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h3')).getText();
  }

  getAboutAddNewButton() {
    return element(by.css('[data-target="#photoModalAdd"]'));
  }

  getModalTitleAddNew() {
    const modal = element(by.id('photoModalAdd'));
    browser.wait(ExpectedConditions.visibilityOf(modal), 5000);
    return element(by.className('modal-title'));
  }
}

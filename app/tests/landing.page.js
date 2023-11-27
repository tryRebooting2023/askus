import { Selector } from 'testcafe';

class LandingPage {
  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then makes a query */
  async searchRequest(testController, query, liCount) {
    await this.isDisplayed(testController);
    // Make query
    await testController.typeText('#search-bar', query);
    // Submit query
    await testController.click('#query-submit');
    // Checks that response is generated by checking for sources
    await testController.expect(liCount).gte(1);
  }
}

export const landingPage = new LandingPage();

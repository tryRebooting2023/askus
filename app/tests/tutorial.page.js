import { Selector } from 'testcafe';

class TutorialPage {
  constructor() {
    this.pageId = '#tutorial-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

}

export const tutorialPage = new TutorialPage();

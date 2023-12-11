import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SigninPage {
  constructor() {
    this.pageId = '#signin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async signin(testController, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#signin-form-email', username);
    await testController.typeText('#signin-form-password', password);
    await testController.click('#signin-form-submit input.btn.btn-primary');
    await navBar.isLoggedIn(testController, username);
  }

  /** Clicks Google signin button and fills out information, then checks to see that login was successful. */
  /*
  async googleSignin(testController, gmail, password) {
    await this.isDisplayed(testController);
    await testController.click('#google-signin-submit');
    await testController.typeText('#identifierId', gmail);
    await testController.click('#identifierNext');
    await testController.typeText('input[type=password]', password);
    await testController.click('#passwordNext');
    await testController.expect(Selector('.login-section').textContent).contains('James');
    await navBar.isLoggedIn(testController, 'James');
  }
  */
}

export const signinPage = new SigninPage();

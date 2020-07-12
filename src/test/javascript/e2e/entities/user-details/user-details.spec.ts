import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  UserDetailsComponentsPage,
  /* UserDetailsDeleteDialog, */
  UserDetailsUpdatePage,
} from './user-details.page-object';

const expect = chai.expect;

describe('UserDetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userDetailsComponentsPage: UserDetailsComponentsPage;
  let userDetailsUpdatePage: UserDetailsUpdatePage;
  /* let userDetailsDeleteDialog: UserDetailsDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserDetails', async () => {
    await navBarPage.goToEntity('user-details');
    userDetailsComponentsPage = new UserDetailsComponentsPage();
    await browser.wait(ec.visibilityOf(userDetailsComponentsPage.title), 5000);
    expect(await userDetailsComponentsPage.getTitle()).to.eq('User Details');
    await browser.wait(
      ec.or(ec.visibilityOf(userDetailsComponentsPage.entities), ec.visibilityOf(userDetailsComponentsPage.noResult)),
      1000
    );
  });

  it('should load create UserDetails page', async () => {
    await userDetailsComponentsPage.clickOnCreateButton();
    userDetailsUpdatePage = new UserDetailsUpdatePage();
    expect(await userDetailsUpdatePage.getPageTitle()).to.eq('Create or edit a User Details');
    await userDetailsUpdatePage.cancel();
  });

  /* it('should create and save UserDetails', async () => {
        const nbButtonsBeforeCreate = await userDetailsComponentsPage.countDeleteButtons();

        await userDetailsComponentsPage.clickOnCreateButton();

        await promise.all([
            userDetailsUpdatePage.setPhoneNumberInput('phoneNumber'),
            userDetailsUpdatePage.setAddressInput('address'),
            userDetailsUpdatePage.userSelectLastOption(),
        ]);

        expect(await userDetailsUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');
        expect(await userDetailsUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');

        await userDetailsUpdatePage.save();
        expect(await userDetailsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await userDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last UserDetails', async () => {
        const nbButtonsBeforeDelete = await userDetailsComponentsPage.countDeleteButtons();
        await userDetailsComponentsPage.clickOnLastDeleteButton();

        userDetailsDeleteDialog = new UserDetailsDeleteDialog();
        expect(await userDetailsDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this User Details?');
        await userDetailsDeleteDialog.clickOnConfirmButton();

        expect(await userDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

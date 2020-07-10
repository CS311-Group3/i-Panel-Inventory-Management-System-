import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReturnItemsComponentsPage, ReturnItemsDeleteDialog, ReturnItemsUpdatePage } from './return-items.page-object';

const expect = chai.expect;

describe('ReturnItems e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let returnItemsComponentsPage: ReturnItemsComponentsPage;
  let returnItemsUpdatePage: ReturnItemsUpdatePage;
  let returnItemsDeleteDialog: ReturnItemsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ReturnItems', async () => {
    await navBarPage.goToEntity('return-items');
    returnItemsComponentsPage = new ReturnItemsComponentsPage();
    await browser.wait(ec.visibilityOf(returnItemsComponentsPage.title), 5000);
    expect(await returnItemsComponentsPage.getTitle()).to.eq('Return Items');
    await browser.wait(
      ec.or(ec.visibilityOf(returnItemsComponentsPage.entities), ec.visibilityOf(returnItemsComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ReturnItems page', async () => {
    await returnItemsComponentsPage.clickOnCreateButton();
    returnItemsUpdatePage = new ReturnItemsUpdatePage();
    expect(await returnItemsUpdatePage.getPageTitle()).to.eq('Create or edit a Return Items');
    await returnItemsUpdatePage.cancel();
  });

  it('should create and save ReturnItems', async () => {
    const nbButtonsBeforeCreate = await returnItemsComponentsPage.countDeleteButtons();

    await returnItemsComponentsPage.clickOnCreateButton();

    await promise.all([
      returnItemsUpdatePage.setQuantityInput('5'),
      returnItemsUpdatePage.itemCodeSelectLastOption(),
      returnItemsUpdatePage.returnCodeSelectLastOption(),
    ]);

    expect(await returnItemsUpdatePage.getQuantityInput()).to.eq('5', 'Expected quantity value to be equals to 5');

    await returnItemsUpdatePage.save();
    expect(await returnItemsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await returnItemsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ReturnItems', async () => {
    const nbButtonsBeforeDelete = await returnItemsComponentsPage.countDeleteButtons();
    await returnItemsComponentsPage.clickOnLastDeleteButton();

    returnItemsDeleteDialog = new ReturnItemsDeleteDialog();
    expect(await returnItemsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Return Items?');
    await returnItemsDeleteDialog.clickOnConfirmButton();

    expect(await returnItemsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

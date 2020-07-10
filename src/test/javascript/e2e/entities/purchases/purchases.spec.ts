import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PurchasesComponentsPage, PurchasesDeleteDialog, PurchasesUpdatePage } from './purchases.page-object';

const expect = chai.expect;

describe('Purchases e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let purchasesComponentsPage: PurchasesComponentsPage;
  let purchasesUpdatePage: PurchasesUpdatePage;
  let purchasesDeleteDialog: PurchasesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Purchases', async () => {
    await navBarPage.goToEntity('purchases');
    purchasesComponentsPage = new PurchasesComponentsPage();
    await browser.wait(ec.visibilityOf(purchasesComponentsPage.title), 5000);
    expect(await purchasesComponentsPage.getTitle()).to.eq('Purchases');
    await browser.wait(ec.or(ec.visibilityOf(purchasesComponentsPage.entities), ec.visibilityOf(purchasesComponentsPage.noResult)), 1000);
  });

  it('should load create Purchases page', async () => {
    await purchasesComponentsPage.clickOnCreateButton();
    purchasesUpdatePage = new PurchasesUpdatePage();
    expect(await purchasesUpdatePage.getPageTitle()).to.eq('Create or edit a Purchases');
    await purchasesUpdatePage.cancel();
  });

  it('should create and save Purchases', async () => {
    const nbButtonsBeforeCreate = await purchasesComponentsPage.countDeleteButtons();

    await purchasesComponentsPage.clickOnCreateButton();

    await promise.all([
      purchasesUpdatePage.setTotalInput('5'),
      purchasesUpdatePage.setDiscountsInput('5'),
      purchasesUpdatePage.setDateOfPurchaseInput('2000-12-31'),
      purchasesUpdatePage.vendorIDSelectLastOption(),
    ]);

    expect(await purchasesUpdatePage.getTotalInput()).to.eq('5', 'Expected total value to be equals to 5');
    expect(await purchasesUpdatePage.getDiscountsInput()).to.eq('5', 'Expected discounts value to be equals to 5');
    expect(await purchasesUpdatePage.getDateOfPurchaseInput()).to.eq(
      '2000-12-31',
      'Expected dateOfPurchase value to be equals to 2000-12-31'
    );

    await purchasesUpdatePage.save();
    expect(await purchasesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await purchasesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Purchases', async () => {
    const nbButtonsBeforeDelete = await purchasesComponentsPage.countDeleteButtons();
    await purchasesComponentsPage.clickOnLastDeleteButton();

    purchasesDeleteDialog = new PurchasesDeleteDialog();
    expect(await purchasesDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Purchases?');
    await purchasesDeleteDialog.clickOnConfirmButton();

    expect(await purchasesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

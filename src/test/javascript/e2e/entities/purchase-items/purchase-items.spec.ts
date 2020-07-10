import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PurchaseItemsComponentsPage, PurchaseItemsDeleteDialog, PurchaseItemsUpdatePage } from './purchase-items.page-object';

const expect = chai.expect;

describe('PurchaseItems e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let purchaseItemsComponentsPage: PurchaseItemsComponentsPage;
  let purchaseItemsUpdatePage: PurchaseItemsUpdatePage;
  let purchaseItemsDeleteDialog: PurchaseItemsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PurchaseItems', async () => {
    await navBarPage.goToEntity('purchase-items');
    purchaseItemsComponentsPage = new PurchaseItemsComponentsPage();
    await browser.wait(ec.visibilityOf(purchaseItemsComponentsPage.title), 5000);
    expect(await purchaseItemsComponentsPage.getTitle()).to.eq('Purchase Items');
    await browser.wait(
      ec.or(ec.visibilityOf(purchaseItemsComponentsPage.entities), ec.visibilityOf(purchaseItemsComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PurchaseItems page', async () => {
    await purchaseItemsComponentsPage.clickOnCreateButton();
    purchaseItemsUpdatePage = new PurchaseItemsUpdatePage();
    expect(await purchaseItemsUpdatePage.getPageTitle()).to.eq('Create or edit a Purchase Items');
    await purchaseItemsUpdatePage.cancel();
  });

  it('should create and save PurchaseItems', async () => {
    const nbButtonsBeforeCreate = await purchaseItemsComponentsPage.countDeleteButtons();

    await purchaseItemsComponentsPage.clickOnCreateButton();

    await promise.all([
      purchaseItemsUpdatePage.setUnitPriceInput('5'),
      purchaseItemsUpdatePage.setQuantityInput('5'),
      purchaseItemsUpdatePage.setTotalInput('5'),
      purchaseItemsUpdatePage.itemCodeSelectLastOption(),
      purchaseItemsUpdatePage.purchaseCodeSelectLastOption(),
    ]);

    expect(await purchaseItemsUpdatePage.getUnitPriceInput()).to.eq('5', 'Expected unitPrice value to be equals to 5');
    expect(await purchaseItemsUpdatePage.getQuantityInput()).to.eq('5', 'Expected quantity value to be equals to 5');
    expect(await purchaseItemsUpdatePage.getTotalInput()).to.eq('5', 'Expected total value to be equals to 5');

    await purchaseItemsUpdatePage.save();
    expect(await purchaseItemsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await purchaseItemsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PurchaseItems', async () => {
    const nbButtonsBeforeDelete = await purchaseItemsComponentsPage.countDeleteButtons();
    await purchaseItemsComponentsPage.clickOnLastDeleteButton();

    purchaseItemsDeleteDialog = new PurchaseItemsDeleteDialog();
    expect(await purchaseItemsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Purchase Items?');
    await purchaseItemsDeleteDialog.clickOnConfirmButton();

    expect(await purchaseItemsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

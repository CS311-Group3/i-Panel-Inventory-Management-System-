import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SalesItemsComponentsPage, SalesItemsDeleteDialog, SalesItemsUpdatePage } from './sales-items.page-object';

const expect = chai.expect;

describe('SalesItems e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let salesItemsComponentsPage: SalesItemsComponentsPage;
  let salesItemsUpdatePage: SalesItemsUpdatePage;
  let salesItemsDeleteDialog: SalesItemsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SalesItems', async () => {
    await navBarPage.goToEntity('sales-items');
    salesItemsComponentsPage = new SalesItemsComponentsPage();
    await browser.wait(ec.visibilityOf(salesItemsComponentsPage.title), 5000);
    expect(await salesItemsComponentsPage.getTitle()).to.eq('Sales Items');
    await browser.wait(ec.or(ec.visibilityOf(salesItemsComponentsPage.entities), ec.visibilityOf(salesItemsComponentsPage.noResult)), 1000);
  });

  it('should load create SalesItems page', async () => {
    await salesItemsComponentsPage.clickOnCreateButton();
    salesItemsUpdatePage = new SalesItemsUpdatePage();
    expect(await salesItemsUpdatePage.getPageTitle()).to.eq('Create or edit a Sales Items');
    await salesItemsUpdatePage.cancel();
  });

  it('should create and save SalesItems', async () => {
    const nbButtonsBeforeCreate = await salesItemsComponentsPage.countDeleteButtons();

    await salesItemsComponentsPage.clickOnCreateButton();

    await promise.all([
      salesItemsUpdatePage.setUnitPriceInput('5'),
      salesItemsUpdatePage.setQuantityInput('5'),
      salesItemsUpdatePage.setTotalInput('5'),
      salesItemsUpdatePage.itemCodeSelectLastOption(),
      salesItemsUpdatePage.salesCodeSelectLastOption(),
    ]);

    expect(await salesItemsUpdatePage.getUnitPriceInput()).to.eq('5', 'Expected unitPrice value to be equals to 5');
    expect(await salesItemsUpdatePage.getQuantityInput()).to.eq('5', 'Expected quantity value to be equals to 5');
    expect(await salesItemsUpdatePage.getTotalInput()).to.eq('5', 'Expected total value to be equals to 5');

    await salesItemsUpdatePage.save();
    expect(await salesItemsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await salesItemsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SalesItems', async () => {
    const nbButtonsBeforeDelete = await salesItemsComponentsPage.countDeleteButtons();
    await salesItemsComponentsPage.clickOnLastDeleteButton();

    salesItemsDeleteDialog = new SalesItemsDeleteDialog();
    expect(await salesItemsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Sales Items?');
    await salesItemsDeleteDialog.clickOnConfirmButton();

    expect(await salesItemsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SalesComponentsPage, SalesDeleteDialog, SalesUpdatePage } from './sales.page-object';

const expect = chai.expect;

describe('Sales e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let salesComponentsPage: SalesComponentsPage;
  let salesUpdatePage: SalesUpdatePage;
  let salesDeleteDialog: SalesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Sales', async () => {
    await navBarPage.goToEntity('sales');
    salesComponentsPage = new SalesComponentsPage();
    await browser.wait(ec.visibilityOf(salesComponentsPage.title), 5000);
    expect(await salesComponentsPage.getTitle()).to.eq('Sales');
    await browser.wait(ec.or(ec.visibilityOf(salesComponentsPage.entities), ec.visibilityOf(salesComponentsPage.noResult)), 1000);
  });

  it('should load create Sales page', async () => {
    await salesComponentsPage.clickOnCreateButton();
    salesUpdatePage = new SalesUpdatePage();
    expect(await salesUpdatePage.getPageTitle()).to.eq('Create or edit a Sales');
    await salesUpdatePage.cancel();
  });

  it('should create and save Sales', async () => {
    const nbButtonsBeforeCreate = await salesComponentsPage.countDeleteButtons();

    await salesComponentsPage.clickOnCreateButton();

    await promise.all([
      salesUpdatePage.setTotalInput('5'),
      salesUpdatePage.setServiceChargesInput('5'),
      salesUpdatePage.setDateOfSaleInput('2000-12-31'),
      salesUpdatePage.customerIDSelectLastOption(),
    ]);

    expect(await salesUpdatePage.getTotalInput()).to.eq('5', 'Expected total value to be equals to 5');
    expect(await salesUpdatePage.getServiceChargesInput()).to.eq('5', 'Expected serviceCharges value to be equals to 5');
    expect(await salesUpdatePage.getDateOfSaleInput()).to.eq('2000-12-31', 'Expected dateOfSale value to be equals to 2000-12-31');

    await salesUpdatePage.save();
    expect(await salesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await salesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Sales', async () => {
    const nbButtonsBeforeDelete = await salesComponentsPage.countDeleteButtons();
    await salesComponentsPage.clickOnLastDeleteButton();

    salesDeleteDialog = new SalesDeleteDialog();
    expect(await salesDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Sales?');
    await salesDeleteDialog.clickOnConfirmButton();

    expect(await salesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

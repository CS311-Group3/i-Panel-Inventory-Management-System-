import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VendorComponentsPage, VendorDeleteDialog, VendorUpdatePage } from './vendor.page-object';

const expect = chai.expect;

describe('Vendor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vendorComponentsPage: VendorComponentsPage;
  let vendorUpdatePage: VendorUpdatePage;
  let vendorDeleteDialog: VendorDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Vendors', async () => {
    await navBarPage.goToEntity('vendor');
    vendorComponentsPage = new VendorComponentsPage();
    await browser.wait(ec.visibilityOf(vendorComponentsPage.title), 5000);
    expect(await vendorComponentsPage.getTitle()).to.eq('Vendors');
    await browser.wait(ec.or(ec.visibilityOf(vendorComponentsPage.entities), ec.visibilityOf(vendorComponentsPage.noResult)), 1000);
  });

  it('should load create Vendor page', async () => {
    await vendorComponentsPage.clickOnCreateButton();
    vendorUpdatePage = new VendorUpdatePage();
    expect(await vendorUpdatePage.getPageTitle()).to.eq('Create or edit a Vendor');
    await vendorUpdatePage.cancel();
  });

  it('should create and save Vendors', async () => {
    const nbButtonsBeforeCreate = await vendorComponentsPage.countDeleteButtons();

    await vendorComponentsPage.clickOnCreateButton();

    await promise.all([
      vendorUpdatePage.setVendorNameInput('vendorName'),
      vendorUpdatePage.setPhoneInput('phone'),
      vendorUpdatePage.setEmailInput('email'),
      vendorUpdatePage.setAddressInput('address'),
    ]);

    expect(await vendorUpdatePage.getVendorNameInput()).to.eq('vendorName', 'Expected VendorName value to be equals to vendorName');
    expect(await vendorUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');
    expect(await vendorUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await vendorUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');

    await vendorUpdatePage.save();
    expect(await vendorUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await vendorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Vendor', async () => {
    const nbButtonsBeforeDelete = await vendorComponentsPage.countDeleteButtons();
    await vendorComponentsPage.clickOnLastDeleteButton();

    vendorDeleteDialog = new VendorDeleteDialog();
    expect(await vendorDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Vendor?');
    await vendorDeleteDialog.clickOnConfirmButton();

    expect(await vendorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

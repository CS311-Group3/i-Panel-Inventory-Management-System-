import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CustomerDetailsComponentsPage, CustomerDetailsDeleteDialog, CustomerDetailsUpdatePage } from './customer-details.page-object';

const expect = chai.expect;

describe('CustomerDetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let customerDetailsComponentsPage: CustomerDetailsComponentsPage;
  let customerDetailsUpdatePage: CustomerDetailsUpdatePage;
  let customerDetailsDeleteDialog: CustomerDetailsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CustomerDetails', async () => {
    await navBarPage.goToEntity('customer-details');
    customerDetailsComponentsPage = new CustomerDetailsComponentsPage();
    await browser.wait(ec.visibilityOf(customerDetailsComponentsPage.title), 5000);
    expect(await customerDetailsComponentsPage.getTitle()).to.eq('Customer Details');
    await browser.wait(
      ec.or(ec.visibilityOf(customerDetailsComponentsPage.entities), ec.visibilityOf(customerDetailsComponentsPage.noResult)),
      1000
    );
  });

  it('should load create CustomerDetails page', async () => {
    await customerDetailsComponentsPage.clickOnCreateButton();
    customerDetailsUpdatePage = new CustomerDetailsUpdatePage();
    expect(await customerDetailsUpdatePage.getPageTitle()).to.eq('Create or edit a Customer Details');
    await customerDetailsUpdatePage.cancel();
  });

  it('should create and save CustomerDetails', async () => {
    const nbButtonsBeforeCreate = await customerDetailsComponentsPage.countDeleteButtons();

    await customerDetailsComponentsPage.clickOnCreateButton();

    await promise.all([
      customerDetailsUpdatePage.setCustomerNameInput('customerName'),
      customerDetailsUpdatePage.setEmailInput('email'),
      customerDetailsUpdatePage.setAddressInput('address'),
      customerDetailsUpdatePage.setPhoneInput('phone'),
    ]);

    expect(await customerDetailsUpdatePage.getCustomerNameInput()).to.eq(
      'customerName',
      'Expected CustomerName value to be equals to customerName'
    );
    expect(await customerDetailsUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await customerDetailsUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await customerDetailsUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');

    await customerDetailsUpdatePage.save();
    expect(await customerDetailsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await customerDetailsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last CustomerDetails', async () => {
    const nbButtonsBeforeDelete = await customerDetailsComponentsPage.countDeleteButtons();
    await customerDetailsComponentsPage.clickOnLastDeleteButton();

    customerDetailsDeleteDialog = new CustomerDetailsDeleteDialog();
    expect(await customerDetailsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Customer Details?');
    await customerDetailsDeleteDialog.clickOnConfirmButton();

    expect(await customerDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

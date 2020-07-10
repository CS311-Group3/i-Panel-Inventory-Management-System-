import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReturnsDataComponentsPage, ReturnsDataDeleteDialog, ReturnsDataUpdatePage } from './returns-data.page-object';

const expect = chai.expect;

describe('ReturnsData e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let returnsDataComponentsPage: ReturnsDataComponentsPage;
  let returnsDataUpdatePage: ReturnsDataUpdatePage;
  let returnsDataDeleteDialog: ReturnsDataDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ReturnsData', async () => {
    await navBarPage.goToEntity('returns-data');
    returnsDataComponentsPage = new ReturnsDataComponentsPage();
    await browser.wait(ec.visibilityOf(returnsDataComponentsPage.title), 5000);
    expect(await returnsDataComponentsPage.getTitle()).to.eq('Returns Data');
    await browser.wait(
      ec.or(ec.visibilityOf(returnsDataComponentsPage.entities), ec.visibilityOf(returnsDataComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ReturnsData page', async () => {
    await returnsDataComponentsPage.clickOnCreateButton();
    returnsDataUpdatePage = new ReturnsDataUpdatePage();
    expect(await returnsDataUpdatePage.getPageTitle()).to.eq('Create or edit a Returns Data');
    await returnsDataUpdatePage.cancel();
  });

  it('should create and save ReturnsData', async () => {
    const nbButtonsBeforeCreate = await returnsDataComponentsPage.countDeleteButtons();

    await returnsDataComponentsPage.clickOnCreateButton();

    await promise.all([returnsDataUpdatePage.setDateOfReturnInput('2000-12-31'), returnsDataUpdatePage.salesCodeSelectLastOption()]);

    expect(await returnsDataUpdatePage.getDateOfReturnInput()).to.eq(
      '2000-12-31',
      'Expected dateOfReturn value to be equals to 2000-12-31'
    );

    await returnsDataUpdatePage.save();
    expect(await returnsDataUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await returnsDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ReturnsData', async () => {
    const nbButtonsBeforeDelete = await returnsDataComponentsPage.countDeleteButtons();
    await returnsDataComponentsPage.clickOnLastDeleteButton();

    returnsDataDeleteDialog = new ReturnsDataDeleteDialog();
    expect(await returnsDataDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Returns Data?');
    await returnsDataDeleteDialog.clickOnConfirmButton();

    expect(await returnsDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

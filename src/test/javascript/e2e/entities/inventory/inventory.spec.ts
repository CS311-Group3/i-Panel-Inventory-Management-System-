import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InventoryComponentsPage, InventoryDeleteDialog, InventoryUpdatePage } from './inventory.page-object';

const expect = chai.expect;

describe('Inventory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let inventoryComponentsPage: InventoryComponentsPage;
  let inventoryUpdatePage: InventoryUpdatePage;
  let inventoryDeleteDialog: InventoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Inventories', async () => {
    await navBarPage.goToEntity('inventory');
    inventoryComponentsPage = new InventoryComponentsPage();
    await browser.wait(ec.visibilityOf(inventoryComponentsPage.title), 5000);
    expect(await inventoryComponentsPage.getTitle()).to.eq('Inventories');
    await browser.wait(ec.or(ec.visibilityOf(inventoryComponentsPage.entities), ec.visibilityOf(inventoryComponentsPage.noResult)), 1000);
  });

  it('should load create Inventory page', async () => {
    await inventoryComponentsPage.clickOnCreateButton();
    inventoryUpdatePage = new InventoryUpdatePage();
    expect(await inventoryUpdatePage.getPageTitle()).to.eq('Create or edit a Inventory');
    await inventoryUpdatePage.cancel();
  });

  it('should create and save Inventories', async () => {
    const nbButtonsBeforeCreate = await inventoryComponentsPage.countDeleteButtons();

    await inventoryComponentsPage.clickOnCreateButton();

    await promise.all([
      inventoryUpdatePage.setItemCodeInput('itemCode'),
      inventoryUpdatePage.setItemNameInput('itemName'),
      inventoryUpdatePage.categorySelectLastOption(),
      inventoryUpdatePage.setDescriptionInput('description'),
      inventoryUpdatePage.setQuantityInput('5'),
      inventoryUpdatePage.setReorderLevelInput('5'),
      inventoryUpdatePage.setSellingPriceInput('5'),
      inventoryUpdatePage.setBuyingPriceInput('5'),
    ]);

    expect(await inventoryUpdatePage.getItemCodeInput()).to.eq('itemCode', 'Expected ItemCode value to be equals to itemCode');
    expect(await inventoryUpdatePage.getItemNameInput()).to.eq('itemName', 'Expected ItemName value to be equals to itemName');
    expect(await inventoryUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await inventoryUpdatePage.getQuantityInput()).to.eq('5', 'Expected quantity value to be equals to 5');
    expect(await inventoryUpdatePage.getReorderLevelInput()).to.eq('5', 'Expected reorderLevel value to be equals to 5');
    expect(await inventoryUpdatePage.getSellingPriceInput()).to.eq('5', 'Expected sellingPrice value to be equals to 5');
    expect(await inventoryUpdatePage.getBuyingPriceInput()).to.eq('5', 'Expected buyingPrice value to be equals to 5');

    await inventoryUpdatePage.save();
    expect(await inventoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await inventoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Inventory', async () => {
    const nbButtonsBeforeDelete = await inventoryComponentsPage.countDeleteButtons();
    await inventoryComponentsPage.clickOnLastDeleteButton();

    inventoryDeleteDialog = new InventoryDeleteDialog();
    expect(await inventoryDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Inventory?');
    await inventoryDeleteDialog.clickOnConfirmButton();

    expect(await inventoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

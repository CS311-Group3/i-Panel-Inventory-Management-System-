import { element, by, ElementFinder } from 'protractor';

export class InventoryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-inventory div table .btn-danger'));
  title = element.all(by.css('jhi-inventory div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class InventoryUpdatePage {
  pageTitle = element(by.id('jhi-inventory-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  itemCodeInput = element(by.id('field_itemCode'));
  itemNameInput = element(by.id('field_itemName'));
  categorySelect = element(by.id('field_category'));
  descriptionInput = element(by.id('field_description'));
  quantityInput = element(by.id('field_quantity'));
  reorderLevelInput = element(by.id('field_reorderLevel'));
  sellingPriceInput = element(by.id('field_sellingPrice'));
  buyingPriceInput = element(by.id('field_buyingPrice'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setItemCodeInput(itemCode: string): Promise<void> {
    await this.itemCodeInput.sendKeys(itemCode);
  }

  async getItemCodeInput(): Promise<string> {
    return await this.itemCodeInput.getAttribute('value');
  }

  async setItemNameInput(itemName: string): Promise<void> {
    await this.itemNameInput.sendKeys(itemName);
  }

  async getItemNameInput(): Promise<string> {
    return await this.itemNameInput.getAttribute('value');
  }

  async setCategorySelect(category: string): Promise<void> {
    await this.categorySelect.sendKeys(category);
  }

  async getCategorySelect(): Promise<string> {
    return await this.categorySelect.element(by.css('option:checked')).getText();
  }

  async categorySelectLastOption(): Promise<void> {
    await this.categorySelect.all(by.tagName('option')).last().click();
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setQuantityInput(quantity: string): Promise<void> {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput(): Promise<string> {
    return await this.quantityInput.getAttribute('value');
  }

  async setReorderLevelInput(reorderLevel: string): Promise<void> {
    await this.reorderLevelInput.sendKeys(reorderLevel);
  }

  async getReorderLevelInput(): Promise<string> {
    return await this.reorderLevelInput.getAttribute('value');
  }

  async setSellingPriceInput(sellingPrice: string): Promise<void> {
    await this.sellingPriceInput.sendKeys(sellingPrice);
  }

  async getSellingPriceInput(): Promise<string> {
    return await this.sellingPriceInput.getAttribute('value');
  }

  async setBuyingPriceInput(buyingPrice: string): Promise<void> {
    await this.buyingPriceInput.sendKeys(buyingPrice);
  }

  async getBuyingPriceInput(): Promise<string> {
    return await this.buyingPriceInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class InventoryDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-inventory-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-inventory'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

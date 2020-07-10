import { element, by, ElementFinder } from 'protractor';

export class SalesItemsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sales-items div table .btn-danger'));
  title = element.all(by.css('jhi-sales-items div h2#page-heading span')).first();
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

export class SalesItemsUpdatePage {
  pageTitle = element(by.id('jhi-sales-items-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  unitPriceInput = element(by.id('field_unitPrice'));
  quantityInput = element(by.id('field_quantity'));
  totalInput = element(by.id('field_total'));

  itemCodeSelect = element(by.id('field_itemCode'));
  salesCodeSelect = element(by.id('field_salesCode'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setUnitPriceInput(unitPrice: string): Promise<void> {
    await this.unitPriceInput.sendKeys(unitPrice);
  }

  async getUnitPriceInput(): Promise<string> {
    return await this.unitPriceInput.getAttribute('value');
  }

  async setQuantityInput(quantity: string): Promise<void> {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput(): Promise<string> {
    return await this.quantityInput.getAttribute('value');
  }

  async setTotalInput(total: string): Promise<void> {
    await this.totalInput.sendKeys(total);
  }

  async getTotalInput(): Promise<string> {
    return await this.totalInput.getAttribute('value');
  }

  async itemCodeSelectLastOption(): Promise<void> {
    await this.itemCodeSelect.all(by.tagName('option')).last().click();
  }

  async itemCodeSelectOption(option: string): Promise<void> {
    await this.itemCodeSelect.sendKeys(option);
  }

  getItemCodeSelect(): ElementFinder {
    return this.itemCodeSelect;
  }

  async getItemCodeSelectedOption(): Promise<string> {
    return await this.itemCodeSelect.element(by.css('option:checked')).getText();
  }

  async salesCodeSelectLastOption(): Promise<void> {
    await this.salesCodeSelect.all(by.tagName('option')).last().click();
  }

  async salesCodeSelectOption(option: string): Promise<void> {
    await this.salesCodeSelect.sendKeys(option);
  }

  getSalesCodeSelect(): ElementFinder {
    return this.salesCodeSelect;
  }

  async getSalesCodeSelectedOption(): Promise<string> {
    return await this.salesCodeSelect.element(by.css('option:checked')).getText();
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

export class SalesItemsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-salesItems-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-salesItems'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

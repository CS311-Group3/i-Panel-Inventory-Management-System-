import { element, by, ElementFinder } from 'protractor';

export class ReturnItemsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-return-items div table .btn-danger'));
  title = element.all(by.css('jhi-return-items div h2#page-heading span')).first();
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

export class ReturnItemsUpdatePage {
  pageTitle = element(by.id('jhi-return-items-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  quantityInput = element(by.id('field_quantity'));

  itemCodeSelect = element(by.id('field_itemCode'));
  returnCodeSelect = element(by.id('field_returnCode'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setQuantityInput(quantity: string): Promise<void> {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput(): Promise<string> {
    return await this.quantityInput.getAttribute('value');
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

  async returnCodeSelectLastOption(): Promise<void> {
    await this.returnCodeSelect.all(by.tagName('option')).last().click();
  }

  async returnCodeSelectOption(option: string): Promise<void> {
    await this.returnCodeSelect.sendKeys(option);
  }

  getReturnCodeSelect(): ElementFinder {
    return this.returnCodeSelect;
  }

  async getReturnCodeSelectedOption(): Promise<string> {
    return await this.returnCodeSelect.element(by.css('option:checked')).getText();
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

export class ReturnItemsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-returnItems-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-returnItems'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
